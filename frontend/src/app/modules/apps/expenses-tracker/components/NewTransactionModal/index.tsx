import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  var newtoday = yyyy + '-' + mm + '-' + dd;

  // modal form initial state
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("Regular");
  const [type, setType] = useState("deposit");
  const [bank, setBank] = useState("Maybank 000111222111");
  const [card_type, setCardType] = useState("Debit");
  const [note, setNote] = useState("");
  const [lent_upfronted, setLendUpfront] = useState("");
  const [refund, setRefund] = useState(0);
  const [claim_date, setClaimDate] = useState('');

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
    setTitle('');
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
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Register transaction</h2>

        {/* Category */}
        <select style={{ textOverflow: 'ellipsis' }} className="form-select" aria-label="Default select example"
          onChange={(event) => setCategory(event.target.value)}>
          <option defaultValue="Regular Quotation">Regular Quotation</option>
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
            onChange={(event) => setBank(event.target.value)}>
            <option defaultValue="Maybank 000111222111">Maybank 000111222111</option>
            <option value="Cimb 344343434">Cimb 344343434</option>
          </select>

          {/* Card type */}
          <select className="form-select" aria-label="Default select example"
            onChange={(event) => setBank(event.target.value)}>
            <option defaultValue="Debit">Debit</option>
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
            onChange={(event) => setAmount(Number(event.target.value))}
          />


          <input className="form-control" type="date" value={claim_date} onChange={(event) => setClaimDate(event.target.value)}
          />

        </TransactionTypeContainer> : <></>}


        <button type="submit">Save</button>
      </Container>
    </Modal>
  );
}
