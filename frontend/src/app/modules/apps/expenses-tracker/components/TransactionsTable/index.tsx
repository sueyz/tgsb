import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import React from 'react';

export function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => {
            return (
              <React.Fragment key={transaction.id}>
                <tr>
                  <td><img style={{ cursor: 'pointer' }} src={toAbsoluteUrl('/media/icons/duotune/arrows/arr013.svg')} data-bs-toggle="collapse" data-bs-target={"#a" + transaction.id} aria-expanded="false" aria-controls={'a' + transaction.id} />
                    {"   " + transaction.title}</td>
                  <td className={transaction.type}>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "MYR",
                    }).format(transaction.amount)}
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {new Intl.DateTimeFormat('en-US', {}).format(new Date(transaction.createdAt))}
                  </td>
                  <td><img style={{ cursor: 'pointer', marginRight: 15 }} src={toAbsoluteUrl('/media/icons/duotune/general/pencil.png')}/>
                  <img style={{ cursor: 'pointer' }} src={toAbsoluteUrl('/media/icons/duotune/general/trash.png')}/>
                  </td>

                </tr>

                <tr>
                  <td key={'a' + transaction.id} colSpan={5} style={{ padding: 0 }} className="collapse" id={'a' + transaction.id}>
                    <div className="card card-body" style={{ borderRadius: 0, color: 'white', backgroundColor: "#1E1E2D" }}>
                      <p><b>Bank: </b>{transaction.bank} </p>
                      <p><b>Card type: </b>{transaction.card_type} </p>
                      <p><b>Note: </b>{transaction.note} </p>
                      {transaction.category === 'Petty cash' ? <p><b>Lend/Upfronted by: </b>{transaction.lent_upfronted} </p> : <></>}
                      {transaction.category === 'Petty cash' ? <p><b>Refund: </b>{transaction.refund} </p> : <></>}
                      {transaction.category === 'Petty cash' ? <p><b>Claim date: </b>{new Intl.DateTimeFormat('en-US', {}).format(new Date(transaction.claim_date))} </p> : <></>}


                    </div>
                  </td>
                </tr>

              </React.Fragment>



            );
          })}
        </tbody>
      </table>
    </Container>
  );
}


