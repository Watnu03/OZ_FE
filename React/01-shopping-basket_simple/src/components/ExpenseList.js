import React from 'react'
import './ExpenseList.css';
import ExpenseItem from './ExpenseItem';
import { MdDelete } from "react-icons/md";

const ExpenseList = ({initialExpenses, handleDelete, handleEdit, clearItem}) => {

  return (
    <>
      <ul className='list'>
        {initialExpenses.map(expense => {
          return (
            <ExpenseItem 
              handleEdit={handleEdit} 
              key={expense.id} 
              expense={expense}
              handleDelete={handleDelete}
            />
          )
        })}
      </ul>
      {/* item이 없으면 버튼 안보이기 */}
      {initialExpenses.length > 0 && (
      <button className='btn' onClick={clearItem}>
        모든 상품 제거
        <MdDelete className='btn-icon'/>
      </button>
      )}
    </>
  )
}

export default ExpenseList;