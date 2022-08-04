import React from "react";
import { nanoid } from "nanoid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ToDoItem from "../todoItem-component/todoItem.component";
import Save from "@mui/icons-material/Save";
import Close from "@mui/icons-material/Close";

function Todo() {
  const [open, setOpen] = React.useState(false);
  const [todoList, setTodoList] = React.useState([
    { id: 1, taskTitle: "Item1", taskContent: "todoItem1", taskStatus: "done" },
    {
      id: 2,
      taskTitle: "Item2",
      taskContent: "todoItem2",
      taskStatus: "Doing",
    },
  ]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const listToDos = todoList.map((todoItem) => (
    <ToDoItem
      key={todoItem.id}
      taskTitle={todoItem.taskTitle}
      taskContent={todoItem.taskContent}
      taskStatus={todoItem.taskStatus}
    ></ToDoItem>
  ));

  return (
    <div className="ToDo">
      <AddTodoDialog
        open={open}
        onClose={handleClose}
        todoList={todoList}
        setTodoList={setTodoList}
      ></AddTodoDialog>
      <Card style={{ backgroundColor: "#DEF2F1" }}>
        <CardContent>{listToDos}</CardContent>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <CardActions>
            <Button
              size="medium"
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Add Todo
            </Button>
          </CardActions>
        </Stack>
      </Card>
    </div>
  );
}

function AddTodoDialog(props) {
  const { onClose, open, todoList, setTodoList } = props;
  const [taskTitle, setTaskTitle] = React.useState("");
  const [taskContent, setTaskContent] = React.useState("");
  const handleClose = () => {
    onClose();
  };

  const saveTodo = () => {
    const newTodo = {
      id: nanoid(),
      taskTitle: taskTitle,
      taskContent: taskContent,
      taskStatus: "To-Do",
    };

    setTodoList([...todoList, newTodo]);
  };

  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      onClose={handleClose}
      open={open}
      scroll="body"
    >
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill the information about your new todo task.
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="taskTitle"
          label="Todo Title"
          type="text"
          fullWidth
          variant="standard"
          required
          onChange={(e) => {
            setTaskTitle(e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          id="taskContent"
          label="Todo Content"
          type="text"
          fullWidth
          variant="standard"
          required
          onChange={(e) => {
            setTaskContent(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          endIcon={<Save />}
          onClick={saveTodo}
        >
          Save
        </Button>
        <Button
          size="small"
          color="error"
          variant="contained"
          endIcon={<Close />}
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddTodoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  todoList: PropTypes.array.isRequired,
  setTodoList: PropTypes.func.isRequired,
};

export default Todo;
