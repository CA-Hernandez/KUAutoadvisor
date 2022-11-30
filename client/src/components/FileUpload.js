//FileUpload.js

import React, { Fragment, useState, useEffect,useMemo } from 'react';
import axios from 'axios';
import Table from "./Table";
import Message from './Message';
import Progress from './Progress';
import '../App.css';
//This is the fileUploader Component.
 
//This code was grabbed from https://github.com/bradtraversy/react_file_uploader and modified
 
 
const FileUpload = () => {
  const [file,setFile] = useState('');
  const [fileName,setFileName] = useState('Choose File');
  const [data,setData] = useState([]);
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [tableData,setTableData] = useState(true);
 


const onChange = e => {
  setFile(e.target.files[0]);
  setFileName(e.target.files[0].name);
  };


  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });
      setData(res.data);
      console.log(setData);
      setTableData(false);
      
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 10000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('Transcript Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
  };

  /* 
    - Columns is a simple array right now, but it will contain some logic later on. It is recommended by react-table to memoize the columns data
    - Here in this example, we have grouped our columns into two headers. react-table is flexible enough to create grouped table headers
  */
    const columns = useMemo(
      () => [
        {
          // first group - Schedule
          Header: "Schedule",
          // First group columns
          columns: [
            {
              Header: "Course",
              accessor: "course"
            },
            {
              Header: "Coursename",
              accessor: "coursename"
            },
            {
              Header: "Attempted",
              accessor: "attempted"
            },
            {
              Header: "Received",
              accessor: "received"
            }
            ,
            {
              Header: "Grade",
              accessor: "grade"
            }

          ]
        }
      ],
      []
    );





  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {fileName}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
      {tableData ? (
         <p/>
         ):
         ( 
         <Table columns={columns} data={data} />
         )
      }
      
    </Fragment>
  );
};
 
export default FileUpload
 
 
