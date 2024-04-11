export async function AddTaskToProject({id, name}) {
  try {
    const storedProject = localStorage.getItem('clickedProjectId')

    if (storedProject) {
      const parsedProject = JSON.parse(storedProject)
      if (parsedProject.key !== '' || parsedProject.key !== null) {
        const projectId = parsedProject.key

        const task = {
          name: name,
          status:
            id === 1
              ? 'Ongoing'
              : id === 2
                ? 'Planned'
                : id === 3
                  ? 'Completed'
                  : '',
        }

        const response = await fetch(
          `http://localhost:5183/Projects/${projectId}/addtask`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
          }
        )

        try {
          console.log('The response is: ' + response)
          const data = await response.json()

          //console.log("RESPONSESSSS")
          //console.log(response.data.data)

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

export async function AddSubTaskToTask({id, name}) {
  try {
    console.log('The Task id: ' + id)
    console.log('The Subtask name is: ' + name)
    const subTask = {
      name: name,
      completed: false,
    }

    const response = await fetch(
      `http://localhost:5183/Tasks/${id}/addSubTask`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subTask),
      }
    )

    try {
      console.log('The response is: ' + response)
      const data = await response.json()

      //console.log("RESPONSESSSS")
      //console.log(response.data.data)

      return data
    } catch (e) {
      console.log('entered the data condition of try catch')
      console.log(e)
    }

    //We also call the methods to get data from API for his recent projects and recent external projects
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}

export async function AddTagToTask({id, name, color}) {
  try {
    console.log('The Task id: ' + id)
    console.log('The Tag name is: ' + name)
    const tag = {
      name: name,
      color: color,
    }

    const response = await fetch(`http://localhost:5183/Tasks/${id}/addTag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    })

    try {
      console.log('The response is: ' + response)
      const data = await response.json()

      //console.log("RESPONSESSSS")
      //console.log(response.data.data)

      return data
    } catch (e) {
      console.log('entered the data condition of try catch')
      console.log(e)
    }

    //We also call the methods to get data from API for his recent projects and recent external projects
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}

export async function GetTaskSubTasks({id}) {
  try {
    const response = await fetch(
      `http://localhost:5183/Tasks/${id}/getSubTasks`,
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
export async function GetTaskTags({id}) {
  try {
    const response = await fetch(`http://localhost:5183/Tasks/${id}/getTags`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

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

export async function RemoveAllTaskSubTasks({id}) {
  try {
    const response = await fetch(
      `http://localhost:5183/Tasks/${id}/removeAllSubTasks`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    try {
      console.log('The response is: ' + response)
      const data = await response.json()

      //console.log("RESPONSESSSS")
      //console.log(response.data.data)

      return data
    } catch (e) {
      console.log('entered the data condition of try catch')
      console.log(e)
    }

    //We also call the methods to get data from API for his recent projects and recent external projects
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}
