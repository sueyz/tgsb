import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { QuotationHeader } from '../accounts/QuotationHeader'
import { Overview } from '../accounts/components/Overview'
import { Settings } from '../accounts/components/settings/Settings'
import { QuotationsListWrapper } from './quotations-list/QuotationsList'
import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react';


export interface HistoryType {
  history?: number;
  setHistory: (value: number) => void;
}

export const HistoryContext = createContext<HistoryType | undefined>(undefined);

export const useHistoryState = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistoryState error');
  }
  return context;
};


const quotationsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Quotations',
    path: '/quotations/list',
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
  const [history, setHistory] = useState<number | undefined>();

  const value = useMemo(() => {
    return { history, setHistory };
  }, [history]);

  return <Routes>
    <Route
      path='list'
      element={
        <>
          {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Overview</PageTitle> */}
          <QuotationsListWrapper />
        </>
      }
    />
    <Route
      element={
        <>
          <HistoryContext.Provider value={value}>

            <QuotationHeader />
            <Outlet />
          </HistoryContext.Provider >

        </>
      }
    >
      <Route
        path='overview'
        element={
          <>
            {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle> */}
            <Overview />

            {/* <Settings /> */}
          </>
        }
      />
      <Route
        path='settings'
        element={
          <>
            {/* <PageTitle breadcrumbs={accountBreadCrumbs}>Settings</PageTitle> */}
            {/* <Overview /> */}

            <Settings />
          </>
        }
      />
    </Route>
    <Route index element={<Navigate to='/quotations/list' />} />
  </Routes>
}

export default QuotationsPage
