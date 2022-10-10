const express = require('express');
const path = require('path');
const docparser = require('docparser-node');
const client = new docparser.Client("33f16418fd16a4f66bd257153ac03b094cc786ff");
const parserID = "cslfmvewjrvo";
const fileUpload = require('express-fileupload');


const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;


  console.log(file);


  file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });



  client.uploadFileByPath(parserID, `${__dirname}/../client/public/uploads/${file.name}`)
  .then(function (result) {
    // => {"id":"document_id","file_size":198989,"quota_used":16,"quota_left":34,"quota_refill":"1970-01-01T00:00:00+00:00"}
    promise.resolve(console.log(result));
  })
  .catch(function (err) {
    console.log(err)
  })

});



/*

//DOC PARSER API
client.ping()
  .then(function() {
    console.log('authentication succeeded!')
  })
  .catch(function(err) {
    console.log('authentication failed!')
  })

  client.getParsers()
  .then(function (parsers) {
    console.log(parsers)
    // => [{"id":"someparserid","label":"My Document Parser"}]

  })
  .catch(function (err) {
    console.log(err)
  })

  client.getResultsByDocument("cslfmvewjrvo", "fe81a5f3676e3403abc493bf17f87b10", {format: 'object'})
  .then(function (result) {
    //console.log(result[0].final)
  })
  .catch(function (err) {
    console.log(err)
  })


*/








app.listen(9999, () => console.log('Server Started...'));



