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
import SearchIcon from "@mui/icons-material/Search";
import { appAxios } from '../../utils/axios'
import InputAdornment from '@mui/material/InputAdornment';


function Todo() {

  const [open, setOpen] = React.useState(false);
  const [todoList, setTodoList] = React.useState(null);
  const [searchedTodoList, setSearchedTodoList] = React.useState(null);
  const [currentDisplayedTodoList, setCurrentDisplayedTodoList] = React.useState(null);



  React.useEffect(() => {
    appAxios.get('/todoList').then((response) => {
      setTodoList(response.data);
      setSearchedTodoList(response.data);
      setCurrentDisplayedTodoList(response.data);
    });
  }, []);

  if (!todoList) return null;



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTodo = (id) => {


    appAxios.delete(`/todoList/${id}`).then(() => {
      setTodoList(todoList.filter(todoItem => todoItem.id !== id))
    })


  }
  const modifyTodo = (id, taskTitle, taskStatus, taskContent) => {


    appAxios.put(`/todoList/${id}`, { id: id, taskTitle: taskTitle, taskStatus: taskStatus, taskContent: taskContent })
      .then(() => {
        setTodoList(() => {
          const updatedTodoList = todoList.map((todoItem) => {
            if (todoItem.id === id) {
              return { ...todoItem, taskTitle: taskTitle, taskStatus: taskStatus, taskContent }
            }
            else
              return todoItem
          })

          return updatedTodoList

        })
      })



  }

  const searchFilter = (searchText) => {
    const searchFilteredList = todoList.filter((todoItem) =>
      todoItem.taskTitle.toLowerCase().includes(searchText.toLowerCase())

    )

    setSearchedTodoList(searchFilteredList);
    if (searchText.length == 0) {
      setCurrentDisplayedTodoList(todoList);
    }
    else {
      setCurrentDisplayedTodoList(searchedTodoList);

    }


  }
  const listToDos = currentDisplayedTodoList.map((todoItem) => (
    <ToDoItem

      key={todoItem.id}
      id={todoItem.id}
      taskTitle={todoItem.taskTitle}
      taskContent={todoItem.taskContent}
      taskStatus={todoItem.taskStatus}
      deleteTodo={deleteTodo}
      modifyTodo={modifyTodo}
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

        <CardContent>


          <TextField
            color="primary"
            margin="dense"
            fullWidth
            id="search-todo"
            label="Search Todo"
            variant="outlined"
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment:
                (
                  <InputAdornment position="end">
                    <Close />
                  </InputAdornment>
                ),
            }}

            onChange={(e) => {
              searchFilter(e.target.value);
            }}

          />

        </CardContent>


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
    appAxios.post('/todoList', newTodo).then(() => {
      setTodoList([...todoList, newTodo]);
      handleClose();
    });

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
