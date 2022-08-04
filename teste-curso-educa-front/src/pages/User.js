import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/Api'
import Header from '../components.js/Header';


function User() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const history = useNavigate();

  async function handleClick() {
    try {
      await api.post('/users', {
      email,
      name,
      password,
    })
    history('/login')
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }
    function changeToLoginPage() {
    history('/login');
  }

  return(
    <div>
      <Header/>
      <div className="flex flex-col items-center justify-center p-10">
        <h1 className="font-bold text-3xl m-4"> Bem-vindo </h1>
        <h2> faça seu registro: </h2>
        <form>
          <div className="mb-2">
            <input
            className=" bg-slate-200 w-[325px] p-1 border-1 rounded"
            type="email"
            color="#000"
            value={ email }
            placeholder="digite seu email:"
            onChange={({ target: { value } }) => setEmail(value)}
            />
          </div>
          <div className="mb-2">
            <input
            className=" bg-slate-200 w-[325px] p-1 border-1 rounded"
            type="name"
            value={ name }
            placeholder="digite seu nome:"
            onChange={({ target: { value } }) => setName(value)}
            />
          </div>
          <div className="mb-2">
            <input
            className=" bg-slate-200 w-[325px] p-1 border-1 rounded"
            type="password"
            value={password}
            placeholder="digite sua senha:"
            onChange={({ target: { value } }) => setPassword(value)}
            />
          </div>
          <div className="flex justify-center bg-blue-700 text-white border-2 rounded hover:bg-blue-900 p-2">
            <button
              className=""
              type="button"
              onClick={ handleClick }
              >
                Registrar 
              </button>
          </div>
          <div className="flex justify-center bg-blue-700 text-white border-2 rounded hover:bg-blue-900 p-2">
            <button
              className=""
              type="button"
              onClick={ changeToLoginPage }
              >
                Já tenho uma conta 
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default User;