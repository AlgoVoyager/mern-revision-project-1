import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-1/6 border-r-2 p-4'>
        <h3 className='text-center'>Workspace</h3>
        <ul className='space-y-3 mt-10'>
            <li className="workspace-item px-2 py-1">Overview</li>
            <li className="workspace-item px-2 py-1">My tasks</li>
            <li className="workspace-item px-2 py-1">Projects</li>
        </ul>
    </div>
  )
}

export default Sidebar