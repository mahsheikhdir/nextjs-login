import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { parseCookies } from '../lib/parseCookies';
import {
  UserIcon,
  LockClosedIcon,
} from "@heroicons/react/solid";

export default function Home({ StartingMessage, SignInStatus }) {

  console.log('StartingMessage', StartingMessage)

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState(StartingMessage)

  useEffect(() => {
    if (SignInStatus) {
      router.push('/feed');
    }
  }, []);

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

      router.push('/feed');
    } else {
      setMessage("Something went wrong");
    }

  }


  if (SignInStatus) {
    return (

      <div className="flex h-screen">
        <div className="m-auto w-1/2 text-5xl">
          Redirecting...
        </div>
      </div>

    )
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-blue-300 to-blue-500 ">
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={login}>
            <div className="text-2xl font-bold text-center pb-8 text-blue-600">
              Login
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="username">
                Username
              </label>
              <div className='flex items-center'>
                <UserIcon className='text-gray-300' width={20} height={20}></UserIcon>
                <input className="ml-3 focus:outline-none border-b-2" id="username" value={username} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                Password
              </label>
              <div className='flex'>
                <LockClosedIcon className='text-gray-300' width={20} height={20}></LockClosedIcon>
                <input className="ml-3 focus:outline-none border-b-2" id="password" value={password} type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className='mt-2 text-right'>
                <label className='text-sm text-gray-500 underline cursor-pointer hover:text-blue-400'>Forgot password?</label>
              </div>
            </div>
            <div className='flex' >
              <button type="submit" className="flex-grow text-center text-white p-1 bg-blue-500 rounded-full hover:bg-blue-600 cursor-pointer">
                LOGIN
              </button>
            </div>
          </form>
          <div className='mt-10 text-center text-gray-400 text-sm'>
            Or Sign up using
          </div>
          <div className='flex justify-center mt-3 flex-grow'>
            <Image className='cursor-pointer'
              src="/facebook.png"
              height={40}
              width={40}
              objectFit="contain"
            />
            <Image src="/google.png"
              height={40}
              width={40}
              objectFit="contain"
            />
          </div>
          <div className='mt-20 text-center font-sm text-gray-400'>CopyRight (c) HateShield</div>
        </div>
      </div>
    </div>
  )
}

Home.getInitialProps = ({ req }) => {
  let cookies = parseCookies(req);

  let initialMessage = "Not logged in";
  let loggedIn = false;

  if (cookies.token) {

    const json = jwt.decode(cookies.token)
    console.log(json)
    initialMessage = `Welcome ${json.first_name} you are logged in.`;
    loggedIn = true;
  }

  return {
    StartingMessage: initialMessage,
    SignInStatus: loggedIn
  }
}