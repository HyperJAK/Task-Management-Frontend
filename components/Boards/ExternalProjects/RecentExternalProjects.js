'use client'
import {useEffect, useState} from 'react'
import {getExternalProjects, getProjects} from '@/service/project'

const RecentExternalProjects = () => {
  const [recentExternalProjects, setRecentExternalProjects] =
    useState(undefined)

  useEffect(() => {
    async function fetchData() {
      const projects = getExternalProjects()
      if (projects) {
        setRecentExternalProjects(projects)
      }
    }
    fetchData()
  }, [])

  const isEmptyRecentExternalProjects = () => {
    if (!recentExternalProjects) {
      return true
    }
    if (recentExternalProjects && recentExternalProjects.length === 0) {
      return true
    }
    return false
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">My Recent External Projects</h2>
      {isEmptyRecentExternalProjects() && (
        <p className="text-gray-500">No recent External Projects found</p>
      )}
      {recentExternalProjects && recentExternalProjects.length > 0 && (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Created By</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {recentExternalProjects.map((recentExternalProject) => (
              <tr
                key={recentExternalProject.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={''}>
                <td className="border-b border-gray-200 px-4 py-2">
                  {recentExternalProject.name}
                </td>
                <td className="border-b border-gray-200 px-4 py-2">
                  {recentExternalProject.createdBy}
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

export default RecentExternalProjects
