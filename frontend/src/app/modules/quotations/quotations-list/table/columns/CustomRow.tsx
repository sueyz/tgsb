import clsx from 'clsx'
import { FC, useState } from 'react'
import { Row } from 'react-table'
import { Quotations } from '../../core/_models'
import { useNavigate } from 'react-router'
import axios, { AxiosResponse } from 'axios'
import { ID, Response } from '../../../../../../_metronic/helpers'
import { Companies } from '../../../../companies/companies-list/core/_models'
import { UsersListLoading } from '../../components/loading/QuotationsListLoading'

const API_URL = process.env.REACT_APP_THEME_API_URL
const COMPANY_URL = `${API_URL}/company`

type Props = {
  row: Row<any>
}

const CustomRow: FC<Props> = ({ row }) => {
  const history = useNavigate()
  const [loading, setLoading] = useState(false);

  const getCompaniesById = (id: ID): Promise<Companies | undefined> => {
    return axios
      .get(`${COMPANY_URL}/${id}`)
      .then((response: AxiosResponse<Response<Companies>>) => response.data)
      .then((response: Response<Companies>) => {
        setLoading(false);
        return response.data
      })
  }

  return (
    <>
      {loading && <UsersListLoading />}

      <tr {...row.getRowProps()} onClick={async () => {
        setLoading(true)

        getCompaniesById(row.original.company).then((response: any) =>
          history('/quotations/overview', { state: { original: row.original, company_info: response } })
        )
      }}>

        {row.cells.map((cell) => {

          return (
            <td
              {...cell.getCellProps()}
              className={clsx({ 'text-end min-w-100px': cell.column.id === 'actions' })}
              style={{ paddingLeft: 10, cursor: 'pointer' }}
            >
              {cell.render('Cell')}
            </td>
          )
        })}
      </tr>
    </>
  )
}

export { CustomRow }
