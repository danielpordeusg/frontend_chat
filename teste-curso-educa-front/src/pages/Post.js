import React, { useState, useEffect, useContext } from 'react';
import PostCard from '../components.js/PostCard';
import api from '../api/Api'
import AppContext from '../context/AppContext';
import Header from '../components.js/Header';

function Post () {
  const { userId } = useContext(AppContext)
  const [message, setMessage] = useState('');
  const [listMessageNew, setListMessageNew] = useState([])
  const [listMessage, setListMessage] = useState([]);

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
  }, [listMessage]);
  
  useEffect (() => {
  if (listMessageNew !== listMessage) 
    setListMessage(listMessageNew)
  },[listMessageNew])

  
  
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
                key={value.id}
                listMessage={listMessage}
                setListMessage={setListMessage}
                message={value.message}
                userName={'usuario'}
                id={value.id}
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
            <button
            className="bg-slate-200 w-4/12 hover:bg-slate-400 p-1.5 rounded"
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
      </div>
    </>
  )
}

export default Post;