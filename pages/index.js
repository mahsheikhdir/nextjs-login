import Head from 'next/head'
import { useEffect } from 'react';
import axios from 'axios';

export default function Home() {

  useEffect(() => {
    console.log("loaded");
  }, [])

  async function login(event) {
    event.preventDefault()

    console.log(process.env.LOGIN_END_POINT)
    console.log(event.target.username.value, event.target.password.value)
  

    try {

      let data = await axios.get("/api/" + event.target.username.value);
      console.log(data.data.Response.data.user);
    } catch (err) {
      console.log("error getting data for user");
    }
    
    
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r from-green-400 to-blue-500 ">

      <form className="bg-white shadow-md rounded p-12 pb-8 mb-4" onSubmit={login}>
        <div className="text-4xl font-semibold font-sans text-left pb-10 text-center">
          Login
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" required/>

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
