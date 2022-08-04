import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router';
import api from '../api/Api'
import AppContext from '../context/AppContext';
import jwt from 'jwt-decode';


function Login () {
  const {setUserId, setUserEmail } = useContext(AppContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  async function handleClick() {
    try {
      const res = await api.post("/login", {
      email: email,
      password: password,
    })
    const user = jwt(res.data)
    setUserEmail(user.data.email)
    setUserId(user.data.id)
    console.log('token', user)
    history('/post')
    } catch (error) {
      console.log(JSON.stringify(error));
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