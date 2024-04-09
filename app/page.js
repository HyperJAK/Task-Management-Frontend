'use client'
import Image from 'next/image'
import Toolbar from '@/components/Toolbar/Toolbar'
import CreateBoard from '@/components/Boards/CreateProject/CreateProject'
import RecentProjects from '@/components/Boards/RecentProjects/RecentProjects'
import RecentExternalProjects from '@/components/Boards/ExternalProjects/RecentExternalProjects'
import {useEffect, useState} from 'react'
import SignIn from '@/components/Validation/SignIn'
import SignUp from '@/components/Validation/SignUp'
import Button from '@/components/Validation/Button'
import CreateProject from '@/components/Boards/CreateProject/CreateProject'

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [refreshProjects, setRefreshProjects] = useState(false)

  useEffect(() => {
    function fetchData() {
      const storedUser = localStorage.getItem('user')
      try {
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          if (parsedUser.userId !== '' || parsedUser.userId !== null) {
            setAuthed(true)
          } else {
            setAuthed(false)
          }

          //We also call the methods to get data from API for his recent projects and recent external projects
        }
      } catch (e) {}
    }
    fetchData()
  }, [setAuthed])

  const handleLogout = (e) => {
    setAuthed(false)
    localStorage.removeItem('user')
  }

  return (
    <main className="flex min-h-screen flex-col items-center gap-[150px] p-10">
      <div className={'flex w-full flex-col gap-40'}>
        {authed && (
          <>
            <div className={'flex w-full flex-row justify-end p-10'}>
              <Button
                style={
                  'bg-accent/50 p-10 pr-20 hover:bg-secondary hover:cursor-pointer flex-row flex gap-2 rounded-2xl'
                }
                itemComponents={
                  <>
                    <p>Log out</p>{' '}
                    <Image
                      src={'/icons/person.png'}
                      alt={'person image'}
                      width={20}
                      height={20}
                    />
                  </>
                }
                handle={handleLogout}
              />
            </div>

            <div
              className={
                'flex flex-col justify-center gap-10 lg:flex-row lg:gap-[500px]'
              }>
              <div className={'flex flex-col justify-center gap-10'}>
                <RecentProjects
                  refreshProjects={refreshProjects}
                  setRefreshProjects={setRefreshProjects}
                />
                <RecentExternalProjects />
              </div>

              <CreateProject setRefreshProjects={setRefreshProjects} />
            </div>
          </>
        )}

        {!authed && showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
        {!authed && !showSignIn && <SignUp setShowSignIn={setShowSignIn} />}
      </div>
    </main>
  )
}
