import React from 'react'
import './Tag.css'
const Tag = (props) => {
  return (
    // <div className='tag'>
    <span
      className="tag"
      style={{backgroundColor: `${props?.color}`}}>
      {props?.tagName}
    </span>
    // </div>
  )
}

export default Tag
