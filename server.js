const express = require("express");
const runsync = require("runsync");
const fs = require("fs");
const bodyParser = require("body-parser");
global.atob = require("atob");

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
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
    var output = runsync.exec("gdalinfo -json " + req.body.filename);
    res.json(JSON.parse(output));
  })
  .put(function (req, res) {
    res.json({
      msg: 'Update an image'
    });
    console.log(req.body);
  });

app.get('/user/:userId/image/:imageId', function (req, res) {
  res.send(req.params)
})

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
