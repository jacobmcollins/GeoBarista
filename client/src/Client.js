import axios from 'axios';

async function load(file) {
  var file_obj = JSON.stringify(file);
  var res = await axios.post("/api/v2/image", {
      file_obj: file_obj
  });  
  return res.data;
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

async function update(id, field, value) {
  var res = await axios.put("/api/v2/image", {
    _id: id,
    field: field,
    value: value
  });
  return res.data.success;
}

const Client = { load, update, get };
export default Client;