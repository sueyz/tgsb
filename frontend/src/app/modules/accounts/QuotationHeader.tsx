/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { Dropdown1 } from '../../../_metronic/partials'
import { useLocation } from 'react-router'
import { ProgressBar, Step } from 'react-step-progress-bar'
import { RootState } from '../../../setup'
import { shallowEqual, useSelector } from 'react-redux'

const QuotationHeader: React.FC = () => {
  const location: any = useLocation()
  const isAdmin = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual)


  var stepPositions: Array<number> = []
  var total = 0


  Array.from(location.state.original.payment_term).forEach((element: any, index: number) => {
    index > 0 ? stepPositions.push(element.percentage + stepPositions[index - 1]) : stepPositions.push(element.percentage)
  });

  Array.from(location.state.original.quotations).forEach((element: any) => {
    total += element.amount
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>

        <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
          Payment Schedule
        </a>


        <div style={{ marginRight: 10, marginBottom: 50, marginTop: 70 }}>
          <ProgressBar
            stepPositions={stepPositions}
            percent={location.state.original.balancePaid / total * 100}
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
          >
            {location.state.original.payment_term.map((value: any, index: number) => {
              return (
                <Step transition="scale" key={index} >
                  {({ accomplished, position }) => (

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)`, marginBottom: 10, marginTop: 10 }}
                        width="30"
                        src={toAbsoluteUrl('/media/icons/duotune/general/plant_small.png')} />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          width: 20,
                          height: 20,
                          color: "white",
                          backgroundColor: accomplished ? "green" : "gray"
                        }}>
                        {index + 1}
                      </div>
                    </div>

                  )}
                </Step>
              );
            })}

          </ProgressBar>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 70, marginBottom: 30, }}>
          <div>
            {location.state.original.payment_term.map((value: any, index: number) => {
              return <div key={index} style={{ display: 'flex', marginTop: 5 }}>
                {index + 1}
                <a style={{ marginLeft: 10, marginRight: 10 }}> ---&gt; </a>
                <b style={{ marginRight: 20 }}>{new Intl.DateTimeFormat('en-GB', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).format(new Date(value.date))} : </b>
                RM {value.amount} ({value.percentage}%)
              </div>
            })}

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 50 }}>
            <b style={{ color: 'green' }}>Balance Paid: RM {location.state.original.balancePaid}</b>
            <b style={{ color: 'red', marginTop: 5 }}>Balance Remaining: RM {total - location.state.original.balancePaid}</b>
            <b style={{ marginTop: 5 }}>Total: RM {total}</b>
          </div>
        </div>

        <div className='d-flex overflow-auto h-55px'>
          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/quotations/overview' && 'active')
                }
                to='/quotations/overview'
              >
                Overview
              </Link>
            </li>
            <li className='nav-item'>
              {(location.state.original.lock === false || isAdmin === 'Administrator') ? <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/quotations/settings' && 'active')
                }
                to='/quotations/settings'
              >
                Settings
              </Link> : <></>}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { QuotationHeader }
