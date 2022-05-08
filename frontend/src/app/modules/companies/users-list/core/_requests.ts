import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Companies, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
const USER_IMAGE_UPLOAD_URL = `${API_URL}/user/upload`
const GET_USERS_URL = `${API_URL}/user/query`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<Companies | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<Companies>>) => response.data)
    .then((response: Response<Companies>) => response.data)
}

const createUser = (user: Companies): Promise<Companies | undefined> => {
  return axios
    .post(USER_URL, user)
    .then((response: AxiosResponse<Response<Companies>>) => response.data)
    .then((response: Response<Companies>) => response.data)
}

const uploadImage = (file: FormData) => {
  return axios
    .post(USER_IMAGE_UPLOAD_URL, file, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data.filename
    })
}

const updateUser = (user: Companies): Promise<Companies | undefined> => {
  return axios
    .put(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<Companies>>) => response.data)
    .then((response: Response<Companies>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const deleteSelectedCompanies = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedCompanies, getUserById, createUser, updateUser, uploadImage}
