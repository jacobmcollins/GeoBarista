const {execSync} = require("child_process");
var path = require('path');
const imageService = require('../server/services/image');
const imageModel = require('../server/models/image');
var ppjParse = require('./ppjParse');

class fileHandler {
    constructor(file_list) {        
        this.file_list = file_list;
        this.processList();
        
    }

    async processList() {
        console.log("json delivered: " + this.file_list);
        if(this.file_list.length >= 1) {
            for (const element of this.file_list) {
                let fileext = path.extname(element.name);
                switch (fileext) {
                    case ".ntf":
                        this.ntfinfo(element.path);
                        break;
                    case ".ppj":
                        this.ppjinfo(element.path);
                        break;
                    case ".jpg":
                        break;
                    default:
                        break;
                }
            }
        }
    }

    ppjinfo(path) {
        var ppjParser = new ppjParse();
        var metadata = ppjParser.convertXml(path);
        metadata.logAllEntries();
    }

    async ntfinfo(path) {
        var gdalinfo_output = execSync(`gdalinfo -json "${path}"`);
        var gdalinfo = JSON.parse(gdalinfo_output);
        var points = [];
        gdalinfo.gcps.gcpList.forEach((gcp) => {
          points.push([gcp['y'], gcp['x']])
        });
        await imageModel.create({
          'file_path': path,
          'file_extension': "ntf",
          'points': JSON.stringify(points)
        });
    }
}

module.exports = fileHandler 