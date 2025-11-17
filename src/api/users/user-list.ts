import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { UsersListParams } from '@/types/user'

const useFetchUsersList = <T>(params: UsersListParams) => {
  let queryParams = `page=${params.page}&pageSize=${params.pageSize}&sortBy=${params.sortBy}&direction=${params.direction}`

  if (params.status) {
    queryParams += `&status=${params.status}`
  }

  return useQuery({
    queryKey: ['usersList', params],
    queryFn: async (): Promise<T> => {
      const response = await fetch(
        `http://localhost:50000/users?${queryParams}`,
      )
      return response.json() as Promise<T>
    },
    placeholderData: keepPreviousData,
  })
}

export default useFetchUsersList
