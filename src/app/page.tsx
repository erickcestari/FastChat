"use client"
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useTheme } from '@mui/material/styles'
import { ChangeEvent, useState } from 'react'

export default function Home() {
  const theme = useTheme()
  const [username, setUsername] = useState('')
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-slate-800 to-slate-700 p-24">
      <div className="flex flex-col items-center justify-center space-y-16">
        <div>
          <p className=" md:text-8xl text-6xl font-roboto font-extrabold text-transparent  bg-clip-text bg-gradient-to-br from-purple-300 to-red-200">
            Welcome to EasyChat
          </p>
          <div className='relative'>
            <p className="md:text-4xl text-2xl flex relative font-roboto text-transparent bg-clip-text font-medium border-b-4 bg-gradient-to-br from-red-100 to-red-500 border-b-red-300 rounded-lg">
              A simple chat app
            </p>
            <div className='md:bg-gradient-to-br absolute bg-none left-80 top-4 h-5 w-5  rounded-full from-red-400 to-transparent' />
          </div>
        </div >
        <div className='flex flex-col h-fullspace-y-1'>
          <p className=" text-white font-roboto">
            Enter your username to get started!
          </p>
          <TextField label={'username'} value={username} onChange={handleChangeUsername} />
        </div>
        <footer className="bg-white fixed bottom-4 w-[70%] justify-center rounded-lg shadow m-4 dark:bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 flex content-center justify-center">
            <span className="text-sm font-roboto text-gray-500 sm:text-center dark:text-gray-400">The account is not private; anyone can access your messages!
            </span>
          </div>
        </footer>
      </div>
    </main>
  )
}
