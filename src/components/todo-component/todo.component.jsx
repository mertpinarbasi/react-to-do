import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToDoItem from '../todoItem-component/todoItem.component'

const fakeList = [{ id: 1, taskTitle: "Item1", taskContent: "todoItem1", taskStatus: "done" }, { id: 2, taskTitle: "Item2", taskContent: "todoItem2", taskStatus: "Doing" }]


function Todo() {

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);


  };
  const listToDos = fakeList.map(todoItem =>
    <ToDoItem
      key={todoItem.id}
      taskTitle={todoItem.taskTitle}
      taskContent={todoItem.taskContent}
      taskStatus={todoItem.taskStatus}>
    </ToDoItem>);


  return (
    <div className="ToDo">
      <AddTodoDialog open={open} onClose={handleClose}></AddTodoDialog>
      <Card style={{ backgroundColor: "#DEF2F1" }}>
        <CardContent>
          {listToDos}
        </CardContent>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}>



          <CardActions>
            <Button size="medium" variant="contained" color="primary" onClick={handleClickOpen}>Add Todo</Button>

          </CardActions>
        </Stack>
      </Card>
    </div>



  )


}

function AddTodoDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };




  return (
    <Dialog
      maxWidth="lg"
      fullWidth onClose={handleClose}
      open={open}
      scroll="body"
    >
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>

      </DialogActions>
    </Dialog>
  );
}

AddTodoDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,

};

export default Todo;
