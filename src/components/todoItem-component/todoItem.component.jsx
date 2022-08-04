import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

TodoItem.propTypes =
{
  id: PropTypes.number,
  taskTitle: PropTypes.string,
  taskContent: PropTypes.string,
  taskStatus: PropTypes.string,
}


function TodoItem({ taskTitle, taskStatus, taskContent }) {
  return (

    <div className="ToDoItem">

      <Card variant='outlined' style={{ backgroundColor: "#FEFFFF" }}>

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
            spacing={2}>


            <CardActions>

              <Button size="small" style={{ backgroundColor: "#3AAFA9" }} variant="contained" endIcon={<AutoFixHighIcon />}>Modify</Button>
              <Button size="small" color="error" variant="contained" endIcon={<DeleteIcon />} >Delete</Button>
            </CardActions>
          </Stack>
        </Stack>
      </Card>
    </div>
  )
}
export default TodoItem;
