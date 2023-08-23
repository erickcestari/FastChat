"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import io from 'socket.io-client'

const Page = () => {
  const { username } = useParams()
  const router = useRouter()
  const maxUsernameLength = 35
  if (!username || username.length > maxUsernameLength) router.push('/')

  const [messageList, setMessageList] = useState<any>([])
  const [socket, setSocket] = useState<any>(null)
  const [users, setUsers] = useState<any>([])
  const [userNow, setUserNow] = useState<any>(null)
  const [text, setText] = useState<string>('')
  const [userAuthor, setUserAuthor] = useState<any>(null)

  const connectSocket = useCallback(async () => {
    const newSocket = io('http://localhost:3333')
    newSocket.emit('join', username)
    newSocket.emit('userAuthor', username)
    
    setUserNow(users[0])
    setSocket(newSocket)
  }, [])

  useEffect(() => {
    connectSocket()
  }, [connectSocket])

  useEffect(() => {
    if (socket) {
      socket.on('messages', (messages: any) => {
        console.log(messages)
        setMessageList([...messages])
      })
      socket.on('userAuthor', (user: any) => setUserAuthor(user))
      socket.on('users', (users: any) => setUsers([...users]))
    }
    
  }, [socket])


  return (
    <div>
      {users.map((user: any) => <p key={user.id}>{user.name}</p>)}
      {messageList.map((message: any) =>
        <div key={message.id}>
          {message.authorUser.name}: {message.content}
        </div>
      )}
      <textarea
        value={text}
        className='w-full h-20 text-red-500'
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            socket.emit('sendMessage', {content: text, authorId: "83455daa-3525-484a-b524-b6d0b52c6b9f", receiverId: "ccc2729f-cd5b-4b32-8dba-c1b8a13c9e91"})
            setText('')
          }
        }}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}

export default Page