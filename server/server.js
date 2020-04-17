const express = require("express");
const {execSync} = require("child_process");
const bodyParser = require("body-parser");
global.atob = require("atob");
var Parser = require('../FileParse/ppjParse')
var util = require('util')

function server(client_path) {
  const app = express();

  app.set("port", process.env.PORT || 3001);

  // SQLite DB components
  const dbHandler = require('./db-handler');
  const imageService = require('./services/image');
  const imageModel = require('./models/image');
  dbHandler.connect();

  // Create the PPJ Parser early on
  const ppjParser = new Parser()

  // Express only serves static assets in production
  if(client_path != null) {
    app.use(express.static(client_path));
  }

  var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  }

  app.use(bodyParser.json({ limit: '50mb', verify: rawBodySaver }));

  const supported_extensions = ['ppj'];
  const get_extension = (path) => path.split('.').pop();

  app.get('/api/v2/image', async function(req, res) {
    let filter = req.query.filter;
    let sort = req.query.sort;
    let selected = await imageModel.find(filter).sort(sort);
    res.json(selected);
  });

  app.put('/api/v2/image', async function(req, res) {
    const id = req.body._id;
    const field = req.body.field;
    const value = req.body.value;
    let response = null;
    let success = false;
    try {
      switch(field) {
        case 'selected':
          response = await imageModel.findByIdAndUpdate(id, {selected: value});
          success = true;
          break;
        case 'visible':
          response = await imageModel.findByIdAndUpdate(id, {visible: value});
          success = true;
          break;
        default:
          success = false;
          break;
      } 
    }
    catch(e) {
      success = false;
    }
    finally {
      res.json({
        success: success
      });
    }
  });

  app.post('/api/v2/image', async function(req, res) {
    let file_path = req.body.file_path;
    let success = false;
    try {
      let file_extension = get_extension(file_path);
      if(supported_extensions.includes(file_extension)) {
        switch(file_extension) {
          case 'ppj':
            var metaData = ppjParser.convertXml(file_path)
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
              'file_path': file_path,
              'file_extension': file_extension,
              'points': JSON.stringify(points)
            });
            success = true;
          default:
            success = false;
            break;
        }
      }
    } 
    catch (e) {
      success = false;
    } 
    finally {
      res.json({
        success: success
      });
    };
  });

  app.get('/user/:userId/image/:imageId', function (req, res) {
    res.send(req.params)
  })

  process.on('SIGTERM', () => dbHandler.closeDatabase())
  process.on('SIGINT', () => dbHandler.closeDatabase())

  s = app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
  });

  return s;
}

module.exports = server;