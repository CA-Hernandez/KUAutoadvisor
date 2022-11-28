const express = require('express');
const path = require('path');
const docparser = require('docparser-node');
const client = new docparser.Client("33f16418fd16a4f66bd257153ac03b094cc786ff");
const parserID = "cslfmvewjrvo";
const multer = require('multer');
const data = require('./TrasncriptJSON-2022-04-21.json')[0].final;
const schedule = require('./schedule.json');

const app = express();




//this creates the filestream needed to upload to API endpoint
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




// Upload Route
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const stream = fs.createReadStream(`${__dirname}/../client/public/uploads/${file.filename}`);

  
  if (file == null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }



  //THIS WORKS 
  /*
  try 
  {
    let result = await client.uploadFileByStream(parserID, stream);
    let docID = result.id;
    console.log("This is the document ID: " + docID);
    console.log("waiting for response...");

    //We have to wait for a response from the API so thats what delay is for
    await delay(50000);
    let parsedData = await client.getResultsByDocument(parserID,docID, {format: 'object'});
    let transcript = parsedData[0].final;  

    return res.status(200).send(transcript); 
  } 
  catch (err) 
  {
    console.error(err)
    return res.status(500).json({ msg: 'An error occurred' })
  }
  */
  
  await delay(10000);

  return res.status(200).send(data); 


});




// Schedule
app.get("/schedule", (req, res) => {

//make function call to DB to generate schedule

try{
  return res.status(200).send(schedule); 
} 
catch (err) 
{
  console.error(err)
  return res.status(500).json({ msg: 'An error occurred' })
}
});





// This function delays the actions of whatever code precedes it
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
};




app.listen(9999, () => console.log('Server Started...'));

