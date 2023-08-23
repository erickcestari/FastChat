"use client"
import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import io from 'socket.io-client'

const  Page = () => {
  const { username } = useParams()
  const [socket, setSocket] = useState<any>(null)

  const connectSocket = useCallback(async () => {
    const newSocket = io('http://localhost:3333')
    newSocket.emit('join', username)
    setSocket(newSocket)
  }, [username])

  useEffect(() => {
    connectSocket()
  }, [connectSocket])

  useEffect(() => {
    if (socket) {
      socket.on('message', (message: any) => {
        console.log(message)
      })
    }
  },[socket])

  return (
    <div>
      <h1>{username}</h1>
    </div>
  )
}

export default Page