/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Quotations} from '../../core/_models'

type Props = {
  quotations: Quotations
}

const QuotationsInfoCell: FC<Props> = ({quotations}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
      <a href='#'>
        {quotations.avatar ? (
          <div className='symbol-label'>
            <img
              src={toAbsoluteUrl(`/media/${quotations.avatar}`)}
              className='h-100 w-100'
              style={{objectFit: 'cover'}}
            />
          </div>
        ) : (
          <div className='symbol-label'>
            <img src={toAbsoluteUrl('/media/avatars/blank.png')} className='w-100' />
          </div>
        )}
      </a>
    </div>
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {quotations.first_name} {quotations.last_name}
      </a>
      <span>{quotations.email}</span>
    </div>
  </div>
)

export {QuotationsInfoCell}
