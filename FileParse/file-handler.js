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
                    console.log(JSON.stringify(extDic[key]));
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

    parseFilename(filename) {
        let result = null;
        try {
            let filenameParts = filename.split('_');
            if (filenameParts.length == 4) {
                let dateraw = filenameParts[0];
                let timeraw = filenameParts[1];
                let camera = filenameParts[2];
                let imgid = filenameParts[3];        
                console.log(JSON.stringify(filenameParts));
                console.log("dateraw: " + dateraw);
                let parsedDate = Date.parse(dateraw);
                console.log("dateparsed: " + parsedDate);
                console.log("timeraw: " + timeraw);
                let timeparts = timeraw.match(/.{2}/g);
                let timefmtd = timeparts[0] + ":" + timeparts[1] + ":" + timeparts[2];
                // for (let pair of timeparts) {
                //     console.log("typeof pair: " + typeof pair);
                //     pair += ":";
                //     timefmtd.concat(pair);
                // }
                // timefmtd = timefmtd.slice(0, timefmtd.length);
                console.log("timefmtd: " + timefmtd);
                let parsedTime = new Date('1970-01-01T' + timefmtd + 'Z');
                let timestamp = parsedDate + parsedTime.getTime();
                console.log("timestamp: " + timestamp);
                let parsedstamp = new Date(timestamp);
                console.log("parsedstamp: " + parsedstamp);
                result = filenameParts;
            }
        } catch (error) {
            console.log(error);            
        }
        return result;
        
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
        
        await imageModel.create({
          '_id': path,
          'base_name': base_name,
          'file_path': path,
          'file_extension': 'ppj',
          'points': JSON.stringify(points),
          'mission': this.getMissionName(path)
        });
    }

    getMissionName(path) {
        var tempName = path.split('\\');
        return tempName[tempName.length - 2];
    }
}

module.exports = fileHandler 