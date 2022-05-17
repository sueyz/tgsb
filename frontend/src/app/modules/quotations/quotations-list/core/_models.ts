import { ID, Response } from '../../../../../_metronic/helpers'
export type Quotations = {
  id?: ID
  company?: string,
  type?: string,
  name?: string,
  invoiceNo?: string,
  address1?: string,
  address2?: string,
  address3?: string,
  zip?: string,
  city?: string,
  state?: string,
  quotations?: Array<Object>,
  balancePaid?: number,
  next_payment_date?: string,
  finalPaymentDate?: string,
  paymentTerm?: Array<Object>,
  projectSchedule?: Array<Object>,
  note?: string,
  poc?: string,
  contact?: string,
  email?: string,
  workType?: string,
  attachments?: Array<String>,
  lock?: boolean,
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
  address1: '',
  address2: '',
  address3: '',
  zip: '',
  city: '',
  state: '',
  quotations: [{
    desc: '',
    amount: 0
  }],
  balancePaid: 0,
  next_payment_date: '',
  finalPaymentDate: '',
  paymentTerm: [{
    percentage: 0,
    desc: '',
    amount: 0
  }],
  projectSchedule: [{
    desc: '',
    week: '',
    remark: ''
  }
  ],
  note: '',
  poc: '',
  contact: '',
  email: '',
  workType: 'EIT',
  attachments: [],
  lock: false
}
