const express = require("express");
const bodyParser = require("body-parser");
var Parser = require('../FileParse/ppjParse');
var ThumbnailUtility = require('../FileParse/ThumbnailUtility');

// import { chopfilename, chopfilepath } from ('../FileParse/file-handler');

function server(client_path) {
  const app = express();

  app.set("port", process.env.PORT || 3001);

  // SQLite DB components
  const dbHandler = require('./db-handler');
  const imageService = require('./services/image');
  const imageModel = require('./models/image');
  const fileModel = require('./models/file');
  dbHandler.connect();

  // Create the PPJ Parser early on
  const ppjParser = new Parser();
  const thumbnailGen = new ThumbnailUtility();

  // Express only serves static assets in production
  if (client_path != null) {
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

  app.get('/api/v2/image', async function (req, res) {
    let filter = await JSON.parse(req.query.filter);
    let sort = await JSON.parse(req.query.sort);
    //console.log('filter', filter);
    //console.log('sort:', sort);
    let selected = await imageModel.find(filter).sort(sort).exec();
    //console.log("Selected",selected);
    //console.log('sort:', sort);
    res.json(selected);
  });

  app.put('/api/v2/image', async function (req, res) {
    const id = req.body._id;
    const field = req.body.field;
    const value = req.body.value;
    let response = null;
    let success = false;
    console.log("adding file");
    try {
      switch (field) {
        case 'selected':
          response = await imageModel.findByIdAndUpdate(id, { selected: value });
          success = true;
          break;
        case 'visible':
          response = await imageModel.findByIdAndUpdate(id, { visible: value });
          success = true;
          break;
        case 'thumbnail_path':
          response = await imageModel.findByIdAndUpdate(id, { thumbnail_path: value });
          success = true;
          break;
        default:
          success = false;
          break;
      }
    }
    catch (e) {
      success = false;
    }
    finally {
      res.json({
        success: success
      });
    }
  });

  app.post('/api/v2/image', async function (req, res) {
    let file_list = req.body.file_obj;
    let file_list_obj = JSON.parse(file_list);
    let fileHandlerObj = new fileHandler(file_list_obj);
    await fileHandlerObj.processList();
    // console.log(JSON.stringify(fileHandlerObj.file_list));
    let results = await imageModel.find({});
    res.json(results);;
  });

  // get selected images from imageModel
  // query filemodel for each selected image
  // return results
  app.get('/api/v2/fileManip', async function (req, res) {
    // query imageModel for selected
    var getSelected = await imageModel.find({ 'selected': true }, { _id: 0, base_path: 1 });
    console.log("MANIP All selected : ", JSON.stringify(getSelected));
    var fileQuery = [];
    //put selected base paths into arry
    for (i = 0; i < getSelected.length; i++) {
      fileQuery.push(getSelected[i].base_path);
    }
    // query filemodel with fileQuery array
    var getFiles = await fileModel.find({ 'base_path': { $in: fileQuery } }, { _id: 0, extension: 1, path: 1, thumb: 1 });
    res.json(getFiles);
  });


  app.get('/api/v2/images/unique', async function (req, res) {
    let all = {};
    let keys = Object.keys(imageModel.schema.paths);
    let i;
    for (i = 0; i < keys.length; i++) {
      all[keys[i]] = await imageModel.distinct(keys[i]).exec();
    }
    res.json(all);
  });

  process.on('SIGTERM', () => dbHandler.closeDatabase())
  process.on('SIGINT', () => dbHandler.closeDatabase())

  s = app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
  });

  //Thumbnail Generation calls
  app.put('/api/v2/images/allThumbnails', async function(req, res){
    const command = req.body.thumbCommand;
    const imgext = req.body.extension;
    let newPaths, response;
    try {
      newPaths = await thumbnailGen.generateAllThumbnails(command, imgext, await imageModel.find({}).sort({}).exec());
      if(newPaths !== null) {
        for (var key in newPaths) {
          response = await imageModel.findByIdAndUpdate(key, {"thumbnail_path": newPaths[key]});
        }
      }
    }
    catch (e) {
      console.log(e);
    }

    res.json({
      newPaths: newPaths
    });
  });

  app.put('/api/v2/images/oneThumbnails', async function(req, res){
    const command = req.body.thumbCommand;
    const imgext = req.body.extension;
    const imagePath = req.body.imgPath;
    let newPath, response;
    try {
      newPath = await thumbnailGen.generateThumbnail(command, imgext, imagePath);
    }
    catch (e) {
      console.log(e);
    }

    res.json({
      newPath: newPath
    });
  });

  return s;
}

module.exports = server;