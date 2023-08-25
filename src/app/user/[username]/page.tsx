"use client"
import Chat from '@/components/chat'
import RenderUser from '@/components/renderUser'
import { User } from '@/types/userTypes'
import Avatar from '@mui/material/Avatar'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { env } from 'process'

const Page = () => {
  const { username } = useParams()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [author, setAuthor] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [userSelected, setUserSelected] = useState<User | null>(null)

  const apiURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'

  const connectSocket = useCallback(async () => {
    const newSocket = io(apiURL)
    newSocket.emit('join', username)
    setSocket(newSocket)
  }, [username, apiURL])

  useEffect(() => {
    connectSocket()
  }, [connectSocket])

  useEffect(() => {
    if (socket) {
      socket.on('author', (user: User) => {
        setAuthor(user)
      })
      socket.on('getAllUsers', (userList: User[]) => {
        const filteredUserList = userList.filter(user => user.name !== (username as string).toLowerCase())
        setUsers(filteredUserList)
        !userSelected && setUserSelected(filteredUserList[0])
      })
    }
  }, [socket, username, userSelected])

  const handleSelectUser = (user: User) => {
    setUserSelected(user)
  }

  return (
    <div className='flex md:flex-row flex-col justify-normal'>
      <div className='flex flex-col w-full max-w-lg'>
        {author && (
          <div className='bg-slate-900'>
            <div className='flex items-center px-3 py-3 cursor-default text-slate-300 gap-2'>
              <Avatar sx={{ background: `linear-gradient(to right bottom, #${author.id.slice(0, 6)}, #${author.id.slice(author.id.length - 7, author.id.length - 1)})` }}>
                {author.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <h1 className='font-roboto font-normal'>{author.name.toUpperCase()}</h1>
            </div>
          </div>
        )}
        <div className='md:max-h-[680px] bg-slate-800 max-h-48 md:h-[680px] overflow-y-auto customScrollBar'>
          {userSelected && users.map((user: User) => (
            <RenderUser user={user} handleSelectUser={handleSelectUser} isUserSelected={userSelected.id === user.id} key={user.id} />
          ))}
        </div>
      </div>
      <div className='flex w-full'>
        {userSelected && socket && author && <Chat socket={socket} author={author} userSelected={userSelected} />}
      </div>
    </div>
  )
}

export default Page