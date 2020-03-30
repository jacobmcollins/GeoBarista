import axios from 'axios';

async function load(file) {
  var b = await file.arrayBuffer();
  var name = file.name;
  var res = await axios.post("/api/v1/image", {
      filename: name,
      buffer: btoa(new Uint8Array(b).reduce(function (data, byte) {
                      return data + String.fromCharCode(byte);
                      }, ''))
                    });
  
  return res.data;
}

const Client = { load };
export default Client;