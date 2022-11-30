import React from 'react'

function About() {
  return (
    <div>
        <h2 style={{ padding: "15px 20px", textAlign: "center", color: "Maroon"}}>About</h2>
        <h3 style={{ padding: "10px 20px", textAlign: "left", color: "Maroon"}}>How to use 
            <p style={{color: 'black'}}>
                Step 1: Have an Unofficial transcript from MYKU, navigate to academic records - view Unofficial transcript - hit submit - view requests - download file
            </p>
            <p style={{color: 'black'}}>
                Step 2: Navigate to the Upload section and choose the transcript provided from MYKU
            </p>
            <p style={{color: 'black'}}>
                Step 3: Navigate to Schedule and you will have the ability to view and make changes to the generated schedule
            </p>
        </h3>
        <h4 style={{ padding: "15px 20px", textAlign: "center", color: "Maroon"}}>
            <p>
                Source Code:  <a href = 'https://github.com/Jaybasto/KUAutoadvisor'>https://github.com/Jaybasto/KUAutoadvisor</a>
            </p>
        </h4>
    </div>
  )
}

export default About