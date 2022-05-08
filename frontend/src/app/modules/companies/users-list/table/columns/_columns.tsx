import {Column} from 'react-table'
import {UserInfoCell} from './CompaniesInfoCell'
import {UserLastLoginCell} from './CompaniesLastLoginCell'
import {UserTwoStepsCell} from './CompaniesTwoStepsCell'
import {UserActionsCell} from './CompaniesActionsCell'
import {UserSelectionCell} from './CompaniesSelectionCell'
import {UserCustomHeader} from './CompaniesCustomHeader'
import {UserSelectionHeader} from './CompaniesSelectionHeader'
import {Companies} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<Companies>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'first_name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
    accessor: 'role',
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Last login' className='min-w-125px' />
    ),
    id: 'last_login',

    Cell: ({...props}) => (
      <UserLastLoginCell
        last_login={
          props.data[props.row.index].last_login
            ? new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).format(new Date(props.data[props.row.index].last_login))
            : 'New user'
        }
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
