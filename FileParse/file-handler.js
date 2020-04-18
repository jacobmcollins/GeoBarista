var path = require('path');
const imageModel = require('../server/models/image');
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
        if(this.file_list.length >= 1) {
            for (const element of this.file_list) {
                let fileext = path.extname(element.name);
                switch (fileext) {
                    case ".ppj":
                        this.ppjinfo(element.path);
                        break;
                    default:
                        break;
                }
            }
        }
    }

    async ppjinfo(path) {
        var metaData = ppjParser.convertXml(path)
        var points = []
        var i;
        // Only go from 0 to i-1 because the last point is the center
        for(i=0; i < (metaData.pointMap.length - 1); i++) {
          let coords = metaData.pointMap[i].wgsCoordinates;
          points.push([coords[0], coords[1]]);
        }
        let base_name = metaData.fileName;
        await imageModel.create({
          '_id': base_name,
          'base_name': base_name,
          'file_path': path,
          'file_extension': 'ppj',
          'points': JSON.stringify(points)
        });
    }
}

module.exports = fileHandler 