export async function CreateProject({title, description}) {
  try {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser.userId !== '' || parsedUser.userId !== null) {
        const userId = parsedUser.userId

        const project = {
          title: title,
          description: description,
          creationDate: new Date(),
          creatorId: userId,
        }

        console.log(project.title)
        console.log(project.description)
        console.log(project.creationDate)
        console.log('HI' + userId)

        const response = await fetch(`http://localhost:5183/Projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        })

        try {
          console.log('The response is: ' + response)
          const data = await response.json()

          //console.log("RESPONSESSSS")
          //console.log(response.data.data)

          if (data) {
            await GetUserRecentProjects({id: userId})
          }

          return data
        } catch (e) {
          console.log('entered the data condition of try catch')
          console.log(e)
        }
      }

      //We also call the methods to get data from API for his recent projects and recent external projects
    }
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}

export async function GetUserRecentProjects({id}) {
  try {
    const response = await fetch(
      `http://localhost:5183/Users/${id}/getProjects`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (data) {
      const userForStorage = {
        projects: data,
      }

      localStorage.setItem('projects', JSON.stringify(userForStorage))
      console.log('Saved in local storage after signin')
    }

    return data
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}

export async function GetUserExternalProjects({userId}) {
  try {
    const response = await fetch(
      `http://localhost:5183/Projects/getExternalProjectsForUser/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (data) {
      const userForStorage = {
        externalProjects: data,
      }

      localStorage.setItem('externalProjects', JSON.stringify(userForStorage))
      console.log('Saved in local storage after getting external projects')

      return data
    }

    return null
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}

export async function GetProjectTasks({id}) {
  try {
    const response = await fetch(
      `http://localhost:5183/Projects/${id}/getTasks`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    if (data) {
      return data
    }
    return null
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}

export const getExternalProjects = () => {}

export const getProject = (id) => {}

export const updateProject = (projectId, updatedProject) => {}
