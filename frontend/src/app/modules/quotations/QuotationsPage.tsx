import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {QuotationsListWrapper} from './quotations-list/QuotationsList'

const quotationsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quotations',
    path: '/quotations',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const QuotationsPage = () => {
  return <QuotationsListWrapper/>
  // (
  //   <Routes>
  //     <Route element={<Outlet />}>
  //     <Route
  //       path='quotations'
  //       element={
  //         <>
  //           <PageTitle>Quotation lists</PageTitle>
  //           <QuotationsListWrapper />
  //         </>
  //       }
  //     />
  //     </Route>
  //     <Route index element={<Navigate to='/' />} />
  //   </Routes>
  // )
}

export default QuotationsPage
