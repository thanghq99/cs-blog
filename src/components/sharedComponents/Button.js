import React from 'react'

function Button({title, action, icon, ...props}) {
  return (
    <button className='flex justify-center items-center px-3 py-2 font-bold rounded-sm text-red-500 bg-red-100 hover:bg-red-600 hover:text-white' onClick={action} {...props}>
      {icon && <div className='mr-2'>{icon}</div>}
      <p>{title}</p>
      </button>
  )
}

export default Button