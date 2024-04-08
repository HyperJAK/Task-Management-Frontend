'use client'
import Image from 'next/image'
import Toolbar from '@/components/Toolbar/Toolbar'
import CreateBoard from '@/components/Boards/CreateProject/CreateProject'
import RecentProjects from '@/components/Boards/RecentProjects/RecentProjects'
import RecentExternalProjects from '@/components/Boards/ExternalProjects/RecentExternalProjects'
import {useEffect, useState} from 'react'
import SignIn from '@/components/Validation/SignIn'
import SignUp from '@/components/Validation/SignUp'

export default function Home() {
  const [showSignIn, setShowSignIn] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    function fetchData() {
      const storedUser = localStorage.getItem('user')
      try {
        if (storedUser.userId !== null) {
          setAuthed(true)

          //We also call the methods to get data from API for his recent projects and recent external projects
        } else {
          setAuthed(false)
        }
      } catch (e) {}
    }
    fetchData()
  })

  return (
    <main className="flex min-h-screen flex-col items-center gap-[150px] p-10">
      {authed && (
        <div
          className={
            'flex flex-col justify-center gap-10 lg:flex-row lg:gap-[500px]'
          }>
          <div className={'flex flex-col justify-center gap-10'}>
            <RecentProjects />
            <RecentExternalProjects />
          </div>

          <CreateBoard />
        </div>
      )}

      {!authed && showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
      {!authed && !showSignIn && <SignUp setShowSignIn={setShowSignIn} />}
    </main>
  )
}
