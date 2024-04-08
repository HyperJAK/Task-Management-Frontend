import {FloatingLabel, Form} from 'react-bootstrap'

const EmailTextfield = ({props}) => {
  const {email, setEmail, title, allowEdit, handleChange} = props

  const defaultHandleChange = (e) => {
    console.log(allowEdit)
    if (allowEdit === true && e.target.value.length < 100) {
      setEmail(e.target.value)
    } else if (
      (allowEdit === undefined || allowEdit === null) &&
      e.target.value.length < 100
    ) {
      setEmail(e.target.value)
    }
  }

  return (
    <Form.Control
      className="w-full rounded-2xl border border-secondary bg-accent px-3 py-2 text-[1rem] focus:outline-none focus:ring-1 focus:ring-blue-500"
      type={title ? title : 'Email'}
      placeholder={title ? title : 'Email'}
      value={email}
      onChange={handleChange ? handleChange : defaultHandleChange}
    />
  )
}

export default EmailTextfield
