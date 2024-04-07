import React from 'react'

import {Button} from '@mui/material'
export const title = 'Task Board'

const Toolbar = () => {
  return (
    <div className={'flex w-full flex-row justify-between'}>
      {/*The title*/}
      <div>
        <p>Task Management</p>
      </div>
      {/*The 2 buttons for navigation*/}
      <div className={'flex flex-row justify-center gap-5'}>
        <Button
          size={'medium'}
          color="primary"
          onClick={''}>
          {'New Board'}
        </Button>
        <Button
          size={'medium'}
          color="primary"
          onClick={''}>
          {'Open Board'}
        </Button>
      </div>
    </div>
  )
}

export default Toolbar
