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
const Project = () => {
  const [data, setData] = useState(
    localStorage.getItem('kanban-project')
      ? JSON.parse(localStorage.getItem('kanban-project'))
      : []
  )

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

  const addCard = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid)
    const tempData = [...data]
    tempData[index].card.push({
      id: uuidv4(),
      title: title,
      tags: [],
      task: [],
    })
    setData(tempData)
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
    function addBoards() {
      const tempData = [...data]

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
      for (const element in data) {
        if (element.status === 'Ongoing') {
          tempData[0].card.push(element)
        } else if (element.status === 'Planned') {
          tempData[1].card.push(element)
        } else if (element.status === 'Completed') {
          tempData[2].card.push(element)
        }
      }

      setData(tempData)
    }
    addBoards()
    localStorage.setItem('kanban-project', JSON.stringify(data))
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="App"
        data-theme={theme}>
        {/*<Navbar switchTheme={switchTheme} />*/}
        <div className="app_outer">
          <div className="app_boards">
            {data.map((item) => (
              <Board
                key={item.id}
                id={item.id}
                name={item.boardName}
                card={item.card}
                setName={setName}
                addCard={addCard}
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
