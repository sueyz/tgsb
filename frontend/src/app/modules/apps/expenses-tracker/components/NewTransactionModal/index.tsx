import { FormEvent } from "react";
import Modal from "react-modal";
import { useTransactions } from '../../hooks/useTransactions';

import useState from 'react-usestateref'

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import { ID } from "../../../../../../_metronic/helpers";

interface Transaction {
  id: ID;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
  bank: string;
  card_type: string,
  note: string;
  lent_upfronted: string;
  refund: number;
  claim_date: string;
}

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  transaction?: Transaction;
}

var holder = false
var current: Transaction | undefined = undefined


export function NewTransactionModal({
  isOpen,
  onRequestClose,
  transaction
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  console.log(transaction?.claim_date)

  // modal form initial state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Regular Quotation");
  const [type, setType] = useState("deposit");
  const [bank, setBank] = useState("Maybank 000111222111");
  const [card_type, setCardType] = useState("Debit");
  const [note, setNote] = useState("");
  const [lent_upfronted, setLendUpfront] = useState("");
  const [refund, setRefund] = useState(0);
  const [claim_date, setClaimDate] = useState('');
  
  if((transaction !== undefined && holder === false )|| transaction !== current){
    setStuff()
    holder = true
    current = transaction
  }

  function setStuff(){
    setTitle(transaction?.title ? transaction.title : "");
    setAmount(transaction?.amount? transaction.amount: 0);
    setCategory(transaction?.category? transaction.category: 'Regular Quotation');
    setCardType(transaction?.card_type? transaction.card_type :'Debit');
    setBank(transaction?.bank? transaction.bank:'Maybank 000111222111');
    setType(transaction?.type?transaction.type:'deposit');
    setNote(transaction?.note?transaction.note:'');
    setLendUpfront(transaction?.lent_upfronted?transaction.lent_upfronted:'');
    setRefund(transaction?.refund?transaction.refund: 0);
    setClaimDate(transaction?.claim_date?(transaction.claim_date).split('T')[0]:'');
  }


  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
      bank,
      card_type,
      note,
      lent_upfronted,
      refund,
      claim_date
    });

    // clean input data
    setTitle("");
    setAmount(0);
    setCategory('Regular');
    setCardType('Debit');
    setBank('Maybank 000111222111');
    setType('deposit');
    setNote('');
    setLendUpfront('');
    setRefund(0);
    setClaimDate('');

    // close modal after save the data (async await)
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp = {false}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={() => {
          setStuff()
          onRequestClose()}}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Register transaction</h2>

        {/* Category */}
        <select style={{ textOverflow: 'ellipsis' }} className="form-select" aria-label="Default select example"
          value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="Regular Quotation">Regular Quotation</option>
          <option value="Sub-Consultant Quotation">Sub-Consultant Quotation</option>
          <option value="Petty cash">Petty cash</option>
        </select>

        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          placeholder="Note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />

        <TransactionTypeContainer>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />

          {/* bank */}
          <select style={{ textOverflow: 'ellipsis' }} className="form-select" aria-label="Default select example"
            value={bank} onChange={(event) => setBank(event.target.value)}>
            <option value="Maybank 000111222111">Maybank 000111222111</option>
            <option value="Cimb 344343434">Cimb 344343434</option>
          </select>

          {/* Card type */}
          <select className="form-select" aria-label="Default select example"
            value={card_type} onChange={(event) => setCardType(event.target.value)}>
            <option value="Debit">Debit</option>
            <option value="Credit">Credit</option>
          </select>


        </TransactionTypeContainer>


        <TransactionTypeContainer>


          <RadioBox
            type="button"
            onClick={() => {
              setType("deposit");
            }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Income</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Expenses</span>
          </RadioBox>

        </TransactionTypeContainer>

        {category === 'Petty cash' ? <TransactionTypeContainer>

          <input
            placeholder="Lend / upfronted by"
            value={lent_upfronted}
            onChange={(event) => setLendUpfront(event.target.value)}
          />

          <input
            type="number"
            placeholder="Refund"
            value={refund}
            onChange={(event) => setRefund(Number(event.target.value))}
          />


          <input className="form-control" type="date" value={claim_date} onChange={(event) => setClaimDate(event.target.value)}
          />

        </TransactionTypeContainer> : <></>}


        <button type="submit">Save</button>
      </Container>
    </Modal>
  );
}
