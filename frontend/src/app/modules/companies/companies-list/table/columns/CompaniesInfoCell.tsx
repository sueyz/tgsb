/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Companies} from '../../core/_models'
import cn from "classnames";
import {CompaniesActionsCell} from './CompaniesActionsCell'

type Props = {
  company: Companies
}

const CompaniesInfoCell: FC<Props> = ({company}) => {
  console.log(company)
  return(
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}

    <div className="flip-card-outer">
      <div className={cn("flip-card-inner", {
          "hover-trigger": true
        })}>
        <div className="card front">
          <div className="card-body d-flex justify-content-center align-items-center">
            <p className="card-text fs-1 fw-bold">{company.name}</p>
          </div>
        </div>
        <div className="card back">
          <div>
          <CompaniesActionsCell id={company.id}/>
          </div>

          <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {company.name}
      </a>
      <span>{company.email}</span>
    </div>

          <div className="card-body d-flex justify-content-center align-items-center">
          <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
              <a href='#'>
                {company.avatar ? (
                  <div className='symbol-label'>
                    <img
                      src={toAbsoluteUrl(`/media/${company.avatar}`)}
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
            <p className="card-text fs-1 fw-bold">Back</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

export {CompaniesInfoCell}