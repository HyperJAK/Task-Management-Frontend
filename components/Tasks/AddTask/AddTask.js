import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  TextField,
} from '@mui/material'
import React, {ChangeEvent, FormEvent, useState} from 'react'
import {addTask} from '../../../service/task'
import {Task} from '../../../types/project'
import {Status} from '../../../types/status'
import './AddTask.css'

export const AddTask = ({show, boardId, onClose}) => {
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [createdBy, setCreatedBy] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const task = {
      id: '1',
      name: taskName,
      description: taskDescription,
      status: 'Not started',
      createdBy: createdBy,
      createdAt: new Date(),
    }
    addTask(task, boardId)
    onClose()
  }

  return (
    <Dialog
      onClose={() => onClose()}
      aria-labelledby="simple-dialog-title"
      open={show}>
      <DialogTitle id="simple-dialog-title">Add Task</DialogTitle>

      <form onSubmit={handleSubmit}>
        <Card
          variant="outlined"
          className="AddTaskCard">
          <CardContent className="AddTaskCardContent">
            <TextField
              className="AddTaskTextField"
              required
              id="filled-required"
              label="Task Name"
              placeholder="Enter a task name"
              defaultValue={taskName}
              variant="outlined"
              onChange={(event) => setTaskName(event.target.value)}
            />
            <TextField
              className="AddTaskTextField"
              required
              id="filled-required"
              label="Description"
              placeholder="Enter description"
              defaultValue={createdBy}
              variant="outlined"
              onChange={(event) => setTaskDescription(event.target.value)}
            />
            <TextField
              className="AddTaskTextField"
              required
              id="filled-required"
              label="Your Name"
              placeholder="Enter your name"
              defaultValue={createdBy}
              variant="outlined"
              onChange={(event) => setCreatedBy(event.target.value)}
            />
          </CardContent>
          <CardActions className="AddTaskCardAction">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="AddTaskButton">
              Add
            </Button>
          </CardActions>
        </Card>
      </form>
    </Dialog>
  )
}
