import {ID, Response} from '../../../../../../_metronic/helpers'
export type User = {
  id?: ID
  first_name?: string
  last_name?: string
  avatar?: string
  email?: string
  position?: string
  role?: string
  last_login?: string
  // online?: boolean
  // initials?: {
  //   label: string
  //   state: string
  // }
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  avatar: 'avatars/blank.png',
  position: '',
  role: 'Support',
  first_name: '',
  last_name: '',
  email: '',
}
