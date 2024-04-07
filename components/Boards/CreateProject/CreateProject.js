'use client'
import React, {useState} from 'react'

const CreateTaskBoard = () => {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [yourName, setYourName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Create task board logic here
  }

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm">
        {/*Title*/}
        <p className={'pb-5 text-center'}>Create Project</p>

        {/*Name of project*/}
        <div className="mb-6 flex flex-col md:items-center">
          <div className="w-full">
            <label className="mb-1 block pr-4 text-left font-bold text-gray-500 md:mb-0">
              Project Name
            </label>
          </div>
          <div className="w-full">
            <input
              className="w-full appearance-none rounded border-2 border-black px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
        </div>
        {/*Description of project*/}
        <div className="mb-6 flex flex-col md:items-center">
          <div className="w-full">
            <label className="mb-1 block pr-4 text-left font-bold text-gray-500 md:mb-0">
              Project Description
            </label>
          </div>
          <div className="w-full">
            <input
              className="w-full appearance-none rounded border-2 border-black px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              required
            />
          </div>
        </div>
        {/*Name of user who create project*/}
        <div className="mb-6 flex flex-col justify-start md:items-center">
          <div className="w-full">
            <label className="mb-1 block pr-4 text-left font-bold text-gray-500 md:mb-0">
              Your Name
            </label>
          </div>
          <div className="w-full">
            <input
              className="w-full appearance-none rounded border-2 border-black px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
              type="text"
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              required
            />
          </div>
        </div>
        {/*Create project button*/}
        <div className="flex w-full items-center">
          <div className="w-full">
            <button
              className="focus:shadow-outline-purple w-full rounded-full bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
              type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateTaskBoard
