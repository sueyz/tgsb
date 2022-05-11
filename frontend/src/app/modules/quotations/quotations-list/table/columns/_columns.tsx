import {Column} from 'react-table'
import {QuotationsInfoCell} from './QuotationsInfoCell'
import {UserLastLoginCell} from './QuotationsLastLoginCell'
import {UserActionsCell} from './QuotationsActionsCell'
import {QuotationsSelectionCell} from './QuotationsSelectionCell'
import {QuotationsSelectionHeader} from './QuotationsSelectionHeader'
import {QuotationsCustomHeader} from './QuotationsCustomHeader'
import {Quotations} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<Quotations>> = [
  {
    Header: (props) => <QuotationsSelectionHeader tableProps={props} />,
    id: 'finalize',
    Cell: ({...props}) => <QuotationsSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <QuotationsCustomHeader tableProps={props} title='Quotation category' className='min-w-125px' />,
    accessor: 'type',
  },
  {
    Header: (props) => <QuotationsCustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <QuotationsInfoCell quotations={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <QuotationsCustomHeader tableProps={props} title='Venue' className='min-w-125px' />,
    accessor: 'address',
  },
  {
    Header: (props) => (
      <QuotationsCustomHeader tableProps={props} title='Status' className='min-w-125px' />
    ),
    id: 'status',

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
