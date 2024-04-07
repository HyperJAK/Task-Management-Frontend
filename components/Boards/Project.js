import {CircularProgress, Typography} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getProject} from '@/service/projects'
import {ProjectArea} from '@/components/Boards/ProjectArea/ProjectArea'
import './Board.css'

export const BoardComponent = () => {
  let {id} = useParams()
  const [board, setBoard] = useState(undefined)
  const [loading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData(id) {
      setIsLoading(true)
      setBoard(getProject(id))
      setIsLoading(false)
    }
    fetchData(id)
  }, [id])

  if (loading) {
    return (
      <div className="BoardLoading">
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      {board ? (
        <BoardArea board={board} />
      ) : (
        <Typography>Board not found</Typography>
      )}
    </>
  )
}

export default Board
