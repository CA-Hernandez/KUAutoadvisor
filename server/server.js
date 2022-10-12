const express = require('express');
const path = require('path');
const docparser = require('docparser-node');
const client = new docparser.Client("33f16418fd16a4f66bd257153ac03b094cc786ff");
const parserID = "cslfmvewjrvo";
const fileUpload = require('express-fileupload');
const multer = require('multer');
const app = express();


/*

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


app.listen(9999, () => console.log('Server Started...'));

*/



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'client/public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage });

const fs = require('fs')


// Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.file;

  console.log(`${__dirname}/../client/public/uploads/${file.filename}`);

  client.uploadFileByStream(parserID, fs.createReadStream(`${__dirname}/../client/public/uploads/${file.filename}`))
    .then(function (result) {
      Promise.resolve(console.log(result));
    })
    .catch(function (err) {
      console.log(err.stack)
    })

  res.json({ fileName: file.name, filePath: `../client/public/uploads/${file.filename}` });

});

app.listen(9999, () => console.log('Server Started...'));

