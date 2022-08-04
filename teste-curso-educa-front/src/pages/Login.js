import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Axios from 'axios';


function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  async function handleClick() {
    try {
      await Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    })
    history('/posts')
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <div>
      <header>
        <h1> Educachat </h1>
      </header>
      <h1> Bem-vindo </h1>
      <h2> faça seu login para entrar</h2>
      <form>
        <div>
          <input
          type="email"
          value={ email }
          placeholder="digite seu email:"
          onChange={({ target: { value } }) => setEmail(value)}
          />
        </div>
        <div>
          <input
          type="password"
          value={password}
          placeholder="digite sua senha:"
          onChange={({ target: { value } }) => setPassword(value)}
          />
        </div>
        <div>
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
  );
}

export default Login;