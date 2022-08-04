import React from 'react';

function Input (props) {
  return(
  <div className="mb-2">
            <input
            className=" bg-slate-200 w-[325px] p-1 border-1 rounded"
            type={props.type}
            color="#000"
            value={ props.value }
            placeholder={props.placeholder}
            onChange={props.onChange}
            />
  </div>
  )
}

export default Input;