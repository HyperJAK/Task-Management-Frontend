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
  let boards = []

  //Add the fetch here
  const store = getFromDb(projectsStoreName)
  if (store) {
    boards = store
  }
  return boards
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

const getFromDb = (storeName) => {
  const store = localStorage.getItem(storeName)
  if (store) {
    return JSON.parse(store)
  }
  return store
}

const updateDb = (storeName, data) => {
  localStorage.setItem(storeName, JSON.stringify(data))
}
