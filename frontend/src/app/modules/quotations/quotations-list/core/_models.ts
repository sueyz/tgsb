import {ID, Response} from '../../../../../_metronic/helpers'
export type Quotations = {
  id?: ID
  first_name?: String
  last_name?: String
  avatar?: String
  email?: String
  position?: String
  role?: String
  last_login?: String
  // online?: boolean
  // initials?: {
  //   label: string
  //   state: string
  // }
}

export type UsersQueryResponse = Response<Array<Quotations>>

export const initialQuotations: Quotations = {
  avatar: 'avatars/blank.png',
  position: '',
  role: 'Support',
  first_name: '',
  last_name: '',
  email: '',
}
