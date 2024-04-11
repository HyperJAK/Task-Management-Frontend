export async function RemoveTag({id}) {
  try {
    const response = await fetch(`http://localhost:5183/Tags/${id}`, {
      method: 'DELETE',
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
