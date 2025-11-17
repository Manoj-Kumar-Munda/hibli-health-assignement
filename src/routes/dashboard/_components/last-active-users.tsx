import type { UsersListParams, UsersResponse } from '@/types/user'
import useFetchUsersList from '@/api/users/user-list'
import { cn } from '@/integrations/cn/cn'
import { formatDate } from '@/utils/date-format'

const LastActiveUsersTable = () => {
  const params: UsersListParams = {
    page: 1,
    pageSize: 5,
    sortBy: 'updatedAt',
    direction: 'DESC',
    status: 'active',
  }
  const { data, isLoading, error } = useFetchUsersList<UsersResponse>(params)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading users.</div>
  }
  return (
    <div className="tw:py-3">
      {data &&
        data.items.length > 0 &&
        data.items.map((user, index) => (
          <div key={user.id} className="tw:px-6  tw:gap-4 tw:flex ">
            <div className="tw:self-start tw:pt-4">
              <div className=" tw:size-8 tw:bg-orange-400 tw:rounded-full tw:flex tw:items-center tw:justify-center tw:text-white tw:text-sm tw:self-start">
                {user.firstName.charAt(0).toUpperCase()}
                {user.lastName.charAt(0).toUpperCase()}
              </div>
            </div>

            <div
              className={cn(
                'tw:py-4 tw:grow tw:flex tw:flex-col tw:gap-1 tw:border-neutral-200 tw:self-start',
                index !== data.items.length - 1 && 'tw:border-b',
              )}
            >
              <p className="tw:font-medium tw:leading-6">
                {user.firstName} {user.lastName}
              </p>
              <p className="tw:text-neutral-400 tw:text-sm">{user.email}</p>
            </div>

            <p className="tw:py-4 tw:text-neutral-400">
              {formatDate(user.updatedAt)}
            </p>
          </div>
        ))}
    </div>
  )
}

export default LastActiveUsersTable
