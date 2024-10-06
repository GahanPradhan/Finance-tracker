import React from 'react'

function Input({label,state,setState,placeholder,type}) {
  return (
    <div className='w-80'>
      <p>{label}</p>
      <input type={type}
      value={state} 
      placeholder={placeholder} 
      onChange={(e)=> setState(e.target.value)}
      className='outline-none bg-inherit border-b-2 w-full'
      />
    </div>
  )
}

export default Input
