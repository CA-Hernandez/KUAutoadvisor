import React from 'react'
import FileUpload from '../components/FileUpload'

const Upload = () => {
  return (
    <div className='container mt-4'>
      <h2 style={{ padding: "10px 20px", textAlign: "center", color: "red"}}>Please Submit a Unofficial Transcript from MYKU,See the About Tab on how to retrieve transcript</h2>
      <h4 className='display-4 text-center mb-4'>
        <center>
        <FileUpload/>
        </center>
      </h4>
    </div>
  )
}

export default Upload