import {FC} from 'react'
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

type Props = {
  percentageDone?: number
  balanceDue?: number
}

const QuotationsStatusCell: FC<Props> = ({balanceDue, percentageDone}) => (
  <div>

  <ProgressBar
        percent={percentageDone? percentageDone:75}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        // text=''
      />
      <i style={{fontSize: 'x-small'}}>RM {balanceDue} remaining</i>

      </div>
)

export {QuotationsStatusCell}
