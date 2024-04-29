import React, {useEffect, useState} from 'react'
import Card from '../Card/Card'
import './Board.css'
import {MoreHorizontal} from 'react-feather'
import Editable from '../Editable/Editable'
import Dropdown from '../Dropdown/Dropdown'
import {Droppable} from 'react-beautiful-dnd'
const Board = (props) => {
  const [show, setShow] = useState(false)
  const [dropdown, setDropdown] = useState(false)

  useEffect(() => {
    document.addEventListener('keypress', (e) => {
      if (e.code === 'Enter') setShow(false)
    })
    return () => {
      document.removeEventListener('keypress', (e) => {
        if (e.code === 'Enter') setShow(false)
      })
    }
  })

  return (
    <div className="board">
      <div className="board__top">
        {show ? (
          <div>
            <input
              className="title__input"
              type={'text'}
              defaultValue={props.name}
              onChange={(e) => {
                props.setName(e.target.value, props.id)
              }}
            />
          </div>
        ) : (
          <div>
            <p
              onClick={() => {
                setShow(true)
              }}
              className="board__title">
              {props?.name || 'Name of Board'}
              <span className="total__cards">{props.card?.length}</span>
            </p>
          </div>
        )}
        {/*More options to delete board*/}
        {/*<div
          onClick={() => {
            setDropdown(true)
          }}>
          <MoreHorizontal />
          {dropdown && (
            <Dropdown
              class="board__dropdown"
              onClose={() => {
                setDropdown(false)
              }}>
              <p onClick={() => props.removeBoard(props.id)}>Delete Board</p>
            </Dropdown>
          )}
        </div>*/}
      </div>
      <Droppable droppableId={props.id.toString()}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {props.card?.map((items, index) => (
              <Card
                bid={props.id}
                id={items.id}
                index={index}
                key={items.id}
                title={items.name}
                tags={items.tags}
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                card={items}
                isCreator={props.isCreator}
                selectedRole={props.selectedRole}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/*Add card logic*/}
      {(props.isCreator || props.selectedRole === 'admin') && (
        <div className="board__footer">
          <Editable
            name={'Add Task'}
            btnName={'Add Card'}
            placeholder={'Enter Task Title'}
            onSubmit={(value) => props.addCard({title: value, bid: props.id})}
          />
        </div>
      )}
    </div>
  )
}

export default Board
