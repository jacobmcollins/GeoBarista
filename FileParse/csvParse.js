var fs = require('fs')
var csvParser = require('csv-parse/lib/sync')

//EXAMPLE USAGE
/*

  console.log("############## Meta Data Test ##################")
  var csvParsertest = require('../FileParse/csvParse')
  var util = require('util')
  var testParser = new csvParsertest()
  var csvData = testParser.convertCSV('path/to/file.csv')
  console.log(csvData)
  console.log("############## Done ################")

*/


class Parser {
    constructor() {
    }

    convertCSV(csvpath) {
        var csvString = fs.readFileSync(csvpath).toString()

        // console.log(csvString)
        var parsedObj = csvParser(csvString, {
            columns: true,
            skip_empty_lines: true
        })

        var packed = new csvMetaData(parsedObj)
        //console.log(parsedObj)
        return packed;
    }

    //can read in any generic csv, but does not parse into a class object
    convertCSV_generic(csvpath) {
        var csvString = fs.readFileSync(csvpath).toString()
        var parsedObj
        //console.log(csvString)
        var parsedObj = csvParser(csvString, {
            columns: true,
            skip_empty_lines: true
        })

        console.log(parsedObj)
        return parsedObj
    }
}

class csvMetaData {
    constructor(data) {
        this.fileData = data[0]
        this.correctedImage = data[1]
        this.thumbnailImage = data[2]
        this.camera = data[3]
        this.serialNum = data[4]
        this.firmwareVer = data[5]
        this.aperture = data[6]
        this.shutterSpd = data[7]
        this.analogGain = data[8]
        this.iso = data[9]
        this.imgNum = data[10]
        this.width = data[11]
        this.height = data[12]
        this.internalTimeStr = data[13]
        this.resolution = data[14]
        this.lensFocalLen = data[15]

        //camera mount roll, pitch and yaw
        this.mountRoll = data[16]
        this.mountPitch = data[17]
        this.mountYaw = data[18]
        
        this.julianDate = data[19]
        this.utcDate = data[20]
        this.utcTime = data[21]

        //presumably the camera mount lat-long
        this.mountLat = data[22]
        this.mountLong = data[23]

        this.altitude = data[24]

        //velocity values are negative for South, west, and down, respectively
        this.velNorth = data[25]
        this.velEast = data[26]
        this.velUp = data[27]

        this.trackHeading = data[28]
        this.magneticHeading = data[29]
        this.magneticVariance = data[30]
        this.groundSpd = data[31]

        //presumably roll pitch and yaw of the aircraft
        this.roll = data[32]
        this.pitch = data[33]
        this.yaw = data[34]
        this.ballOffset = data[35]
        this.yawRate = data[36]
        this.groundElevation = data[37]
        this.lensFOV_V = data[38]
        this.lensFOV_H = data[39]

        //box coordinates
        this.centerPnt_Lat = data[40]
        this.centerPnt_Long = data[41]

        this.upperLeftPnt_Lat = data[42]
        this.upperLeftPnt_Long = data[43]

        this.upperRightPnt_Lat = data[44]
        this.upperRightPnt_Long = data[45]

        this.lowerRightPnt_Lat = data[46]
        this.lowerRightPnt_Long = data[47]

        this.lowerLeftPnt_Lat = data[48]
        this.lowerLeftPnt_Long = data[49]

        this.estImgWidth = data[50]
        this.estImgHeight = data[51]
        this.estPxlPrint = data[52]
        this.lensFocus = data[53]
        this.lensFocusAbs = data[54]
        this.lensFocus_StopMin = data[55]
        this.lensFocus_StopMax = data[56]
        this.estMotionBlur = data[57]
        //temp as in temperature
        this.sensorTemp = data[58]

        //listed as "Isorce" in csv
        this.isorce = data[59]
        this.acTailNum = data[60]
        this.missionID = data[61]
        this.sortieNum = data[62]
        this.producerCode = data[63]
        this.nitf_LookupTableID = data[64]
        this.imgCount = data[65]
        this.ostaid = data[66]
        this.oname = data[67]
        this.ophone = data[68]
        
    }

}

module.exports = Parser
