'use client'
import {useEffect, useState} from 'react'
import {getProjects} from '@/service/projects'
import {GetUserRecentProjects} from '@/components/Config/Utilities'
import Link from 'next/link'

const RecentProjects = () => {
  const [recentProjects, setRecentProjects] = useState(undefined)

  useEffect(() => {
    async function fetchData() {
      const localUserId = localStorage.getItem('user')
      if (localUserId) {
        const parsedUser = await JSON.parse(localUserId)

        if (parsedUser.userId !== null) {
          const userId = parsedUser.userId
          const response = await GetUserRecentProjects({id: userId})

          setRecentProjects(response)
        }
      }
    }
    fetchData()
  }, [])

  const handleClickedProject = (e, projectId) => {
    const key = e.target.key
    localStorage.setItem('clickedProjectId', JSON.stringify({key: projectId}))
  }

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
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {recentProjects.map((recentProject) => (
              <Link
                key={recentProject.id}
                href={'/project'}>
                <tr
                  key={recentProject.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={(e) => handleClickedProject(e, recentProject.id)}>
                  <td className="border-b border-gray-200 px-4 py-2">
                    {recentProject.title}
                  </td>
                  <td className="border-b border-gray-200 px-4 py-2">
                    {recentProject.description}
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

export default RecentProjects
