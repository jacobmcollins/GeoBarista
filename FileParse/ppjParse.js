var x2j = require('xml2js') 
var fs = require('fs')
var util = require('util')
var projector = require('ecef-projector')

/*
EXAMPLE USAGE

console.log("############## Meta Data Test ##################")
var Parser = require('../FileParse/ppjParse')
var util = require('util')
ppjParser = new Parser()
var metaData = ppjParser.convertXml("./pathToFile/test.ppj")
console.log(util.inspect(metaData, {depth: null}))
metaData.logAllEntries()
console.log("############## Done ################")

*/
class Parser {
    constructor() {
    }

    convertXml(xmlpath) {
        var parseXml = new x2j.Parser()
        var xmlString = fs.readFileSync(xmlpath).toString()
        var parsedObj
        
        parseXml.parseString(xmlString, function (err, result){
            parsedObj = result
        })

        var packed = new ppjMetaData(parsedObj)
        return packed;

    }
}

//classes to unpack and organise list supplied from parser class
class ppjMetaData {
    constructor(data){
        this.fileName = data['pearlProjectionFile'].image[0].namingData[0].fileBaseName[0]
        this.imageNumber = data['pearlProjectionFile'].image[0].namingData[0].imageNumber[0]
        this.gpsTimeStamp = data['pearlProjectionFile'].image[0].sensorData[0].GPSTimeStamp[0]
        //Image time has a ._ and a .$ for time and type respectively
        this.imageTime = data['pearlProjectionFile'].image[0].sensorData[0].ImageTime
        this.sensorWidth = data['pearlProjectionFile'].image[0].sensorData[0].sensorSize[0].SensorWidth[0]
        this.sensorHeight = data['pearlProjectionFile'].image[0].sensorData[0].sensorSize[0].SensorHeight[0]
        //cameraIntrinsic CI-Row is a list of values
        this.ciRow = data['pearlProjectionFile'].image[0].sensorData[0].cameraIntrinsic[0]['CI-Row']
        //cameraDistortion
        this.cdRadial = data['pearlProjectionFile'].image[0].sensorData[0].cameraDistortion[0]['CD-Radial']
        this.cdTangential = data['pearlProjectionFile'].image[0].sensorData[0].cameraDistortion[0]['CD-Tangential']
        //cameraExtrinsic - ECEF Row list of values
        this.ecefRow = data['pearlProjectionFile'].image[0].sensorData[0].cameraExtrinsic[0]['ECEF-Row']
        //projection data
        this.pointMap = []
        data['pearlProjectionFile'].image[0].projectionData[0].pointMap.forEach(
            function(element){
                var currentPoint = new pointMapPkg(element)
                this.pointMap.push(currentPoint)
            }, this)
        
        //quality information
        this.RMSerror = data['pearlProjectionFile'].image[0].qualityInformation[0].RMSerror[0]
        
        //this.logAllEntries()
    }
    logAllEntries() {
        console.log("File Name: ",this.fileName)
        console.log("Image Number: ",this.imageNumber)
        console.log("GPS Time Stamp: ",this.gpsTimeStamp)
        console.log("Image Time: ",this.imageTime)
        console.log("Sensor Width: ",this.sensorWidth)
        console.log("Sensor Height: ",this.sensorHeight)
        console.log("CI-Row",this.ciRow)
        console.log("CD-Radial",this.cdRadial)
        console.log("CD-Tangential",this.cdTangential)
        console.log("ECEF-Row: ",this.ecefRow)
        this.pointMap.forEach(element => element.logAllEntries())
        console.log("RMS Error: ",this.RMSerror)
    }
}

class pointMapPkg {
    constructor(data) {
        //data['pearlProjectionFile'].image[0].sensorData[0].gpsTimeStamp[0]
        this.type = data.$.type
        this.pixPntX = data.pixelPointX[0]
        this.pixPntY = data.pixelPointY[0]
        this.ecefX = data.ecefX[0]
        this.ecefY = data.ecefY[0]
        this.ecefZ = data.ecefZ[0]

        //wgs84 conversions
        this.wgsCoordinates = projector.project(
            parseFloat(this.ecefX),
            parseFloat(this.ecefY),
            parseFloat(this.ecefZ))
    }

    logAllEntries() {
        console.log("Type: ",this.type)
        console.log("Pixel Point X: ", this.pixPntX)
        console.log("Pixel Point Y: ",this.pixPntY)
        console.log("ecefX: ",this.ecefX)
        console.log("ecefY: ",this.ecefY)
        console.log("ecefZ: ",this.ecefZ)
        console.log("wgs84 coordinates: ", this.wgsCoordinates)
    }
}

module.exports = Parser