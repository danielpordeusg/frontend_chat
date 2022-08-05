import React, { useState, useEffect} from 'react';
import PostCard from '../components.js/PostCard';
import api from '../api/Api'
import Header from '../components.js/Header';

function Post () {
  const user = JSON.parse(localStorage.getItem('user'));
  const [messageId, setMessageId] = useState(0)
  const [status, setStatus] = useState('send')
  const [message, setMessage] = useState('');
  const [listMessage, setListMessage] = useState([]);

   async function handleClick () {
    try {
      const post = (await api.post("/posts", {
        message: message,
        userId: user.id
      })).data.post
      setMessage('')
      setListMessage((previousValue) => [...previousValue, {userName: user.name ,message, userId: user.id, id: post.id}])
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
  async function handleEdit (id) {
    try {
      setStatus('edit')
      setMessage('')
      setMessageId(id)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditMessage () {
    try {
      await api.put(`/posts/${messageId}`, 
      {
        message: message,
      })
      const messageIndex = listMessage.findIndex((message) => message.id === messageId);
      const newListMessage = listMessage;
      newListMessage[messageIndex] = {...newListMessage[messageIndex], message};
      setListMessage(newListMessage);
      setStatus('send')
      setMessage('')
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemove (id) {
    try {
      setStatus('remove')
      setMessageId(id)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveMessage () {
    try {
      setStatus('remove')
      await api.delete(`/posts/${messageId}`, 
      {
        message: message,
      })
      const newListMessage = listMessage.filter((message) => message.id !== messageId);
      setListMessage(newListMessage);
      setStatus('send')
      setMessage('')
    } catch (error) {
      console.log(error);
    }
  }


  useEffect (() => {
    async function getMessage() {
      try {
        const res = await api.get("/posts");
        setListMessage(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessage()
  }, []);
  
  // useEffect (() => {
  // if (listMessageNe !== listMessage) 
  //   setListMessage(listMessageNew);
  // },[listMessageNew]);

  
  
  return(
    <>
      <Header/>
      <div className="flex items-center flex-col">
        <div className="mb-16">
          <div className="min-h-[25px] mt-8 w-screen flex items-center justify-center">
            <h1 className="text-4xl font-black text-blue-800"> EducaChat </h1>
          </div>
        </div>
        <div className="flex flex-col items-center content-center">
          <div className="h-[500px] w-[650px] overflow-auto border-2">
            {listMessage && listMessage !== [] && listMessage.map((value) => {
              return <PostCard 
                key={`${value.id}-${value.userId}`}
                listMessage={listMessage}
                setListMessage={setListMessage}
                message={value.message}
                userName={value.userName}
                id={value.id}
                editMessage={status === 'edit'}
                handleEdit={handleEdit}
                handleRemove={handleRemove}
              ></PostCard>
            })}
          </div>
          <form className="flex-1 w-[650px] flex flex-row border-2 border-blue-800">
            <textarea
            className="bg-slate-200 w-8/12 text-left"
            type="message"
            value={ message }
            placeholder="faça sua postagem"
            onChange={({ target: { value } }) => setMessage(value)}
            >

            </textarea>
            {status === 'edit' &&
            <button 
              onClick={ (e) => {e.preventDefault();
                handleEditMessage() }} 
            >
              Editar mensagem 
            </button> }
            {status === 'remove' &&
            <button 
              onClick={ (e) => {e.preventDefault();
                handleRemoveMessage() }} 
            >
              Remova a mensagem 
            </button> }
            {status === 'send' &&
              <button
            className="bg-slate-200 w-4/12 hover:bg-slate-400 p-1.5 rounded"
            type=""
            onClick={ (e) => {
              e.preventDefault(); 
              handleClick()
            }}
            >
              Clique pra enviar a mensagem
            </button>}
          </form>
        </div>
      </div>
    </>
  )
}

export default Post;