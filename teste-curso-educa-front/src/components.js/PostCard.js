import React from 'react';

function PostCard (props) {
  return(
    <div class="flex flex-row items-center content-center text-center">
      <span class="text-xl font-bold mr-2 text-blue-800">{props.userName}:</span>
      <span className="post-card text-lg">{props.message}</span>
    </div>
  )
}

export default PostCard;