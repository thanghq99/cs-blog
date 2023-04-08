import React from 'react'

function PageHeader({title, button}) {
  return (
    <div className='flex justify-between items-center mb-5'>
        <h1 className="text-4xl">{title}</h1>
        {button}
    </div>
        
  )
}

export default PageHeader