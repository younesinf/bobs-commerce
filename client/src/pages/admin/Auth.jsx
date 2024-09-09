import { LoginOutlined, Logout } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Auth = () => {
  document.title = "Auth"
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [psw, setPsw] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === "jonaskr" || "Jonaskr" && psw === "kz752003kz") {
      localStorage.setItem("admin", "jonaskr")
      navigate('/admin/dash')
    } else {
      alert("Username or password is wrong")
    }
  }
  return (
    <>
      <header className='flexCenter py-3 px-6 lg:px-28 shadow-md'>
        <Link to='/'>
          <h1 className='text-3xl font-bold'>
            BOB'S STORE
          </h1>
        </Link>
      </header>
      <main className='flexCenter bg-[#E0F7E9] px-3 h-[calc(100vh-60px)]'>
        <form onSubmit={handleLogin}
          className='bg-white flex flex-col gap-2 py-8 px-6 border-[1px] rounded-lg shadow-lg w-full md:w-[400px]'>
          <h2 className='text-center text-2xl font-semibold mb-6 flexCenter gap-2'>
            <LoginOutlined color='secondary' />
            Auth</h2>
          <div className='flex flex-col'>
            <label>Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)}
              className='input' type="text" placeholder='Enter your username' required />
          </div>
          <div className='flex flex-col'>
            <label>Password</label>
            <input value={psw} onChange={(e) => setPsw(e.target.value)}
              className='input' type="password" placeholder='Enter your password' required />
          </div>
          <button className='bg-[#00674F] text-white text-base p-2 w-full mt-4 rounded-sm'
            type='submit' >
            Login</button>
        </form>
      </main>
    </>
  )
}

export default Auth