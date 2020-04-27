var path = require('path');
const imageModel = require('../server/models/image');
const fileModel = require('../server/models/file');
var ppjParse = require('./ppjParse');
var csvParse = require('./csvParse');

// Since the ppj parser doesnt hold much state to it, we only need to declare it once to
// do all of our conversions
var ppjParser = new ppjParse();
var csvParser = new csvParse();

class fileHandler {
    constructor(file_list) {        
        this.file_list = file_list;
        //this.processList();
        
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
            // TODO: make these work with different character cases in ext
            for (const key in extDic) {
                if(key == ".ppj") {
                    console.log("Parsing all .ppj files");
                    //console.log(JSON.stringify(extDic[key]));
                    // Run appropriate action for all .ppj files
                    for (const element of extDic[key]) {
                        await this.ppjinfo(element.path, element.name);
                    }
                }
                if(key == ".csv") {
                    console.log("Parsing all .csv files");
                    for (const element of extDic[key]) {
                        await this.csvinfo(element.path, element.name);
                    }
                }
            }
        }
        console.log(JSON.stringify(Object.keys(extDic)));        
    }

    async csvinfo(filepath, filename) {
        var metaData = csvParser.convertCSV(filepath);
        //console.log(JSON.stringify("CSV metadata: " + JSON.stringify(metaData)));
        let filenameData = this.parseFilename(filename);
        console.log("filenameData: " + JSON.stringify(filenameData));
    }
    // Parses files to see if they compy with the given datasets
    // naming rules, and extracts values into an object, which is
    // returned. If the filename does not match the format type, 
    // it returns null.
    parseFilename(filename) {
        let result = null;
        try {
            // Slice off extension from filename, split by underscores
            let filenameParts = filename.slice(0, filename.length - 4).split('_');
            // If filename has '_' and at least 3 parts, extract info
            if (filenameParts && filenameParts.length >= 3) {
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
                // Add in fractional seconds, if they are there
                if (timeraw.length > 6) {
                    timefmtd += "." + subsecs;
                } 
                //console.log("timefmtd: " + timefmtd);
                let parsedTime = new Date('1970-01-01T' + timefmtd + 'Z');
                let timestamp = dateDateObj.getTime() + parsedTime.getTime();
                //console.log("timestamp: " + timestamp);
                let parsedstamp = new Date(timestamp);
                //console.log("parsedstamp: " + parsedstamp);
                var dataitems = {
                    date: dateDateObj,
                    time: parsedstamp,
                    camera: camera,
                    // imgid does not exist in all filenames
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
            console.log("Filename parse error: " + error);            
            console.log("Filename attempted to parse: " + filename);
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
        // TODO: add appropriate db calls for updating
        // image record with link to thumbnail
    }
    async queryFileModel(query) {
        let result = await fileModel.find(query).exec();
        return result;
    }
    // Adds a file to the file model
    async addFileToDB(filepath, extension, filename) {
        let folder = path.dirname(filepath).split(path.sep).pop();
        console.log("Folder name: " + folder);
        // Make test query in different method
        // let folderquery = await this.queryFileModel({
        //     'folder': folder
        // });

        //let querytext = await folderquery;
        
        let fileDBObj = await fileModel.findOneAndUpdate(
            {'path': filepath}, 
            {$set: {
                'folder': folder,
                'filename': filename,
                'extension': [extension],
                'path': filepath
            }         
        }, {upsert: true}, function(err, doc) {
            if (err) console.log("Error inserting to file model" + err);
            return console.log("File model saved, path " + filepath);
        });
        //await fileDBObj.save();
        let folderquery = await fileModel.find({'folder': folder});
        console.log("folderquery: " + folderquery);
        //console.log("Testprom: " + JSON.stringify(fileDBObj));
        //await fileModel.create(fileDBObj);
    }
    async addImageToDB(imagedata) {
        await imageModel.create(imagedata);
    }
    async ppjinfo(filepath, filename) {
        await this.addFileToDB(filepath, ".ppj", filename);
        let folder = path.dirname(filepath).split(path.sep).pop();
        // Test query, finds all records in file model
        // let filequery = await fileModel.find({});
        // console.log("filequery: " + filequery);
        
        var metaData = ppjParser.convertXml(filepath);
        var points = [];
        var i;
        // Only go from 0 to i-1 because the last point is the center
        for(i=0; i < (metaData.pointMap.length - 1); i++) {
          let coords = metaData.pointMap[i].wgsCoordinates;
          points.push([coords[1], coords[0]]);
        }
        let base_name = metaData.fileName;
        // Parsing out metadata from filename
        let filenameData = this.parseFilename(base_name);
        //console.log(JSON.stringify(filenameData));
        let imgdbobj = {
            '_id': filepath,
            'base_name': base_name,
            'file_path': filepath,
            'file_extension': 'ppj',
            'points': JSON.stringify(points),
            'mission': this.getMissionName(filepath)
          };
        // Add metadata parsed from filename into object 
        let toInsert = this.addFilenameImage(imgdbobj, filenameData);
        //console.log(JSON.stringify(toInsert));
        // Insert image object into db
        //await imageModel.create(toInsert);
        await this.addImageToDB(toInsert);
    }

    getMissionName(filepath) {
        var tempName = filepath.split('\\');
        return tempName[tempName.length - 2];
    }
}

module.exports = fileHandler 