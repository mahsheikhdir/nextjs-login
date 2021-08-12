import Head from 'next/head'
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { parseCookies } from '../lib/parseCookies';

export default function Home({ StartingMessage }) {

console.log('wfewofw', StartingMessage)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState(StartingMessage)


  async function login(event) {
    event.preventDefault()

    const response = await axios({
      method: 'POST',
      url: '/api/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: username,
        password: password,
      }
    })


    console.log(response);
    const token = response.data.token;

    console.log('token', token);

    if (token) {
      const json = jwt.decode(token)

      console.log(json)
      setMessage(`Welcome ${json.first_name} you are logged in.`);
      Cookies.set('token', token)
    } else {
      setMessage("Something went wrong");
    }

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-green-400 to-blue-500 ">

      <h1>{message}</h1>
      <form className="bg-white shadow-md rounded p-12 pb-8 mb-4" onSubmit={login}>
        <div className="text-4xl font-semibold font-sans text-left pb-10 text-center">
          Login
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)} required />

        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 mx-auto hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

Home.getInitialProps = ({ req }) => {
  let cookies = parseCookies(req);

  let initialMessage = "Not logged in";

  if (cookies.token) {

    const json = jwt.decode(cookies.token)
    console.log(json)
    initialMessage = `Welcome ${json.first_name} you are logged in.`;
  }

  return {
    StartingMessage: initialMessage
  }
}