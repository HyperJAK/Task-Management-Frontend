'use client'
import {useEffect, useState} from 'react'
import {
  getExternalProjects,
  getProjects,
  GetUserExternalProjects,
  GetUserRecentProjects,
} from '@/service/project'
import Link from 'next/link'

const RecentExternalProjects = ({refreshProjects, setRefreshProjects}) => {
  const [recentExternalProjects, setRecentExternalProjects] =
    useState(undefined)

  useEffect(() => {
    async function fetchData() {
      const localUserId = localStorage.getItem('user')
      if (localUserId) {
        const parsedUser = await JSON.parse(localUserId)

        if (parsedUser.userId !== null) {
          const userId = parsedUser.userId
          const response = await GetUserExternalProjects({userId: userId})

          setRecentExternalProjects(response)
        }
      }
    }
    fetchData()
  }, [refreshProjects, setRefreshProjects])

  const isEmptyRecentExternalProjects = () => {
    if (!recentExternalProjects) {
      return true
    }
    if (recentExternalProjects && recentExternalProjects.length === 0) {
      return true
    }
    return false
  }

  const handleClickedProject = (e, projectId) => {
    const key = e.target.key
    localStorage.setItem('clickedProjectId', JSON.stringify({key: projectId}))
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
              <Link
                key={recentExternalProject.id}
                href={`/project/externalProjects/${recentExternalProject.title}`}>
                <tr
                  key={recentExternalProject.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={(e) =>
                    handleClickedProject(e, recentExternalProject.id)
                  }>
                  <td className="border-b border-gray-200 px-4 py-2">
                    {recentExternalProject.title}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2">
                    {recentExternalProject.description}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2"></td>
                </tr>
              </Link>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RecentExternalProjects
