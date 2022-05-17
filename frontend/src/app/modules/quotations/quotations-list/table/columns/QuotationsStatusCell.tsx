import { FC } from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import { array } from 'yup';
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers';

type Props = {
  quotations: Array<{
    desc: string,
    amount: number
  }>
  payment_term?: Array<{
    percentage: number,
    desc: string,
    amount: number,
    date: string
  }>
  balancePaid?: number
}

const QuotationsStatusCell: FC<Props> = ({ balancePaid, payment_term, quotations }) => {

  var total = 0
  var next_payment_date = ''
  var numberDate1 = 0


  var date2 = new Date();
  var numberDate2 = parseInt(date2.toISOString().slice(0, 10).replace(/-/g, ""));
  // number 20180610

  quotations?.forEach((element: any) => {
    total += element.amount
  })

  if (payment_term !== undefined) {
    for (let i = 0; i < payment_term.length; i++) {

      next_payment_date = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date(payment_term[i].date))
      numberDate1 = Number(next_payment_date.split('/').reverse().join(''));
      //number 20180605

      if (numberDate2 <= numberDate1)
        break
    }
  }

  return (
    <div>
      {(balancePaid ? balancePaid : 0) >= total ? <></> : <p style={{ fontSize: 'x-small' }} className='mt-5'>Next Payment: {next_payment_date } {numberDate2 <= numberDate1 ? <img style={{ paddingBottom: 3 }} src={toAbsoluteUrl('/media/icons/duotune/general/caution.png')} className='' alt='' /> : <img style={{ paddingBottom: 3 }} src={toAbsoluteUrl('/media/icons/duotune/general/warning.png')} className='' alt='' />}
      </p>}

      <ProgressBar
        percent={balancePaid ? balancePaid / total * 100 : 0}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      // text=''
      />
      {total === balancePaid ? <i style={{ fontSize: 'x-small' }}>Completed</i> :
        <i style={{ fontSize: 'x-small' }}>RM {total - (balancePaid ? balancePaid : 0)} remaining</i>}


    </div>
  )
}

export { QuotationsStatusCell }
