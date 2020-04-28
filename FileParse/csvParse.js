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

    convertCSV_stripped(csvpath) {
        var csvString = fs.readFileSync(csvpath).toString()

        console.log(csvString)
        var parsedObj = csvParser(csvString, {
            columns: true,
            skip_empty_lines: true
        })

        var packed = new csvMetaDataStripped(parsedObj)
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

class csvMetaDataStripped {
    constructor(data) {
        this.fileData = data[0].Value
        this.correctedImage = data[1].Value
        this.thumbnailImage = data[2].Value
        this.camera = data[3].Value
        this.serialNum = data[4].Value
        this.firmwareVer = data[5].Value
        this.aperture = data[6].Value
        this.shutterSpd = data[7].Value
        this.analogGain = data[8].Value
        this.iso = data[9].Value
        this.imgNum = data[10].Value
        this.width = data[11].Value
        this.height = data[12].Value
        this.internalTimeStr = data[13].Value
        this.resolution = data[14].Value
        this.lensFocalLen = data[15].Value

        //camera mount roll, pitch and yaw
        this.mountRoll = data[16].Value
        this.mountPitch = data[17].Value
        this.mountYaw = data[18].Value
        
        this.julianDate = data[19].Value
        this.utcDate = data[20].Value
        this.utcTime = data[21].Value

        //presumably the camera mount lat-long
        this.mountLat = data[22].Value
        this.mountLong = data[23].Value

        this.altitude = data[24].Value

        //velocity values are negative for South, west, and down, respectively
        this.velNorth = data[25].Value
        this.velEast = data[26].Value
        this.velUp = data[27].Value

        this.trackHeading = data[28].Value
        this.magneticHeading = data[29].Value
        this.magneticVariance = data[30].Value
        this.groundSpd = data[31].Value

        //presumably roll pitch and yaw of the aircraft
        this.roll = data[32].Value
        this.pitch = data[33].Value
        this.yaw = data[34].Value
        this.ballOffset = data[35].Value
        this.yawRate = data[36].Value
        this.groundElevation = data[37].Value
        this.lensFOV_V = data[38].Value
        this.lensFOV_H = data[39].Value

        //box coordinates
        this.centerPnt_Lat = data[40].Value
        this.centerPnt_Long = data[41].Value

        this.upperLeftPnt_Lat = data[42].Value
        this.upperLeftPnt_Long = data[43].Value

        this.upperRightPnt_Lat = data[44].Value
        this.upperRightPnt_Long = data[45].Value

        this.lowerRightPnt_Lat = data[46].Value
        this.lowerRightPnt_Long = data[47].Value

        this.lowerLeftPnt_Lat = data[48].Value
        this.lowerLeftPnt_Long = data[49].Value

        this.estImgWidth = data[50].Value
        this.estImgHeight = data[51].Value
        this.estPxlPrint = data[52].Value
        this.lensFocus = data[53].Value
        this.lensFocusAbs = data[54].Value
        this.lensFocus_StopMin = data[55].Value
        this.lensFocus_StopMax = data[56].Value
        this.estMotionBlur = data[57].Value
        //temp as in temperature
        this.sensorTemp = data[58].Value

        //listed as "Isorce" in csv
        this.isorce = data[59].Value
        this.acTailNum = data[60].Value
        this.missionID = data[61].Value
        this.sortieNum = data[62].Value
        this.producerCode = data[63].Value
        this.nitf_LookupTableID = data[64].Value
        this.imgCount = data[65].Value
        this.ostaid = data[66].Value
        this.oname = data[67].Value
        this.ophone = data[68].Value
        
    }
}


module.exports = Parser
