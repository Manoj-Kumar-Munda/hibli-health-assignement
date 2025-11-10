import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

const UsersList: React.FunctionComponent = () => {
  return (
    <div className="tw:p-4">
      <h1 className="tw:text-2xl tw:font-bold mb-4">Users List</h1>
    </div>
  )
}

export const Route = createFileRoute('/users/list')({
  component: UsersList,
})
