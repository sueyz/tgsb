import {ID, Response} from '../../../../../_metronic/helpers'
export type Companies = {
  id?: ID
  type?: String
  name?: String
  address?: String
  avatar?: String
  email?: String
  phone?: String
  poc?: String
  accountNo?: String
  bank?: String
  // online?: boolean
  // initials?: {
  //   label: string
  //   state: string
  // }
}

export type UsersQueryResponse = Response<Array<Companies>>

export const initialCompany: Companies = {
  avatar: 'avatars/blank.png',
  address: '',
  type: 'Regular',
  name: '',
  email: '',
  phone: '',
  poc: '',
  accountNo: '',
  bank: '',
}
