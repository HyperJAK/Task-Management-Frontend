export async function UpdateSubTask({id, name, completed}) {
  try {
    const subTask = {
      name: name,
      completed: completed,
    }
    const response = await fetch(`http://localhost:5183/SubTasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subTask),
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

export async function RemoveSubTask({id}) {
  try {
    const response = await fetch(`http://localhost:5183/SubTasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
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
