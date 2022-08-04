import React, { useState, useEffect, useContext } from 'react';
import PostCard from '../components.js/PostCard';
import api from '../api/Api'
import AppContext from '../context/AppContext';

function Post () {
  const { userId } = useContext(AppContext)
  const [message, setMessage] = useState('');
  const [listMessageNew, setListMessageNew] = useState([])
  const [listMessage, setListMessage] = useState([]);
  console.log('log do id', userId)

   async function handleClick () {
    try {
      console.log('log da messagasem', message)
      await api.post("/posts", {
        message: message,
        userId: userId
      })
      setMessage('')
    } catch (error) {
      console.log(JSON.stringify(error))
    }
   
  }
  useEffect (() => {
    async function getMessage() {
      try {
        const res = await api.get("/posts");
        // console.log('res', res)
        setListMessageNew(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getMessage()
  }, []);
  
  useEffect (() => {
    listMessageNew !== listMessage ?? setListMessage(listMessageNew)
  },[listMessageNew])

  
  
  return(
    <div>
      <header>
        <h1> Educachat </h1>
      </header>
      {listMessage && listMessage !== [] && listMessage.map((value) => {
        return <PostCard 
          key={value.id}
          listMessage={listMessage}
          setListMessage={setListMessage}
          message={value.message}
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
        onClick={ (e) => {
          e.preventDefault(); 
          handleClick() 
        }}
        >
          Clique pra enviar mensagem
        </button>
      </form>
    </div>
  )
}

export default Post;