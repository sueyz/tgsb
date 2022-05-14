import {ID, Response} from '../../../../../_metronic/helpers'
export type Quotations = {
  id?: ID
  company?: String,
  type?: String,
  name?: String,
  invoiceNo?: String,
  address?: String,
  quotations?: Array<Object>,
  balancePaid?: String,
  nextPaymentDate?: String,
  finalPaymentDate?: String,
  paymentTerm?: Array<Object>,
  projectSchedule?: Array<Object>,
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
  type: 'Regular',
  name: '',
  invoiceNo: '',
  address: '',
  quotations: [],
  balancePaid: '',
  nextPaymentDate: '',
  finalPaymentDate: '',
  paymentTerm: [],
  projectSchedule: [],
  note: '',
  poc: 'Aqil',
  contact: '01999898899',
  isFinished: false,
  workType: ''
}
