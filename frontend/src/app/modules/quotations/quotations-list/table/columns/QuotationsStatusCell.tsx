import { FC } from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import { array } from 'yup';
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers';

type Props = {
  quotations?: Array<Object>
  balancePaid?: number
  next_payment_date?: string
}

const QuotationsStatusCell: FC<Props> = ({ balancePaid, quotations, next_payment_date }) => {

  var total = 0

  quotations?.forEach((element: any) => {
    total += element.amount
  })

  var date1 = next_payment_date ? new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(next_payment_date)) : "10000000"

  var numberDate1 = Number(date1.split('/').reverse().join(''));
  //number 20180605

  var date2 = new Date();
  var numberDate2 = parseInt(date2.toISOString().slice(0, 10).replace(/-/g, ""));
  // number 20180610

  // console.log(numberDate2)
  console.log(numberDate1)


  return (
    <div>
      {total === balancePaid ? <></> : <p style={{ fontSize: 'x-small' }} className='mt-5'>Next Payment: {next_payment_date ? new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        day: '2-digit',
        month: '2-digit',
      }).format(new Date(next_payment_date)) : ""} {numberDate2 <= numberDate1 ? <img style={{ paddingBottom: 3 }} src={toAbsoluteUrl('/media/icons/duotune/general/caution.png')} className='' alt='' /> : <img style={{ paddingBottom: 3 }} src={toAbsoluteUrl('/media/icons/duotune/general/warning.png')} className='' alt='' />}
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
