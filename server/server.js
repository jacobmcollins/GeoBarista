const express = require("express");
const {execSync} = require("child_process");
const bodyParser = require("body-parser");
global.atob = require("atob");

function server(client_path) {
  const app = express();

  app.set("port", process.env.PORT || 3001);

  // SQLite DB components
  const dbHandler = require('./db-handler');
  const imageService = require('./services/image');
  const imageModel = require('./models/image');
  dbHandler.connect();

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

  const supported_extensions = ['ntf'];
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
    let success = false;
    try {
      switch(field) {
        case 'selected':
          const response = await imageModel.findByIdAndUpdate(id, {selected: value});
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
    let thumbnail_path = null;
    let thumbnail_extension = null;
    let mission = null;
    let camera = null;
    let geojson = null;
    try {
      let file_extension = get_extension(file_path);
      if(supported_extensions.includes(file_extension)) {
        switch(file_extension) {
          case 'ntf':
            var gdalinfo_output = execSync(`gdalinfo -json ${file_path}`);
            var gdalinfo = JSON.parse(gdalinfo_output);
            var points = [];
            gdalinfo.gcps.gcpList.forEach((gcp) => {
              points.push([gcp['y'], gcp['x']])
            });
            await imageModel.create({
              'file_path': file_path,
              'file_extension': file_extension,
              'points': JSON.stringify(points)
            });
            success = true;
            break;
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