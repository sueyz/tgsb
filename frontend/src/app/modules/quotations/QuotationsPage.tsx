import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {QuotationsListWrapper} from './quotations-list/QuotationsList'

const quotationsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quotations',
    path: '/quotations/regular',
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

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
      <Route
        path='regular'
        element={
          <>
            <PageTitle breadcrumbs={quotationsBreadcrumbs}>Regular</PageTitle>
            <QuotationsListWrapper />
          </>
        }
      />
      <Route
        path='sub-consultant'
        element={
          <>
            <PageTitle breadcrumbs={quotationsBreadcrumbs}>Sub-Consultant</PageTitle>
            <QuotationsListWrapper />
          </>
        }
      />
      </Route>
      <Route index element={<Navigate to='/quotations/regular' />} />
    </Routes>
  )
}

export default UsersPage
