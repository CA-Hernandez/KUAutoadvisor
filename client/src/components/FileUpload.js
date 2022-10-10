import React, { Fragment, useState } from 'react';
import axios from 'axios';

//import './App.css';
//This is the fileUploader Component.

//This code was grabbed from https://github.com/bradtraversy/react_file_uploader


const FileUpload = () => {
   const [file,setFile] = useState('');
   const [fileName,setFileName] = useState('Choose File');
   const [uploadedFile,setUploadedFile] = useState({});

const onChange = e => {
   setFile(e.target.files[0]);
   setFileName(e.target.files[0].name);
   };

   const onSubmit = async e => {
   e.preventDefault();
   const formData = new FormData();
   formData.append('file', file);

   try {
       const res = await axios.post('/upload', formData, {
       headers: {
           'Content-Type': 'multipart/form-data'
       },
       
       });
       
       // Clear percentage

       const { fileName, filePath } = res.data;

       setUploadedFile({ fileName, filePath });

   } catch (err) {
       if (err.response.status === 500) {
           console.log('There was an error with the server');

       } else {
           console.log(err.response.data.msg);
       }
   }
   };




    return( 
        <Fragment>
            <form onSubmit = {onSubmit}>
                <div className = "custom-file mb-4">
                    <input type = "file" className = "custom-file-input" id ="customFile" onChange = {onChange} />
                    <label className = "custom-file-label" htmlFor = "customFile">{fileName}</label>
                </div>
                <input type = "submit" value = "Upload" className = "btn btn-primary btn-block mt-4"/>

            </form>

        </Fragment>
    );
};

export default FileUpload