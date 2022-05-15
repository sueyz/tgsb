import {Column} from 'react-table'
import {QuotationsInfoCell} from './QuotationsInfoCell'
import {QuotationsStatusCell} from './QuotationsLastLoginCell'
import {UserActionsCell} from './QuotationsActionsCell'
import {QuotationsSelectionCell} from './QuotationsSelectionCell'
import {QuotationsSelectionHeader} from './QuotationsSelectionHeader'
import {QuotationsCustomHeader} from './QuotationsCustomHeader'
import {Quotations} from '../../core/_models'

const usersColumns: ReadonlyArray<Column<Quotations>> = [
  {
    Header: (props) => <QuotationsSelectionHeader tableProps={props}/>,
    id: 'finalize',
    Cell: ({...props}) => <QuotationsSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <QuotationsCustomHeader tableProps={props} title='Quotation' className='min-w-150px cursor-pointer text-hover-primary' />,
    accessor: 'type',
  },
  {
    Header: (props) => <QuotationsCustomHeader tableProps={props} title='Name' className='min-w-125px cursor-pointer text-hover-primary' />,
    id: 'name',
    Cell: ({...props}) => <QuotationsInfoCell quotations={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <QuotationsCustomHeader tableProps={props} title='Venue' className='min-w-125px cursor-pointer text-hover-primary' />,
    accessor: 'address1',
  },
  {
    Header: (props) => (
      <QuotationsCustomHeader tableProps={props} title='Status' className='min-w-150px' />
    ),
    id: 'status',

    Cell: ({...props}) => (
      <QuotationsStatusCell
        percentageDone= {(props.data[props.row.index].balancePaid/props.data[props.row.index].quotations) * 100}
        balanceDue={
          props.data[props.row.index].quotations - props.data[props.row.index].balancePaid
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
