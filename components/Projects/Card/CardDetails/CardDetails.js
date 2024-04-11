import React, {useState, useEffect} from 'react'
import {
  Calendar,
  Check,
  CheckSquare,
  Clock,
  CreditCard,
  List,
  Plus,
  Tag,
  Trash,
  Type,
  X,
} from 'react-feather'
import Editable from '../../Editable/Editable'
import Modal from '../../Modal/Modal'
import './CardDetails.css'
import {v4 as uuidv4} from 'uuid'
import Label from '../../Label/Label'
import {
  AddSubTaskToTask,
  AddTagToTask,
  RemoveAllTaskSubTasks,
} from '@/service/task'
import {RemoveTag} from '@/service/tag'
import {UpdateSubTask} from '@/service/subTask'

const CardDetails = (props) => {
  const colors = ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0']

  const [task, setTask] = useState({...props.card})
  const [input, setInput] = useState(false)
  const [text, setText] = useState(task.name)
  const [labelShow, setLabelShow] = useState(false)
  const Input = (props) => {
    return (
      <div className="">
        <input
          autoFocus
          defaultValue={text}
          type={'text'}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
      </div>
    )
  }
  const addSubTask = async ({name}) => {
    //fetch logic here to add a subtask
    const response = await AddSubTaskToTask({id: task.id, name: name})

    if (response) {
      task.subtasks.push({
        id: response.id,
        name: response.name,
        completed: response.completed,
      })
      setTask({...task})
    } else {
      console.log('Failed to add subtask')
    }
  }

  const removeSubTask = ({id}) => {
    //Same fetch logic here to remove subtask
    const remaningSubTasks = task.subtasks.filter((item) => item.id !== id)
    setTask({...task, subtasks: remaningSubTasks})
  }

  const deleteAllSubTasks = async ({id}) => {
    //Same fetch logic here to remove all subtasks
    const response = await RemoveAllTaskSubTasks({id: id})

    if (response) {
      setTask({
        ...task,
        subtasks: [],
      })
    } else {
      console.log('Failed to remove all subtasks')
    }
  }

  const updateSubTask = async ({id}) => {
    const taskIndex = task.subtasks.findIndex((item) => item.id === id)
    const subTask = task.subtasks[taskIndex]
    task.subtasks[taskIndex].completed = !task.subtasks[taskIndex].completed
    //Same fetch logic here to put a subtask to completed

    const response = await UpdateSubTask({
      id: task.id,
      name: subTask.name,
      completed: subTask.completed,
    })

    if (response) {
      setTask({...task})
    } else {
      console.log('Failed to add tag')
    }
  }
  const updateName = (value) => {
    setTask({...task, name: value})
  }

  const calculatePercent = () => {
    const totalTask = task.subtasks.length
    const completedTask = task.subtasks.filter(
      (item) => item.completed === true
    ).length

    return Math.floor((completedTask * 100) / totalTask) || 0
  }

  const removeTag = async ({id}) => {
    const response = await RemoveTag({id: id})

    if (response) {
      const tempTag = task.tags.filter((item) => item.id !== id)
      setTask({
        ...task,
        tags: tempTag,
      })
    } else {
      console.log('Failed to delete tag')
    }
  }

  const addTag = async ({name, color}) => {
    const response = await AddTagToTask({id: task.id, name: name, color: color})

    if (response) {
      task.tags.push({
        id: response.id,
        name: response.name,
        color: response.color,
      })

      setTask({...task})
    } else {
      console.log('Failed to add tag')
    }
  }

  const handelClickListner = (e) => {
    if (e.code === 'Enter') {
      setInput(false)
      updateName(text === '' ? task.name : text)
    } else return
  }

  useEffect(() => {
    document.addEventListener('keypress', handelClickListner)
    return () => {
      document.removeEventListener('keypress', handelClickListner)
    }
  })
  useEffect(() => {
    if (props.updateCard) props.updateCard(props.bid, task.id, task)
  }, [task])

  return (
    <Modal onClose={props.onClose}>
      <div className="local__bootstrap">
        <div
          className="container"
          style={{minWidth: '650px', position: 'relative'}}>
          <div className="row pb-4">
            <div className="col-12">
              <div className="d-flex align-items-center gap-2 pt-3">
                <CreditCard className="icon__md" />
                {input ? (
                  <Input title={task.name} />
                ) : (
                  <h5
                    style={{cursor: 'pointer'}}
                    onClick={() => setInput(true)}>
                    {task.name}
                  </h5>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <h6 className="text-justify">Label</h6>
              <div
                className="d-flex label__color flex-wrap"
                style={{width: '500px', paddingRight: '10px'}}>
                {task.tags.length !== 0 ? (
                  task.tags.map((item) => (
                    <span
                      key={item.id}
                      className="d-flex justify-content-between align-items-center gap-2"
                      style={{backgroundColor: item.color}}>
                      {item.name.length > 10
                        ? item.name.slice(0, 6) + '...'
                        : item.name}
                      <X
                        onClick={() => removeTag({id: item.id})}
                        style={{width: '15px', height: '15px'}}
                      />
                    </span>
                  ))
                ) : (
                  <span
                    style={{color: '#ccc'}}
                    className="d-flex justify-content-between align-items-center gap-2">
                    <i> No Labels</i>
                  </span>
                )}
              </div>
              <div className="check__list mt-2">
                <div className="d-flex align-items-end  justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <CheckSquare className="icon__md" />
                    <h6>Check List</h6>
                  </div>
                  <div className="card__action__btn">
                    <button onClick={() => deleteAllSubTasks({id: task.id})}>
                      Delete all tasks
                    </button>
                  </div>
                </div>
                <div className="progress__bar mb-2 mt-2">
                  <div className="progress flex-1">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{width: calculatePercent() + '%'}}
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100">
                      {calculatePercent() + '%'}
                    </div>
                  </div>
                </div>

                <div className="my-2">
                  {task.subtasks.length !== 0 ? (
                    task.subtasks.map((item, index) => (
                      <div
                        key={item.id}
                        className="task__list d-flex align-items-start gap-2">
                        <input
                          className="task__checkbox"
                          type="checkbox"
                          defaultChecked={item.completed}
                          onChange={() => {
                            updateSubTask({id: item.id})
                          }}
                        />

                        <h6
                          className={`flex-grow-1 ${
                            item.completed === true ? 'strike-through' : ''
                          }`}>
                          {item.name}
                        </h6>
                        <Trash
                          onClick={() => {
                            removeSubTask(item.id)
                          }}
                          style={{
                            cursor: 'pointer',
                            widht: '18px',
                            height: '18px',
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}

                  <Editable
                    parentClass={'task__editable'}
                    name={'Add Task'}
                    btnName={'Add task'}
                    onSubmit={addSubTask}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <h6>Add to card</h6>
              <div className="d-flex card__action__btn flex-column gap-2">
                <button onClick={() => setLabelShow(true)}>
                  <span className="icon__sm">
                    <Tag />
                  </span>
                  Add Label
                </button>
                {labelShow && (
                  <Label
                    color={colors}
                    addTag={addTag}
                    tags={task.tags}
                    onClose={setLabelShow}
                  />
                )}
                <button>
                  <span className="icon__sm">
                    <Clock />
                  </span>
                  Date
                </button>

                <button onClick={() => props.removeCard(props.bid, task.id)}>
                  <span className="icon__sm">
                    <Trash />
                  </span>
                  Delete Card
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default CardDetails
