'use client'
import {useEffect, useState} from 'react'
import '../App.css'
import Navbar from '../../components/Projects/Navbar/Navbar'
import Board from '../../components/Projects/Board/Board'
// import data from '../data'
import {DragDropContext} from 'react-beautiful-dnd'
import {v4 as uuidv4} from 'uuid'
import Editable from '../../components/Projects/Editable/Editable'
import useLocalStorage from 'use-local-storage'
import '../Bootstrap.css'
import {forEach} from 'react-bootstrap/ElementChildren'
import {AddTaskToProject, GetProjectTasks} from '@/components/Config/Utilities'
const Project = () => {
  const [data, setData] = useState([])
  const [loadedData, setLoadedData] = useState(false)

  const defaultDark = window.matchMedia('(prefers-colors-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light'
  )

  const switchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid)
    const tempData = [...data]
    tempData[index].boardName = title
    setData(tempData)
  }

  const dragCardInBoard = (source, destination) => {
    let tempData = [...data]
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    )
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    )
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    )
    tempData[sourceBoardIdx].card.splice(source.index, 1)

    return tempData
  }

  // const dragCardInSameBoard = (source, destination) => {
  //   let tempData = Array.from(data);
  //   console.log("Data", tempData);
  //   const index = tempData.findIndex(
  //     (item) => item.id.toString() === source.droppableId
  //   );
  //   console.log(tempData[index], index);
  //   let [removedCard] = tempData[index].card.splice(source.index, 1);
  //   tempData[index].card.splice(destination.index, 0, removedCard);
  //   setData(tempData);
  // };

  const addTask = async (title, bid) => {
    const index = data.findIndex((item) => item.id === bid)
    const tempData = [...data]

    //Here we add the logic to add a Task
    const response = await AddTaskToProject({id: bid, name: title})

    console.log(response.id)
    console.log(response.name)
    if (response) {
      tempData[index].card.push({
        id: response.id,
        name: response.name,
        tags: [],
        subtasks: [],
      })
      setData(tempData)
    } else {
      console.log('No response')
    }
  }

  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId)
    const tempData = [...data]
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId)

    tempData[index].card.splice(cardIndex, 1)
    setData(tempData)
  }

  const removeBoard = (bid) => {
    const tempData = [...data]
    const index = data.findIndex((item) => item.id === bid)
    tempData.splice(index, 1)
    setData(tempData)
  }

  const onDragEnd = (result) => {
    const {source, destination} = result
    if (!destination) return

    if (source.droppableId === destination.droppableId) return

    setData(dragCardInBoard(source, destination))
  }

  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid)
    if (index < 0) return

    const tempBoards = [...data]
    const cards = tempBoards[index].card

    const cardIndex = cards.findIndex((item) => item.id === cid)
    if (cardIndex < 0) return

    tempBoards[index].card[cardIndex] = card
    console.log(tempBoards)
    setData(tempBoards)
  }

  useEffect(() => {
    async function fetchData() {
      const storedProject = localStorage.getItem('clickedProjectId')

      if (storedProject) {
        const parsedProject = JSON.parse(storedProject)
        if (parsedProject.key !== '' || parsedProject.key !== null) {
          const projectId = parsedProject.key

          const response = await GetProjectTasks({id: projectId})

          if (response) {
            const tempData = [...data]

            //We add the default boards
            if (data.length === 0) {
              tempData.push({
                id: 1,
                boardName: 'Ongoing',
                card: [],
              })

              tempData.push({
                id: 2,
                boardName: 'Planned',
                card: [],
              })
              tempData.push({
                id: 3,
                boardName: 'Completed',
                card: [],
              })
            }

            //We fill the tasks in the correct board

            response.forEach((task) => {
              //because API doesnt return the empty subtasks array with tasks, then we initialise it
              if (!task.subtasks) {
                task.subtasks = []
              }

              //same with tags
              if (!task.tags) {
                task.tags = []
              }

              if (task.status === 'Ongoing') {
                tempData[0].card.push(task)
              } else if (task.status === 'Planned') {
                tempData[1].card.push(task)
              } else if (task.status === 'Completed') {
                tempData[2].card.push(task)
              }
            })
            //finally we add everything to data object
            setData(tempData)
            setLoadedData(true)
          }
        }
      }
    }

    if (data.length === 0) {
      fetchData()
    }

    localStorage.setItem('kanban-project', JSON.stringify(data))
  }, [data])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="App"
        data-theme={theme}>
        {/*<Navbar switchTheme={switchTheme} />*/}
        <div className="app_outer">
          <div className="app_boards">
            {loadedData &&
              data.map((item) => (
                <Board
                  key={item.id}
                  id={item.id}
                  name={item.boardName}
                  card={item.card}
                  setName={setName}
                  addCard={addTask}
                  removeCard={removeCard}
                  removeBoard={removeBoard}
                  updateCard={updateCard}
                />
              ))}
            {/*The add board component that we use to add columns (should be removed and by default 3 columns are present)*/}
            {/*<Editable
              class={'add__board'}
              name={'Add Board'}
              btnName={'Add Board'}
              onSubmit={addBoard}
              placeholder={'Enter Board  Title'}
            />*/}
          </div>
        </div>
      </div>
    </DragDropContext>
  )
}

export default Project
