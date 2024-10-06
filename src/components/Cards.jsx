import React from 'react'
import {Row,Card} from "antd"

function Cards({showExpenseModal,showIncomeModal,income,expenses,currentBalance}) {
  return (
    <div>
      <Row className='flex justify-between items-center w-[90%] m-[2rem]'>
        <Card title="Current Balance" className='shadow-md w-[400px]'>
            <p>₹{currentBalance}</p>
            <button className='w-full bg-blue-400 hover:bg-blue-500 mt-2 p-2 rounded-md'>
                Reset Balance
            </button>
        </Card>
        <Card title="Total Income" className='shadow-md w-[400px]'>
            <p>₹{income}</p>
            <button className='w-full bg-blue-400 hover:bg-blue-500 mt-2 p-2 rounded-md'
            onClick={showIncomeModal}>
                Add Income
            </button>
        </Card>
        <Card title="Total Expenses" className='shadow-md w-[400px]'>
            <p>₹{expenses}</p>
            <button className='w-full bg-blue-400 hover:bg-blue-500 mt-2 p-2 rounded-md'
            onClick={showExpenseModal}>
                Add Expense
            </button>
        </Card>
      </Row>
    </div>
  )
}

export default Cards
