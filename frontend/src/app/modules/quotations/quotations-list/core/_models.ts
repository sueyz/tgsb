import { ID, Response } from '../../../../../_metronic/helpers'
export type Quotations = {
  id?: ID
  company?: String,
  type?: String,
  name?: String,
  invoiceNo?: String,
  address1?: String,
  address2?: String,
  address3?: String,
  zip?: String,
  city?: String,
  state?: String,
  quotations?: Array<Object>,
  balancePaid?: Number,
  nextPaymentDate?: String,
  finalPaymentDate?: String,
  paymentTerm?: Array<Object>,
  projectSchedule?: Array<Object>,
  note?: String,
  poc?: String,
  contact?: String,
  email?: String,
  workType?: String,
  attachments?: Array<String>
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
  nextPaymentDate: '',
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
  attachments: ['']
}
