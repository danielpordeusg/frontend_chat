import React from 'react';
import { FaEdit, FaRemoveFormat } from 'react-icons/fa';

function PostCard (props) {
  return(
    <div className="flex flex-row items-center content-center text-center">
      <span className="text-xl font-bold mr-2 text-blue-800">{props.userName}:</span>
      <span className="post-card text-lg">{props.message}</span>
      <div className="items-center ">
        <button
          className=" min-h-[px] p-2 text-black right-6 items-center justify-center"
          onClick={ () => {props.handleEdit(props.id)} }
        >
          <FaEdit/>
        </button>
        <button
          className=" min-h-[25px] p-2 text-black right-6 items-center"
          onClick={ () => {props.handleRemove(props.id)} }
        >
        <FaRemoveFormat/>
        </button>
      </div>
    </div>
  )
}

export default PostCard;