const projectsStoreName = 'projects'

export const addProjectToDb = (boardId, data) => {
  let boards = []

  const store = getFromDb(projectsStoreName)
  if (store) {
    boards = store
  }
  boards.push(data)
  updateDb(projectsStoreName, boards)

  return true
}

export const getProjectFromDb = (id) => {
  let boards = []

  const store = getFromDb(projectsStoreName)
  if (store) {
    boards = store
    return boards.find((board) => board.id === id)
  }
  return undefined
}

export const getProjectsFromDb = (userId) => {
  //Add the fetch here
  const store = getFromDb(projectsStoreName)
  if (store) {
    return store
  }
  return 'No projects found'
}

export const getExternalProjectsFromDb = () => {
  let boards = []

  //Add the fetch here
  const store = getFromDb(projectsStoreName)
  if (store) {
    boards = store
  }
  return boards
}

export const updateProjectDataInDb = (boardId, data) => {
  const boards = getProjectsFromDb()
  const filteredBoards = boards.filter((board) => board.id !== boardId)
  const newBoards = [...filteredBoards, data]
  updateDb(projectsStoreName, newBoards)
  return true
}

const getFromDb = async () => {
  /*if (response) {
    return response
  }
  return response*/
}

const updateDb = (storeName, data) => {
  localStorage.setItem(storeName, JSON.stringify(data))
}
