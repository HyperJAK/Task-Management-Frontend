import Image from 'next/image'
import Toolbar from '@/components/Toolbar/Toolbar'
import CreateBoard from '@/components/Boards/CreateProject/CreateProject'
import RecentProjects from '@/components/Boards/RecentProjects/RecentProjects'
import RecentExternalProjects from '@/components/Boards/ExternalProjects/RecentExternalProjects'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-[150px] p-10">
      <Toolbar />
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
    </main>
  )
}
