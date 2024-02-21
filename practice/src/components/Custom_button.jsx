import React from 'react'

const Custom_button = (props) => {
  return (
    <div>
      <button className='bg-green-900 w-full px-5 py-2 text-white font-bold rounded-md' {...props}>
        {props.children}
      </button>
    </div>
  )
}

export { Custom_button}