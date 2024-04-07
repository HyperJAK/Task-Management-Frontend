'use client'
import {useEffect, useState} from 'react'
import {getProjects} from '@/service/projects'

const RecentProjects = () => {
  const [recentProjects, setRecentProjects] = useState(undefined)

  useEffect(() => {
    async function fetchData() {
      const projects = getProjects()
      if (projects) {
        setRecentProjects(projects)
      }
    }
    fetchData()
  }, [])

  const isEmptyRecentProjects = () => {
    if (!recentProjects) {
      return true
    }
    if (recentProjects && recentProjects.length === 0) {
      return true
    }
    return false
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">My Recent Projects</h2>
      {isEmptyRecentProjects() && (
        <p className="text-gray-500">No recent Projects found</p>
      )}
      {recentProjects && recentProjects.length > 0 && (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Created By</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {recentProjects.map((recentProject) => (
              <tr
                key={recentProject.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={''}>
                <td className="border-b border-gray-200 px-4 py-2">
                  {recentProject.name}
                </td>
                <td className="border-b border-gray-200 px-4 py-2">
                  {recentProject.description}
                </td>
                <td className="border-b border-gray-200 px-4 py-2">
                  {recentProject.createdBy}
                </td>
                <td className="border-b border-gray-200 px-4 py-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RecentProjects
