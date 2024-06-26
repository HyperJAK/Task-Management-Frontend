'use client'
import {useEffect, useState} from 'react'
import '../../App.css'

import Board from '../../../components/Projects/Board/Board'
// import data from '../data'
import {DragDropContext} from 'react-beautiful-dnd'

import useLocalStorage from 'use-local-storage'
import '../../Bootstrap.css'

import {
  AddTaskToProject,
  GetTaskSubTasks,
  GetTaskTags,
  RemoveAllTags,
  RemoveAllTaskSubTasks,
  RemoveTask,
  UpdateTaskStatus,
} from '@/service/task'
import {
  AddTeamateToProject,
  GetProjectTasks,
  GetUserRecentProjects,
  GetUserRoleInProject,
} from '@/service/project'
const Project = () => {
  const [data, setData] = useState([])
  const [loadedData, setLoadedData] = useState(false)
  const [teamateEmail, setTeamateEmail] = useState('')
  const [isCreator, setIsCreator] = useState(false)
  const [currentProjectId, setCurrentProjectId] = useState('')
  const [selectedRole, setSelectedRole] = useState('guest')

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

  const dragCardInBoard = async (source, destination) => {
    let tempData = [...data]
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    )
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    )

    // Get the card being dragged
    const cardToMove = tempData[sourceBoardIdx].card[source.index]

    // Modify the status of the card based on the destination board

    console.log('Destination board : ' + destinationBoardIdx)
    console.log('Source board : ' + sourceBoardIdx)
    const response = await UpdateTaskStatus({
      id: cardToMove.id,
      boardId: destinationBoardIdx + 1,
    })

    if (response) {
      cardToMove.status = response.status
    } else {
      console.log("Couldn't update card status")
    }

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

  const addTask = async ({title, bid}) => {
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

  const removeCard = async ({boardId, cardId}) => {
    const index = data.findIndex((item) => item.id === boardId)
    const tempData = [...data]
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId)
    tempData[index].card.splice(cardIndex, 1)

    //first we remove subtasks
    const response1 = await RemoveAllTaskSubTasks({id: cardId})

    if (response1) {
      //if we remove all subtasks next we remove tags
      const response2 = await RemoveAllTags({id: cardId})

      if (response2) {
        //if we remove all tags next we remove the task itself
        const response3 = await RemoveTask({id: cardId})

        if (response3) {
          setData(tempData)
        } else {
          console.log('Failed to remove Task')
        }
      } else {
        console.log('Failed to remove Subtasks')
      }
    } else {
      console.log('Failed to remove Subtasks')
    }
  }

  const removeBoard = (bid) => {
    const tempData = [...data]
    const index = data.findIndex((item) => item.id === bid)
    tempData.splice(index, 1)
    setData(tempData)
  }

  const onDragEnd = async (result) => {
    const {source, destination} = result
    if (!destination) return

    if (source.droppableId === destination.droppableId) return

    setData(await dragCardInBoard(source, destination))
  }

  const updateCard = ({bid, taskId, task}) => {
    //Add the fetch to update The task
    const index = data.findIndex((item) => item.id === bid)
    if (index < 0) return

    const tempBoards = [...data]
    const cards = tempBoards[index].card

    const cardIndex = cards.findIndex((item) => item.id === taskId)
    if (cardIndex < 0) return

    tempBoards[index].card[cardIndex] = task
    console.log(tempBoards)
    setData(tempBoards)
  }

  useEffect(() => {
    async function fetchData() {
      const storedProject = localStorage.getItem('clickedProjectId')
      const parsedProject = JSON.parse(storedProject)
      const storedUser = localStorage.getItem('user')
      const parsedUser = JSON.parse(storedUser)

      const projectId = parsedProject.key

      if (storedProject) {
        if (parsedProject.key !== '' || parsedProject.key !== null) {
          setCurrentProjectId(projectId)

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

            for (const task of response) {
              //Call for API to get Subtasks and Tags for the task
              const responseSubTasks = await GetTaskSubTasks({id: task.id})

              //Call for API to get Subtasks and Tags for the task
              const responseTags = await GetTaskTags({id: task.id})

              //If the API returns nothing for tags and subtasks then we initialise them to empty
              if (responseSubTasks) {
                task.subtasks = responseSubTasks
              } else {
                if (!task.subtasks) {
                  task.subtasks = []
                }
              }

              if (responseTags) {
                task.tags = responseTags
              } else {
                //same with tags
                if (!task.tags) {
                  task.tags = []
                }
              }

              if (task.status === 'Ongoing') {
                tempData[0].card.push(task)
              } else if (task.status === 'Planned') {
                tempData[1].card.push(task)
              } else if (task.status === 'Completed') {
                tempData[2].card.push(task)
              }
            }
            //finally we add everything to data object
            setData(tempData)
            setLoadedData(true)
          }
        }
      }

      //Added this to check if the user is the creator or not of the project
      const creator = localStorage.getItem('isCreator')
      if (creator) {
        const parsedCreator = await JSON.parse(creator)

        if (parsedCreator.value !== null) {
          setIsCreator(parsedCreator.value)
          console.log('SHould have changed')
        }

        //getting info about role of user
        const roleResponse = await GetUserRoleInProject({
          id: projectId,
          userId: parsedUser.userId,
        })

        if (roleResponse && !isCreator) {
          setSelectedRole(roleResponse)
          console.log('The role of this user is:' + roleResponse)
        }
      }
    }

    if (data.length === 0) {
      fetchData()
    }

    localStorage.setItem('kanban-project', JSON.stringify(data))
  }, [data])

  const handleAddTeamate = async () => {
    if (teamateEmail.length === 0) {
      alert('Please enter a Teamate Email')
    } else {
      const response = await AddTeamateToProject({
        id: currentProjectId,
        email: teamateEmail,
        role: selectedRole,
      })

      if (response) {
        alert('Added successfully')
        setTeamateEmail('')
      } else {
        alert('Couldnt add him')
      }
    }
  }

  const handleTeamateChange = (e) => {
    setTeamateEmail(e.target.value)
  }

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isCreator && (
        <div
          className={
            'flex w-full flex-row items-center justify-center gap-10 bg-black align-middle'
          }>
          <input
            type={'text'}
            value={teamateEmail}
            onChange={handleTeamateChange}
            placeholder={'Email here'}
            className={'m-2 h-12 rounded-2xl pl-2'}
          />
          <div
            className={
              'flex h-5 flex-col justify-center rounded-2xl border border-2 bg-secondary text-center text-white hover:cursor-pointer hover:bg-transparent'
            }>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className={'rounded-2xl bg-gray-200 p-2 text-opposite'}>
              <option value="guest">Guest</option>
              <option value="project-manager">Project Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div
            className={
              'flex h-5 flex-col justify-center rounded-2xl border border-2 bg-secondary p-5 text-center text-white hover:cursor-pointer hover:bg-transparent'
            }
            onClick={handleAddTeamate}>
            Add Teamate
          </div>
        </div>
      )}

      <div
        className="App"
        data-theme={theme}>
        {/*<Navbar switchTheme={switchTheme} />*/}
        <div className="app_outer">
          <div className="app_boards">
            {loadedData &&
              data &&
              data.length > 0 &&
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
                  isCreator={isCreator}
                  selectedRole={selectedRole}
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
