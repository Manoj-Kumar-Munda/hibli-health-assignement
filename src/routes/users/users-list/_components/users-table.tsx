import React from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

import type { User, UserStatus, UsersResponse } from '@/types/user'
import Table from '@/components/table'
import useFetchUsersList from '@/api/users/user-list'

const UsersTable: React.FC = () => {
  const navigate = useNavigate({ from: '/users/list' })
  const searchParams = useSearch({ from: '/users/list' })

  const params = {
    page: searchParams.page,
    pageSize: searchParams.pageSize,
    sortBy: searchParams.sortBy ?? 'createdAt',
    direction: searchParams.direction ?? 'DESC',
    status: searchParams.status,
  }

  const { data, isLoading, error } = useFetchUsersList<UsersResponse>(params)

  const handlePaginationChange = ({
    pageSize,
    pageIndex,
  }: {
    pageSize: number
    pageIndex: number
  }) => {
    navigate({
      search: (prev) => ({
        ...prev,
        pageSize: pageSize,
        page: pageIndex + 1,
      }),
    })
  }

  const handleStatusChange = (status: string | undefined) => {
    navigate({
      search: (prev) => ({
        ...prev,
        status: status as UserStatus | undefined,
        page: 1,
      }),
    })
  }

  const columns = React.useMemo<Array<ColumnDef<User>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => row.original.status,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
      },
      {
        accessorKey: 'address',
        header: 'Address',
        cell: ({ row }) =>
          `${row.original.address.street}, ${row.original.address.city}, ${row.original.address.zip}, ${row.original.address.country}`,
      },
      {
        accessorKey: 'account',
        header: 'Account Balance',
        cell: ({ row }) =>
          `${row.original.account.balance} ${row.original.account.currency}`,
      },
    ],
    [],
  )

  if (error) {
    return <div>Error loading users.</div>
  }
  return (
    <Table<User>
      data={data?.items || []}
      columns={columns}
      isLoading={isLoading}
      pageSize={params.pageSize}
      pageIndex={params.page - 1}
      pageCount={
        data?.pagination.total
          ? Math.ceil(data.pagination.total / params.pageSize)
          : -1
      }
      onPaginationChange={handlePaginationChange}
      manualPagination={true}
      statusFilter={{
        value: params.status,
        onChange: handleStatusChange,
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
          { value: 'pending', label: 'Pending' },
        ],
      }}
    />
  )
}

export default UsersTable
