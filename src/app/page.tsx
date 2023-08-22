"use client"

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import { ChangeEvent, useState } from 'react'
import AccountCircleOutline from 'mdi-material-ui/AccountCircleOutline'
import SendCircleOutline from 'mdi-material-ui/SendCircleOutline'
import { IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const maxUsernameLength = 35
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value.length < maxUsernameLength && setUsername(e.target.value)
  }

  const handleSendUserName = () => {
    if (username.trim().length === 0) return

    router.push(`/${username}`)

  }

  return (
    <div className="flex flex-col items-center justify-center space-y-16">
      <div>
        <p className=" md:text-8xl text-6xl font-roboto font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-300 to-red-200">
          Welcome to EasyChat
        </p>
        <div className='relative'>
          <p className="md:text-4xl text-2xl flex relative font-roboto text-transparent bg-clip-text font-medium border-b-4 bg-gradient-to-br from-red-100 to-red-500 border-b-red-300 rounded-lg">
            A simple chat app
          </p>
          <div className='md:bg-gradient-to-br md:left-80 absolute bg-none top-4 h-5 w-5  rounded-full from-red-400 to-transparent' />
        </div>
      </div >
      <div className='flex flex-col w-full space-y-4'>
        <p className=" text-white font-roboto">
          Enter your username to get started!
        </p>
        <div className='flex flex-row items-center'>
          <TextField
            className='shadow-lg w-[50%] dark:bg-gray-800'
            label={'Your-Username'}
            value={username}
            onChange={handleChangeUsername}
            onSubmit={handleSendUserName}
            onKeyUp={(e) => e.key === 'Enter' && handleSendUserName()}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleOutline className='bg-gradient-to-br from-violet-700 to-red-200 rounded-full' />
                </InputAdornment>
              ),
            }}
          />
          <IconButton onClick={handleSendUserName} className='w-10 h-10 ml-3'>
            <SendCircleOutline className=' hover:text-slate-300 bg-gradient-to-br w-8 h-8 from-violet-700 to-red-200 rounded-full' />
          </IconButton>
        </div>
      </div>
      <footer className="bg-white fixed bottom-4 w-[50%] justify-center rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 flex content-center justify-center">
          <span className="text-sm font-roboto text-gray-300 sm:text-center dark:text-gray-300">The account is public; accessible to anyone!</span>
        </div>
      </footer>
    </div>
  )
}
