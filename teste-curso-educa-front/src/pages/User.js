import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/Api'


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

  return(
    <div>
      <header>
        <h1> Educachat </h1>
      </header>
      <h1> Bem-vindo </h1>
      <h2> faça seu registro: </h2>
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
          type="name"
          value={ name }
          placeholder="digite seu nome:"
          onChange={({ target: { value } }) => setName(value)}
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
          className="btn-entrar"
          type="button"
          onClick={ handleClick }
          >
            Registrar 
          </button>
        </div>
      </form>
    </div>
  );
}

export default User;