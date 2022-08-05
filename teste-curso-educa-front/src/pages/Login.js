import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/Api'
import jwt from 'jwt-decode';
import Header from '../components.js/Header';
import Input from '../components.js/Input';


function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  async function handleClick() {
    try {
      const res = await api.post("/login", {
      email: email,
      password: password,
    })
    const user = jwt(res.data).data;
    localStorage.setItem('user', JSON.stringify(user));
    history('/post')
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return(
    <div>
      <Header/>
      <div className="flex flex-col items-center justify-center p-10">
      <h1 className="font-bold text-3xl m-4"
      > 
      Bem-vindo 
      </h1>
      <h2> faça seu login para entrar</h2>
        <form>
          <Input 
          value={email}
          type={"email"}
          required
          placeholder={"Digite seu email:"}
          onChange={ ({ target: { value } }) => setEmail(value)}
          />
          <Input 
            value={password}
            type={"password"}
            minLength="7"
            required
            placeholder={"Digite sua senha:"}
            onChange={ ({ target: { value } }) => setPassword(value)}
            />
          <div className="flex justify-center bg-blue-700 text-white border-2 rounded hover:bg-blue-900 p-2 min-h-1">
            <button
              className="btn-login"
              type="button"
              onClick={ handleClick }
              >
                Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;