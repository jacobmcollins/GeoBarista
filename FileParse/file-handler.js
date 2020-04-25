var path = require('path');
const imageModel = require('../server/models/image');
const fileModel = require('../server/models/file');
var ppjParse = require('./ppjParse');

// Since the ppj parser doesnt hold much state to it, we only need to declare it once to
// do all of our conversions
var ppjParser = new ppjParse();

class fileHandler {
    constructor(file_list) {        
        this.file_list = file_list;
        this.processList();
        
    }

    async processList() {
        let extDic = {};
        if(this.file_list.length >= 1) {
            // Group files by file extension into extDic
            for (const element of this.file_list) {
                let fileext = path.extname(element.name);
                if (extDic[fileext]) {
                    extDic[fileext].push(element);
                } else {
                    extDic[fileext] = [element];
                }                
            }
            // Loop through each extension found in extDic
            for (const key in extDic) {
                if(key == ".ppj") {
                    console.log(key);
                    //console.log(JSON.stringify(extDic[key]));
                    // Run appropriate action for all 
                    // files of this extension 
                    for (const element of extDic[key]) {
                        this.ppjinfo(element.path);
                    }
                }
                // switch (fileext) {
                //     case ".ppj":
                //         this.ppjinfo(element.path);
                //         break;
                //     default:
                //         break;
                // }
            }
        }
        console.log(JSON.stringify(Object.keys(extDic)));        
    }

    // Parses files to see if they compy with the given datasets
    // naming rules, and extracts values into an object, which is
    // returned. If the filename does not match the format type, 
    // it returns null.
    parseFilename(filename) {
        let result = null;
        try {
            let filenameParts = filename.split('_');
            if (filenameParts.length >= 3) {
                let dateraw = filenameParts[0];
                let timeraw = filenameParts[1];
                let camera = filenameParts[2];
                let imgid = filenameParts[3];        
                // console.log(JSON.stringify(filenameParts));
                // console.log("dateraw: " + dateraw);
                // Parsing date string into UNIX time
                let parsedDate = Date.parse(dateraw);
                // Create new Date obj from string
                let dateDateObj = new Date(parsedDate);
                // console.log("dateDateObj: " + dateDateObj);
                // console.log("timeraw: " + timeraw);
                // Add in formatting marks to the timestamp so 
                // it parses correctly
                let hours = timeraw.slice(0, 2);
                let minutes = timeraw.slice(2, 4);
                let seconds = timeraw.slice(4, 6);
                let subsecs = timeraw.slice(6, timeraw.length);
                let timefmtd = hours + ":" + minutes + ":" + seconds;
                if (timeraw.length > 6) {
                    timefmtd += "." + subsecs;
                } 
                console.log("timefmtd: " + timefmtd);
                let parsedTime = new Date('1970-01-01T' + timefmtd + 'Z');
                let timestamp = dateDateObj.getTime() + parsedTime.getTime();
                console.log("timestamp: " + timestamp);
                let parsedstamp = new Date(timestamp);
                console.log("parsedstamp: " + parsedstamp);
                var dataitems = {
                    date: dateDateObj,
                    time: parsedstamp,
                    camera: camera,
                    imgid: imgid,
                    thumbnail: false
                }                
                // If last 5 letters of the filename are "thumb",
                // it's a thumbnail
                let last5 = filename.slice(-5, filename.length);
                // console.log("last5: " + last5);
                if (last5 == "thumb") {
                    dataitems.thumbnail = true;
                }
                // console.log("dataitems: " + JSON.stringify(dataitems));
                          
                result = dataitems;
            }
        } catch (error) {
            console.log(error);            
        }
        
        return result;
        
    }
    addFilenameImage(imgobject, filenamevalues) {
        var result = imgobject;
        if(filenamevalues) {
            result['time'] = filenamevalues.time,
            result['camera'] = filenamevalues.camera,
            result['imgid'] = filenamevalues.imgid
        }
        return result;
    }
    addThumbnailImage(thumbnail) {

    }
    async ppjinfo(path) {
        var metaData = ppjParser.convertXml(path)
        var points = []
        var i;
        // Only go from 0 to i-1 because the last point is the center
        for(i=0; i < (metaData.pointMap.length - 1); i++) {
          let coords = metaData.pointMap[i].wgsCoordinates;
          points.push([coords[1], coords[0]]);
        }
        let base_name = metaData.fileName;
        // Parsing out metadata from filename
        let filenameData = this.parseFilename(base_name);
        console.log(JSON.stringify(filenameData));
        let imgdbobj = {
            '_id': path,
            'base_name': base_name,
            'file_path': path,
            'file_extension': 'ppj',
            'points': JSON.stringify(points),
            'mission': this.getMissionName(path)
          };
        let toInsert = this.addFilenameImage(imgdbobj, filenameData);
        //console.log(JSON.stringify(toInsert));
        await imageModel.create(toInsert);
    }

    getMissionName(path) {
        var tempName = path.split('\\');
        return tempName[tempName.length - 2];
    }
}

module.exports = fileHandler 