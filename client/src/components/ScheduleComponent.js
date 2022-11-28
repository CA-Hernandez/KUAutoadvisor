import React, { Fragment, useState, useEffect,useMemo } from 'react';
import axios from 'axios'
import { nanoid } from "nanoid";

import "../App.css";
import ReadOnlyRow from './ReadRow';
import EditableRow from './EditableRow';


function ScheduleComponent() {

  const [data, setData] = useState([]);
  const [addFormData, setAddFormData] = useState({
    course: "",
    coursename: "",
    attempted: ""
  });

  const [editFormData, setEditFormData] = useState({
    course: "",
    coursename: "",
    attempted: ""
  });
  const [editScheduleId, setEditScheduleId] = useState(null);



  //GET Request to get the data
  const getData = async () =>{ 
    try {
      const res = await axios.get('/schedule')
      setData(res.data)

    } 
    catch (err) {
      console.log(err) 
    }
  }

  // Calling the function on component mount
  useEffect(() => {
    getData();
  }, []);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newCourse = {
      id: nanoid(),
      course: addFormData.course,
      coursename: addFormData.coursename,
      attempted: addFormData.attempted,
    };

    const newCourses = [...data, newCourse];
    setData(newCourses);
  };



  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedCourse = {
      id: editScheduleId,
      course: editFormData.course,
      coursename: editFormData.coursename,
      attempted: editFormData.attempted,
    };

    const newCourses = [...data];

    const index = data.findIndex((course) => course.id === editScheduleId);

    newCourses[index] = editedCourse;

    setData(newCourses);
    setEditScheduleId(null);
  };






  const handleEditClick = (event, schedule) => {
    event.preventDefault();
    setEditScheduleId(schedule.id);

    const formValues = {
      course: schedule.course,
      coursename: schedule.coursename,
      attempted: schedule.attempted,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditScheduleId(null);
  };

  const handleDeleteClick = (scheduleId) => {
    const newCourses = [...data];

    const index = data.findIndex((course) => course.id === scheduleId);

    newCourses.splice(index, 1);

    setData(newCourses);
  };


  return (
<div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table class = "styled-table">
          <thead>
            <tr class="active-row">
              <th>Course</th>
              <th>Course Name</th>
              <th>Attempted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course) => (
              <Fragment>
                {editScheduleId === course.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    course={course}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a Course</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="course"
          required="required"
          placeholder="Enter a Course..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="coursename"
          required="required"
          placeholder="Enter Course Name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="attempted"
          required="required"
          placeholder="Attempted credits..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default ScheduleComponent