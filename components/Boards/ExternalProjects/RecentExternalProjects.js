'use client'
import {useEffect, useState} from 'react'
import {GetUserExternalProjects} from '@/service/project'
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
    localStorage.setItem('isCreator', JSON.stringify({value: false}))
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">My Recent External Projects</h2>
      {isEmptyRecentExternalProjects() && (
        <p className="text-gray-500">No recent External Projects found</p>
      )}
      {recentExternalProjects && recentExternalProjects.length > 0 && (
        <table className="flex w-full flex-col">
          <thead>
            <tr className={'flex w-full flex-row justify-evenly'}>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody className={'flex flex-col justify-evenly'}>
            {recentExternalProjects.map((recentExternalProject) => (
              <Link
                key={recentExternalProject.id}
                href={`/project/${recentExternalProject.title}`}
                className={'w-full'}>
                <tr
                  key={recentExternalProject.id}
                  className="flex cursor-pointer flex-row justify-evenly border-b border-gray-200 hover:bg-gray-100"
                  onClick={(e) =>
                    handleClickedProject(e, recentExternalProject.id)
                  }>
                  <td className="px-4 py-2">{recentExternalProject.title}</td>
                  <td className="px-4 py-2">
                    {recentExternalProject.description}
                  </td>
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
