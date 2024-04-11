import {AES, enc} from 'crypto-js'

export function ValidAlphaInput(input) {
  const inputRegex = /^[a-zA-Z]+$/
  const isValid = inputRegex.test(input)

  return isValid
}

export async function EncryptPassword({password}) {
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY

  const plaintext = password
  const secretKey = encryptionKey

  console.log('Pass to encrypt: ' + password)

  // Encrypt id
  try {
    const encPass = await AES.encrypt(plaintext, secretKey).toString()
    console.log('Passed encryption with pass: ' + encPass)
    return encPass
  } catch (error) {
    console.log(error)
  }
}

export async function HashPassword({password}) {
  const Hashes = require('jshashes')
  try {
    // Hash password using SHA-256
    const SHA256 = new Hashes.SHA256().hex(password)
    return SHA256
  } catch (error) {
    console.error('Error hashing password with jshashes:', error)
    throw error
  }
}

export async function DecryptPassword(pass) {
  const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY

  const plaintext = pass
  const secretKey = encryptionKey

  // Decrypt
  const bytes = await AES.decrypt(plaintext, secretKey)
  const decryptedText = bytes.toString(enc.Utf8)

  return decryptedText
}

export function ValidPassword(pass) {
  var passRegex = new RegExp('^((?=.*?[A-Za-z])(?=.*?[0-9]).{6,})*?$')
  const isValid = passRegex.test(pass)

  if (pass.length === 0) {
    return false
  }

  return isValid

  /*
    * ^: Asserts the start of the string.
    (?=.*[A-Z]): Positive lookahead to ensure there is at least one uppercase letter.
    (?=.*\d): Positive lookahead to ensure there is at least one digit (number).
    (?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]): Positive lookahead to ensure there is at least one special character. Note: Modify the special characters within the square brackets if needed, and be cautious about characters that might be dangerous for SQL injection.
    .{8,}: Ensures that the total length of the password is at least 8 characters.
    $: Asserts the end of the string.
    * */
}

export function ValidEmail(email) {
  var emailRegex = new RegExp(
    '^([a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z])*?$'
  )
  if (email.length === 0) {
    return false
  }

  return emailRegex.test(email)
}

export function ValidUsername(username) {
  if (username === '') {
    return false
  }
  if (username.length < 3 || username.length > 20) {
    return false
  }

  return true
}

export async function UpdateProfile({data}) {
  try {
    console.log('The username is: ' + data.username)
    console.log('The address is: ' + data.address)
    const response = await fetch('http://localhost:3000/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const resData = await response.json()

    console.log('RESPONSESSSS')
    //console.log(response.data.data)

    console.log(resData.message)
  } catch (error) {
    //alert(error.response.data.error);
    console.log(error)
  }
}
