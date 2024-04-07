import {
  addProjectToDb,
  getExternalProjectsFromDb,
  getProjectFromDb,
  getProjectsFromDb,
  updateProjectDataInDb,
} from '@/repository/projectsDbManagement'
export const addNewProject = async (newProject) => {
  const user = {
    name: newProject.createdBy,
    id: newProject.id,
    status: 'Not Started',
  }
  const projectData = {
    ...newProject,
    id: /*idk find a solution*/ '',
    tasks: '',

    createdById: user.id,
    status: 'Not Started',
  }
  addProjectToDb(projectData.id, projectData)

  return projectData.id
}

export const getProjects = () => {
  return getProjectsFromDb()
}

export const getExternalProjects = () => {
  return getExternalProjectsFromDb()
}

export const getProject = (id) => {
  return getProjectFromDb(id)
}

export const updateProject = (projectId, updatedProject) => {
  updateProjectDataInDb(projectId, updatedProject)
  return true
}
