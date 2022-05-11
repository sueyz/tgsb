import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../_metronic/helpers'
import {Quotations, QuotationsQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const QUOTATIONS_URL = `${API_URL}/quotations`
const GET_QUOTATIONS_URL = `${API_URL}/quotations/query`

const getQuotations = (query: string): Promise<QuotationsQueryResponse> => {
  return axios
    .get(`${GET_QUOTATIONS_URL}?${query}`)
    .then((d: AxiosResponse<QuotationsQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<Quotations | undefined> => {
  return axios
    .get(`${QUOTATIONS_URL}/${id}`)
    .then((response: AxiosResponse<Response<Quotations>>) => response.data)
    .then((response: Response<Quotations>) => response.data)
}

const createUser = (user: Quotations): Promise<Quotations | undefined> => {
  return axios
    .post(QUOTATIONS_URL, user)
    .then((response: AxiosResponse<Response<Quotations>>) => response.data)
    .then((response: Response<Quotations>) => response.data)
}

const updateUser = (user: Quotations): Promise<Quotations | undefined> => {
  return axios
    .put(`${QUOTATIONS_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<Quotations>>) => response.data)
    .then((response: Response<Quotations>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${QUOTATIONS_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${QUOTATIONS_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getQuotations, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser}
