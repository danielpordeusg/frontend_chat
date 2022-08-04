import React from 'react';

function PostCard (props) {
  return(
    <div>
      <p className="post-card">{props.message}</p>
    </div>
  )
}

export default PostCard;