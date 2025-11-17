import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

import type { TSortBy, UserStatus, UsersListParams } from '@/types/user'
import PageHeaderCard from '@/components/page-header-card'
import UsersTable from '@/routes/users/users-list/_components/users-table'

const UsersList: React.FunctionComponent = () => {
  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <PageHeaderCard pageHeading="Users List" />
      <UsersTable />
    </div>
  )
}

export const Route = createFileRoute('/users/list')({
  component: UsersList,
  validateSearch: (search: Record<string, unknown>): UsersListParams => {
    const direction = search.direction as string
    const status = search.status as string
    const validStatuses: Array<UserStatus> = ['active', 'inactive', 'pending']
    return {
      page: Number(search.page) || 1,
      pageSize: Number(search.pageSize) || 10,
      sortBy: search.sortBy as TSortBy,
      direction:
        direction === 'ASC' || direction === 'DESC' ? direction : 'DESC',
      status: validStatuses.includes(status as UserStatus)
        ? (status as UserStatus)
        : undefined,
    }
  },
})
