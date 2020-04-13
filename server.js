const express = require("express");
const {execSync} = require("child_process");
const fs = require("fs");
const bodyParser = require("body-parser");
global.atob = require("atob");


function server(client_path) {
  const app = express();

  app.set("port", process.env.PORT || 3001);

  // SQLite DB components
  const testdb = require('./Database/Database')
  const testdbobj = new testdb()

  // Express only serves static assets in production
  if(client_path != null) {
    app.use(express.static(client_path));
  }

  var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  }

  // app.use(bodyParser.raw({ limit: '50mb', verify: rawBodySaver, type: '*/*' }));
  app.use(bodyParser.json({ limit: '50mb', verify: rawBodySaver }));
  // app.use(bodyParser.urlencoded({ limit: '50mb', verify: rawBodySaver, extended: true, parameterLimit:50000 }));

  const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  // api/v1/image
  app.route("/api/v1/image")
    .get(function (req, res) {
      res.json({
        msg: 'Get an image'
      });
      console.log(req.body);
    })
    .post(function (req, res) {
      let buff = Buffer.from(req.body.buffer, 'base64');
      fs.writeFileSync(req.body.filename, buff);    
      var output = execSync("gdalinfo -json " + req.body.filename);
      // Test insert of a value
      testdbobj.testinsert(req.body.filename);
      fs.unlinkSync(req.body.filename);
      res.json(JSON.parse(output));
    })
    .put(function (req, res) {
      res.json({
        msg: 'Update an image'
      });
      console.log(req.body);
    });

  const supported_extensions = ['ntf'];
  const get_extension = (path) => path.split('.').pop();
  const image_db = new testdb();

  app.get('/api/v2/image', function(req, res) {
    let file_path = req.query.file_path;
    let success = false;
    let selected = [];
    try {
      let raw_select = image_db.select(file_path);
      selected = raw_select[0].values.map(entry => {
        const e = {}
        raw_select[0].columns.forEach((c, idx) => {
          e[c] = entry[idx];
        })
        return e;
      });
      success = true;
    } catch(e) {
      success = false;
      selected = [];
    } finally {
      res.json({
        success: success,
        data: selected
      });
    }
  });

  app.post('/api/v2/image', function(req, res) {
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
            image_db.insert(file_path, file_extension, thumbnail_path, thumbnail_extension, mission, camera, geojson);
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

  s = app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
  });

  return s;
}

module.exports = server;