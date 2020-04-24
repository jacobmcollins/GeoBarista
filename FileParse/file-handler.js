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
            // create separate list by file extension
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
        let filenameParts = base_name.split('_');
        if (filenameParts.length > 0) {
            let dateraw = filenameParts[0];        
            console.log(JSON.stringify(filenameParts));
            console.log("dateraw: " + dateraw);
            let parsedDate = Date.parse(dateraw);
            console.log("dateparsed: " + parsedDate);
        }
        
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