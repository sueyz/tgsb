/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import {
  ChartsWidget1,
  TablesWidget1,
  ListsWidget5,
  TablesWidget5,
} from '../../../../_metronic/partials/widgets'
import { useLocation } from 'react-router'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../setup'
import { useHistoryState } from '../../quotations/QuotationsPage'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { SizeMe } from 'react-sizeme'




export function Overview() {
  const isAdmin = useSelector<RootState>(({ auth }) => auth.user?.role, shallowEqual)

  const location: any = useLocation()

  // console.log(location)

  const { history } = useHistoryState()

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }


  const match = location.state.original.attachments.find((element: any) => {
      if (element.includes("_quote")) {
        return true;
      }
    });

  // console.log(history)

  console.log(location.state.original.attachments
  )
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Quotation Details</h3>
          </div>
          {(location.state.original.lock === false || isAdmin === 'Administrator') ? <Link to='/quotations/settings' className='btn btn-primary align-self-center'>
            Edit Quotation
          </Link> : <></>}
        </div>

        <div className='card-body p-9'>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Quotation Name</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{location.state.original.name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Quotation Type</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bolder fs-6'>{location.state.original.type}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Company In Charge</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bolder fs-6'>{location.state.company_info.name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Invoice No</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bolder fs-6'>{location.state.original.invoiceNo}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Work Type</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bolder fs-6'>{location.state.original.workType}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Address</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bolder fs-6'>{location.state.original.address1}, {location.state.original.address2 ? location.state.original.address2 + ',' : ''} {location.state.original.address3 ? location.state.original.address3 + ',' : ''} {location.state.original.zip}, {location.state.original.city}, {location.state.original.state}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Person In Charge</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{location.state.original.poc ? location.state.original.poc : "-"}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Phone</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{location.state.original.contact ? location.state.original.contact : "-"}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Email</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{location.state.original.email ? location.state.original.email : "-"}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-muted'>Note</label>

            <div className='col-lg-8 fv-row'>
              <span className='fw-bolder fs-6'>{location.state.original.note ? location.state.original.note : "-"}</span>
            </div>
          </div>

          <div className='row mb-10'>
            <label className='col-lg-4 fw-bold text-muted'>Lock</label>

            <div className='col-lg-8'>
              <span className='fw-bold fs-6'>{(location.state.original.lock).toString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div>

        <SizeMe>
          {({ size }) => (
            <Document file={toAbsoluteUrl(`/documents/${match}`)} onLoadSuccess={onDocumentLoadSuccess}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <button
                  type="button"
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                >
                  Previous
                </button>
                <a>
                  Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </a>
                <button
                  type="button"
                  disabled={pageNumber >= (numPages ? numPages : 0)}
                  onClick={nextPage}
                >
                  Next
                </button>
              </div>
              <Page width={size.width ? size.width : 1} pageNumber={pageNumber} />
            </Document>
          )}
        </SizeMe>

        {/* <ChartsWidget1 className='card-xxl-stretch mb-5 mb-xl-10' /> */}
      </div>

      {/* <div className='row gy-10 gx-xl-10'>
        

        <div className='col-xl-6'>
          <TablesWidget1 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div>

      <div className='row gy-10 gx-xl-10'>
        <div className='col-xl-6'>
          <ListsWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>

        <div className='col-xl-6'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xl-10' />
        </div>
      </div> */}
    </>
  )
}
