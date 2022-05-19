/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react'
import { ID, KTSVG, QUERIES, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { ProgressBar, Step } from 'react-step-progress-bar'
import { RootState } from '../../../setup'
import { shallowEqual, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { markQuotation, unlockQuotation } from '../quotations/quotations-list/core/_requests'

import { confirm } from "react-confirm-box";
import { UsersListLoading } from '../quotations/quotations-list/components/loading/QuotationsListLoading'
import { useHistoryState } from '../quotations/QuotationsPage'
import { useNavigate } from 'react-router'

const QuotationHeader: React.FC = () => {
  const location: any = useLocation()
  const isAdmin = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // const {history} = useHistoryState()
  const { setHistory } = useHistoryState()

  var stepPositions: Array<number> = []
  var total = 0

  const markSelectedItems = useMutation(() => markQuotation([location.state.original.id]), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      setLoading(false);
      location.state.original.lock = true
      setHistory(30)

    },
  })


  const unlockItem = useMutation(() => unlockQuotation(location.state.original.id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      setLoading(false);
      location.state.original.lock = false // nak antar  ni ke overview

      setHistory(60)

    },
  })

  Array.from(location.state.original.payment_term).forEach((element: any, index: number) => {
    index > 0 ? stepPositions.push(element.percentage + stepPositions[index - 1]) : stepPositions.push(element.percentage)
  });

  Array.from(location.state.original.quotations).forEach((element: any) => {
    total += element.amount
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>

        <div style={{ display: 'flex' }}>

          <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
            Payment Schedule
          </a>

          {(location.state.original.lock === false || isAdmin === 'Administrator') ? <button
            style={{ margin: 'auto', marginRight: 0 }}
            type='button'
            className='btn btn-danger'
            onClick={async () => {
              const result = await confirm("Are you sure?");
              if (result) {
                setLoading(true)

                {
                  location.state.original.lock === true && isAdmin === 'Administrator' ? await unlockItem.mutateAsync() :
                    await markSelectedItems.mutateAsync()
                }
                return;
              }
            }
            }
          >
            {location.state.original.lock === true && isAdmin === 'Administrator' ? "Unlock Quotation" : "Lock Quotation"}
          </button> : <a className='btn' style={{ margin: 'auto', marginRight: 0 }}>Locked</a>}

          {loading && <UsersListLoading />}


          {location.state.original.lock === false}

        </div>


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
              <a
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/quotations/overview' && 'active')
                }
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/quotations/overview', { state: { original: location.state.original, company_info: location.state.company_info } })
                }}
              >
                Overview
              </a>
            </li>
            <li className='nav-item'>
              {(location.state.original.lock === false || isAdmin === 'Administrator') ? <a
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === '/quotations/settings' && 'active')
                }
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('/quotations/settings', { state: { original: location.state.original, company_info: location.state.company_info } })
                }}
              >
                Settings
              </a> : <></>}

            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export { QuotationHeader }
