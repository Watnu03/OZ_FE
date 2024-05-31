import React from 'react'
import './ExpenseForm.css';
import { IoMdSend } from "react-icons/io";

const ExpenseForm = ({charge, handleCharge, amount, handleAmount, handleSubmit, edit}) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-center'>
          <div className='form-group'>
            <label>상품</label>
            <input 
                type='text' 
                className='form-control' 
                id='charge' 
                name='charge' 
                placeholder='예) 콜라'
                value={charge}
                onChange={handleCharge}
                >
            </input>
          </div>
          <div className='form-group'>
            <label>비용</label>
            <input 
                type='number' 
                className='form-control' 
                id='amount' 
                name='amount' 
                placeholder='예) 1000'
                value={amount}
                onChange={handleAmount}
                >
            </input>
          </div>
        </div>
        <button type='submit' className='btn'>{edit ? "수정":"제출"} <IoMdSend  className='btn-icon'/></button>
      </form>
    )
  }

  export default ExpenseForm;