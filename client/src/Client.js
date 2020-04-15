import axios from 'axios';

async function load(file) {
  var file_path = file.path;
  var res = await axios.post("/api/v2/image", {
      file_path: file_path
  });
  
  return res.data;
}

async function get_all() {
  var res = await axios.get("/api/v2/image", {});
  return res;
}

async function update(id, field, value) {
  var res = await axios.put("/api/v2/image", {
    _id: id,
    field: 'selected',
    value: true
  });
  return res.body.success;
}

const Client = { load, get_all };
export default Client;