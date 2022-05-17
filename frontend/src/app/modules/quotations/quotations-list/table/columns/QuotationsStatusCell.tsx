import { FC } from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import { array } from 'yup';

type Props = {
  quotations?: Array<Object>
  balancePaid?: number
}

const QuotationsStatusCell: FC<Props> = ({ balancePaid, quotations }) => {

  var total = 0

  quotations?.forEach((element: any) => {
    total += element.amount
  })

  return (
    <div>

      <ProgressBar
        percent={balancePaid ? balancePaid / total * 100 : 0}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      // text=''
      />
      <i style={{ fontSize: 'x-small' }}>RM {total - (balancePaid ? balancePaid : 0)} remaining</i>

    </div>
  )
}

export { QuotationsStatusCell }
