import {ID, Response} from '../../../../../_metronic/helpers'
export type Quotations = {
  id?: ID
  company?: String,
  type?: String,
  name?: String,
  invoiceNo?: String,
  address?: String,
  quotations?: String,
  balancePaid?: String,
  nextPaymentDate?: String,
  finalPaymentDate?: String,
  paymentTerm?: String,
  projectSchedule?: String,
  note?: String,
  poc?: String,
  contact?: String,
  isFinished?: Boolean,
  workType?: String
  // online?: boolean
  // initials?: {
  //   label: string
  //   state: string
  // }
}

export type QuotationsQueryResponse = Response<Array<Quotations>>

export const initialQuotations: Quotations = {
  company: '',
  type: '',
  name: '',
  invoiceNo: '',
  address: '',
  quotations: '',
  balancePaid: '',
  nextPaymentDate: '',
  finalPaymentDate: '',
  paymentTerm: '',
  projectSchedule: '',
  note: '',
  poc: '',
  contact: '',
  isFinished: false,
  workType: ''
}
