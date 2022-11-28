import React from 'react'

function ReadRow({ course, handleEditClick, handleDeleteClick }) {
  return (
<tr>
      <td>{course.course}</td>
      <td>{course.coursename}</td>
      <td>{course.attempted}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, course)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(course.id)}>
          Delete
        </button>
      </td>
    </tr>  
    );
}

export default ReadRow