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

   
    // Parses files to see if they compy with the given datasets
    // naming rules, and extracts values into an object, which is
    // returned. If the filename does not match the format type, 
    // it returns null.
    parseFilename(filename) {
        let result = null;
        try {
            // Check last 5 chars of filename for an extension
            // Chop if off if found
            let last5 = filename.slice(-5, filename.length);
            if (last5 && last5.includes('.')) {
                filename = filename.substring(0, filename.lastIndexOf('.'));
            }
            // Split filename by underscores
            let filenameParts = filename.split('_');
            // If filename has '_' and at least 3 parts, extract info
            if (filenameParts && filenameParts.length >= 3) {
                let dateraw = filenameParts[0];
                let timeraw = filenameParts[1];
                let camera = filenameParts[2];   
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
                    thumbnail: false
                }                
                // imgid does not exist in all filenames
                if(filenameParts.length >3) {
                    let imgid = filenameParts[3]; 
                    dataitems['imgid'] = imgid;
                }  
                // If last 5 letters of the filename are "thumb",
                // it's a thumbnail
                let last5 = filename.slice(-5, filename.length);
                // console.log("last5: " + last5);
                if (last5 && last5 == "thumb") {
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
            result['time'] = filenamevalues.time;
            result['camera'] = filenamevalues.camera;
            if (filenamevalues.imgid) {
                result['imgid'] = filenamevalues.imgid;
            }
            
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
    async addFileToDB(filepath, extension, filename, metaData) {
        let folder = path.dirname(filepath).split(path.sep).pop();
        //console.log("Folder name: " + folder);
        let fileDBObj = await fileModel.findOneAndUpdate(
            // Search query
            {'path': filepath}, 
            // Data to insert into record
            {$set: {
                'folder': folder,
                'filename': filename,
                'extension': extension,
                'path': filepath,                
                'JSONData': JSON.stringify(metaData)
            }}, 
            // Insert options
            {
                // Creates record if not found
                upsert: true,
                // This option is required by system
                useFindAndModify: false,
                // Returns newly created object
                new: true
            }, 
            // Error handling
            function(err) {
            if (err) console.log("Error inserting to file model" + err);
            
            return console.log("File model saved, path " + filepath);
        });
        //console.log('fileDBObj: ' + fileDBObj);
        return fileDBObj;
    }
    
    // Adds image to image model
    async addImageToDB(imagedata) {
        // check if image is in db
        // If so, update relevant info
        // If not, create record with arg data
        //let fileObjJson = JSON.stringify(fileInserted);
        let imgQuery = await imageModel.find({'base_name': imagedata.base_name});
        console.log("imgquery: " + imgQuery);
        let imageDBObj = await imageModel.findOneAndUpdate(
            // Search query
            {'base_name': imagedata.base_name}, 
            // Data to insert into record
            {$set: imagedata}, 
            // Insert options
            {
                // Creates record if not found
                upsert: true,
                // This option is required by system
                useFindAndModify: false,
                // Returns newly created object
                new: true
            }, 
            // Error handling
            function(err) {
            if (err) console.log("Error inserting to image model" + err);
            
            return console.log("image model saved, base_name " + imagedata.base_name);
        });
        console.log("Image after update: " + imageDBObj);
        
    }

    // Creates file and image model records in db for a .ppj file
    async ppjinfo(filepath, filename) {        
        let folder = path.dirname(filepath).split(path.sep).pop();        
        var metaData = ppjParser.convertXml(filepath);
        let fileInserted = await this.addFileToDB(filepath, ".ppj", filename, metaData);
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
        console.log("ppj filepath: " + filepath);
        let imgdbobj = {
            //'_id': filepath,
            'base_name': base_name,
            //'file_path': filepath,
            //'file_extension': 'ppj',
            'points': JSON.stringify(points),
            //'mission': this.getMissionName(filepath),
            'ppj_data': fileInserted,
            'ppj_data_path': filepath            
          };
        // Add metadata parsed from filename into object 
        let toInsert = this.addFilenameImage(imgdbobj, filenameData);
        // Overwrite timestamp in filename with timestamp from .ppj file
        imgdbobj['time'] = metaData.gpsTimeStamp;
        //console.log(JSON.stringify(toInsert));
        // Insert image object into db
        await this.addImageToDB(toInsert);
    }

    async csvinfo(filepath, filename) {
        let folder = path.dirname(filepath).split(path.sep).pop();
        var metaData = csvParser.convertCSV_stripped(filepath);
        //console.log(JSON.stringify("CSV metadata: " + JSON.stringify(metaData)));
        let fileInserted = await this.addFileToDB(filepath, ".csv", filename, metaData);
        let base_name = this.chopfilename(filename);
        let filenameData = this.parseFilename(filename);
        let imgdbobj = {
            'base_name': base_name,
            'fov': metaData.lensFOV_H,
            'lla': metaData.centerPnt_Lat,
            'velocity': metaData.velNorth,
            'gsd': metaData.groundSpd,
            // 'fov': JSON.stringify(metaData.lensFOV_H["Value"]).replace(/^"(.*)"$/, '$1'),
            // 'lla': JSON.stringify(metaData.centerPnt_Lat["Value"]).replace(/^"(.*)"$/, '$1'),
            'csv_data': fileInserted,
            'csv_data_path': filepath
        }
        // Add metadata parsed from filename into object 
        let toInsert = this.addFilenameImage(imgdbobj, filenameData);
        await this.addImageToDB(toInsert);
        console.log("metaData.lendFOV_HJSON: " + metaData.lensFOV_H);
    }
    chopfilename(filename) {
        // Check last 5 chars of filename for an extension
        // Chop if off if found
        let last5 = filename.slice(-5, filename.length);
        if (last5 && last5.includes('.')) {
            filename = filename.substring(0, filename.lastIndexOf('.'));
        }
        return filename;
    }
    getMissionName(filepath) {
        var tempName = filepath.split('\\');
        return tempName[tempName.length - 2];
    }
}

module.exports = fileHandler 