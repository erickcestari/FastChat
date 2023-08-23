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
  const [userNow, setUserNow] = useState<any>()
  const [text, setText] = useState<string>('')
  const [userAuthor, setUserAuthor] = useState<any>(null)

  const connectSocket = useCallback(async () => {
    const newSocket = io('http://localhost:3333')
    newSocket.emit('join', username)
    newSocket.emit('userAuthor', username)
    newSocket.on('users', (users: any) => setUsers([...users]))
    
    setSocket(newSocket)
  }, [username])

  useEffect(() => {
    connectSocket()
  }, [connectSocket])

  useEffect(() => {
    if (socket) {
      socket.on('messages', (messages: any) => {
        console.log(messages)
        setMessageList([...messages])
      })
      socket.on('user_author', (user: any) => {setUserAuthor(users[0])})
      socket.on('users', (users: any) => setUsers([...users]))
      setUserNow(users[0])
    }
    
  }, [socket, setUserNow, users])

  return (
    <div>
      {userAuthor && <p className='text-green-500'>User: {userAuthor.name}</p>}
      {userNow && users.map((user: any) => <p onClick={() => setUserNow(user)} key={user.id} className={userNow.id === user.id ? 'text-red-600' : 'text-blue-400'}>{user.name}</p>)}
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
            socket.emit('sendMessage', {content: text, authorId: userAuthor.id, receiverId: userNow.id})
            setText('')
          }
        }}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}

export default Page