import {FloatingLabel, Form} from 'react-bootstrap'

const PasswordTextfield = ({props}) => {
  const {password, setPassword, title, showPassword, allowEdit, handleChange} =
    props

  const defaultHandleChange = (e) => {
    if (allowEdit === true && e.target.value.length < 41) {
      setPassword(e.target.value)
    } else if (
      (allowEdit === undefined || allowEdit === null) &&
      e.target.value.length < 41
    ) {
      setPassword(e.target.value)
    }
  }

  return (
    <Form.Control
      className="w-full rounded-2xl border border-secondary bg-accent px-3 py-2 text-[0.5rem] focus:outline-none focus:ring-1 focus:ring-blue-500 lg:text-[1rem]"
      type={showPassword ? 'text' : 'Password'}
      placeholder={title ? title : 'Password'}
      value={password}
      onChange={handleChange ? handleChange : defaultHandleChange}
    />
  )
}

export default PasswordTextfield
