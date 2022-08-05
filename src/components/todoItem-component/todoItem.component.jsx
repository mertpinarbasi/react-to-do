import * as React from 'react';
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
import Save from "@mui/icons-material/Save";
import Close from "@mui/icons-material/Close";
import Chip from '@mui/material/Chip';
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function ModifyTodoDialog(props) {
  const { onClose, open, modifyTodo, todoItem } = props;
  const id = todoItem.id;
  const [taskTitle, setTaskTitle] = React.useState(todoItem.taskTitle);
  const [taskContent, setTaskContent] = React.useState(todoItem.taskContent);
  const [taskStatus, setTaskStatus] = React.useState(todoItem.taskStatus);


  const handleClose = () => {
    onClose();

  };

  const handleCloseThenClear = () => {
    handleClose();
    clearModificationOnClose();
  }

  const clearModificationOnClose = () => {
    console.log("worked close")
    setTaskTitle(todoItem.taskTitle);
    setTaskContent(todoItem.taskContent);
    setTaskStatus(todoItem.taskStatus);
  }


  return (
    <Dialog
      maxWidth="lg"
      fullWidth
      onClose={handleCloseThenClear}
      open={open}
      scroll="body"



    >
      <DialogTitle>Modify Todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Configure To Do Task
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
          value={taskTitle}
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
          value={taskContent}
          onChange={(e) => {
            setTaskContent(e.target.value);
          }}
        />
        <Select
          labelId="select-todo-status"
          id="select-todo-status"

          value={taskStatus}
          label="Select Status"
          fullWidth
          onChange={(e) => {
            setTaskStatus(e.target.value);
          }}
        >
          <MenuItem value={"To-Do"}>To-Do</MenuItem>
          <MenuItem value={"Doing"}>Doing</MenuItem>
          <MenuItem value={"Completed"}>Completed</MenuItem>
          <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          endIcon={<Save />}
          onClick={() => { modifyTodo(id, taskTitle, taskStatus, taskContent); handleClose() }}
        >
          Save
        </Button>
        <Button
          size="small"
          color="error"
          variant="contained"
          endIcon={<Close />}
          onClick={handleCloseThenClear}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}


function TodoItem(props) {
  const { id, taskTitle, taskStatus, taskContent, deleteTodo, modifyTodo } = props;


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div className="ToDoItem">
      <ModifyTodoDialog
        open={open}
        onClose={handleClose}
        modifyTodo={modifyTodo}
        todoItem={{ id: id, taskTitle: taskTitle, taskStatus: taskStatus, taskContent: taskContent }}

      ></ModifyTodoDialog>
      <Card variant="outlined" style={{ backgroundColor: "#FEFFFF" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {taskTitle}
          </Typography>
          <Typography gutterBottom variant="body" component="div">
            {taskContent}
          </Typography>
        </CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chip label={taskStatus} />

          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            spacing={2}
          >
            <CardActions>
              <Button
                size="small"
                style={{ backgroundColor: "#3AAFA9" }}
                variant="contained"
                endIcon={<AutoFixHighIcon />}
                onClick={handleClickOpen}
              >
                Modify
              </Button>
              <Button
                size="small"
                color="error"
                variant="contained"
                endIcon={<DeleteIcon />}
                onClick={() => { deleteTodo(id) }}
              >
                Delete
              </Button>
            </CardActions>
          </Stack>
        </Stack>
      </Card>
    </div>


  );


}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  taskTitle: PropTypes.string.isRequired,
  taskContent: PropTypes.string.isRequired,
  taskStatus: PropTypes.string.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  modifyTodo: PropTypes.func.isRequired
};

ModifyTodoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  modifyTodo: PropTypes.func.isRequired,
  todoItem: PropTypes.object.isRequired,
};

export default TodoItem;
