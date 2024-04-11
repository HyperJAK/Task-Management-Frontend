export async function SignUpFunc({email, password, username}) {
  try {
    const user = {
      email: email,
      username: username,
      password: password,
      registrationDate: new Date(),
    }

    const response = await fetch('http://localhost:5183/Users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    console.log('Email in signup func is: ' + email)
    console.log('Username in signup func is: ' + username)
    console.log('Password in signup func is: ' + password)

    const data = await response.json()

    console.log('RESPONSESSSS')
    console.log(data.id)

    console.log(data.message)

    if (data) {
      const userForStorage = {
        userId: data.id,
      }

      localStorage.setItem('user', JSON.stringify(userForStorage))
      console.log('Saved in local storage after signup')
    }

    return data
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}

export async function SignInFunc({email, password}) {
  try {
    const response = await fetch(
      `http://localhost:5183/Users/${email}/${password}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    //console.log("RESPONSESSSS")
    //console.log(response.data.data)

    console.log(data.message)

    if (data) {
      const userForStorage = {
        userId: data.id,
      }

      localStorage.setItem('user', JSON.stringify(userForStorage))
      console.log('Saved in local storage after signin')
    }

    return data
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}
