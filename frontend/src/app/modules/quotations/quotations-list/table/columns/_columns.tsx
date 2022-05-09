import {Column} from 'react-table'
import {QuotationsInfoCell} from './QuotaionsInfoCell'
import {UserLastLoginCell} from './QuotaionsLastLoginCell'
import {UserActionsCell} from './QuotationsActionsCell'
import {QuotationsSelectionCell} from './QuotationsSelectionCell'
import {QuotationsCustomHeader} from './QuotationsCustomHeader'
import {UserSelectionHeader} from './QuotationsSelectionHeader'
import {Quotations} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<Quotations>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <QuotationsSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <QuotationsCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'first_name',
    Cell: ({...props}) => <QuotationsInfoCell quotations={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <QuotationsCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
    accessor: 'role',
  },
  {
    Header: (props) => (
      <QuotationsCustomHeader tableProps={props} title='Last login' className='min-w-125px' />
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
      <QuotationsCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
