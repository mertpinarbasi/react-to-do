import React from "react";
import PropTypes from 'prop-types';


TodoItem.propTypes =
{
  id: PropTypes.number,
  taskContent: PropTypes.string,
  taskStatus: PropTypes.string,
}


function TodoItem({ taskStatus, taskContent }) {
  return (
    <div className="ToDoItem">


      <p>{taskContent}</p>
      <p>{taskStatus}</p>
    </div>
  )
}
export default TodoItem;
