import axios from 'axios';

async function load(file) {
  var file_obj = JSON.stringify(file);
  var res = await axios.post("/api/v2/image", {
    file_obj: file_obj
  });
  return res;
}

async function get(filter, sort) {
  var res = await axios.get("/api/v2/image", {
    params: {
      filter: JSON.stringify(filter),
      sort: JSON.stringify(sort)
    }
  });
  return res;
}

async function fileManip(filter) {
  var res = await axios.get("/api/v2/fileManip", {
    params: {
      filter: JSON.stringify(filter),
    }
  });
  return res;
}

async function removeFilesByBasePath(remFiles) {
  console.log("client query : ", remFiles);
  var toInsert = JSON.stringify(remFiles);
  console.log("client toInsert: ", toInsert);
  var res = await axios.put("/api/v2/remBasePath", {
    remFiles: remFiles

  });
  return res;
}

async function update(id, field, value) {
  var res = await axios.put("/api/v2/image", {
    _id: id,
    field: field,
    value: value
  });
  return res.data.success;
}

async function get_unique_fields() {
  var res = await axios.get("/api/v2/images/unique");
  return res.data;
}

async function generateAllThumbnails(command, imgext){
  var res = await axios.put("/api/v2/images/allThumbnails", {
    thumbCommand: command,
    extension: imgext
  });
  return res.data.newPaths;
};

async function generateThumbnail(command, imgext, imagePath){
  var res = await axios.put("/api/v2/images/oneThumbnails", {
    thumbCommand: command,
    extension: imgext,
    imgPath: imagePath
  });
  return res.data.newPath;
}

async function get_meta_data(id) { //search by file schema by fileid and return metadata
  var res = await axios.get("/api/v2/images/metadataid", {
    params: {
      file_id: id
    }
  });
  //console.log(res.data)
  //var data = JSON.parse(res)
  //console.log(typeof(data))
  return res.data;
}

const Client = { load, update, get, get_unique_fields, fileManip, removeFilesByBasePath, generateAllThumbnails, generateThumbnail, get_meta_data};
export default Client;