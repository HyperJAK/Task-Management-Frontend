import {Task} from '../types/board'
import {getProject, updateProject} from './projects'

export const addTask = (task, boardId) => {
  const board = getProject(boardId)
  if (board) {
    board.tasks = [...board.tasks, task]
    updateProject(boardId, board)
    return true
  }
  console.log('board not found')
  return false
}

export const deleteTask = (taskId, boardId) => {
  const board = getProject(boardId)
  if (board) {
    board.tasks = board.tasks.filter((task) => task.id !== taskId)
    updateProject(boardId, board)
    return true
  }
  console.log('board not found')
  return false
}
