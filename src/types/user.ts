export type TDirection = 'ASC' | 'DESC'
export type TSortBy = 'createdAt' | 'updatedAt'

export interface UsersListParams {
  page: number
  pageSize: number
  sortBy?: TSortBy
  direction?: TDirection
  status?: UserStatus
}

export type UserStatus = 'active' | 'inactive' | 'pending'

export interface Address {
  street: string
  city: string
  zip: string
  country: string
}

export interface Account {
  balance: number
  currency: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  status: UserStatus
  createdAt: string
  updatedAt: string
  address: Address
  account: Account
}

export interface UsersResponse {
  items: Array<User>
  pagination: {
    total: number
    page: number
    pageSize: number
  }
}
