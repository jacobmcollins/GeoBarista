const express = require("express");
const bodyParser = require("body-parser");
var Parser = require('../FileParse/ppjParse')

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

  // FileHandler components
  const fileHandler = require('../FileParse/file-handler');
  
  var rawBodySaver = function (req, res, buf, encoding) {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  }

  app.use(bodyParser.json({ limit: '50mb', verify: rawBodySaver }));

  app.get('/api/v2/image', async function(req, res) {
    let filter = JSON.parse(req.query.filter);
    let sort = JSON.parse(req.query.sort);
    console.log('filter', filter);
    console.log('sort:', sort);
    let selected = await imageModel.find(filter).sort(sort);
    console.log("SELECTED",selected);
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
    let file_list = req.body.file_obj;
    let file_list_obj = JSON.parse(file_list);
    let success = false;
    let fileHandlerObj = new fileHandler(file_list_obj);
    success = true;
    res.json({
       success: success
    });
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