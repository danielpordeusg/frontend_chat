import React from 'react';

function Button (props) {
  return(
    <div className="flex justify-center bg-blue-700 text-white border-2 rounded hover:bg-blue-900 p-2 min-h-1">
    <button
      className={props.className}
      type={props.type}
      onClick={ () => props.handleClick }
      >
        {props.text} 
      </button>
  </div>
  )
}

export default Button;