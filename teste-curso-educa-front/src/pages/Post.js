import React, { useState } from 'react';
import Axios  from 'axios';
import PostCard from '../components.js/PostCard';

function Post () {
  const [message, setMessage] = useState('');
  const [listMessage, setListMessage] = useState();

   async function handleClick () {
    await Axios.post("localhost:3001/posts", {
      message: message
    })
  }

  useEffect (() => {
    async function getMessage() {
      try {
      const message = await Axios.get("http://localhost:3001/posts");
      return setListMessage(message);
      } catch (error) {
        console.log(error)
      }
    }
    getMessage()
  }, []);

  return(
    <div>
      <header>
        <h1> Educachat </h1>
      </header>
      {typeof listMessage !== "undefined" && listMessage.map((value) => {
        return <PostCard 
          key={value.id}
          listMessage={listMessage}
          setListMessage={setListMessage}
          message={message}
          id={value.id}
        ></PostCard>
      })}
      <form>
        <textarea 
        type="message"
        value={ message }
        placeholder="faça sua postagem"
        onChange={({ target: { value } }) => setMessage(value)}
        >

        </textarea>
        <button
        className="btn-login"
        type=""
        onClick={ handleClick }
        >
          Clique pra enviar mensagem
        </button>
      </form>
    </div>
  )
}

export default Post;