import React from "react";
// import { useState } from 'react';

const fakeList = [{ id: 1, taskContent: "todoItem1", taskStatus: "done" }, { id: 2, taskContent: "todoItem2", taskStatus: "Doing" }]

import ToDoItem from '../todoItem-component/todoItem.component'
function Todo() {


  const listToDos = fakeList.map(todoItem =>
    <ToDoItem
      key={todoItem.id}
      taskContent={todoItem.taskContent}
      taskStatus={todoItem.taskStatus}>
    </ToDoItem>);

  return (
    <div className="ToDo">
      {listToDos}
    </div>



  )
}
export default Todo;
