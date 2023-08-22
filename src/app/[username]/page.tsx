"use client"
import React, { useState, useEffect } from 'react'
import{useParams, useRouter}from 'next/navigation'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3333')
const Page = () => {
  const { username } = useParams()
  const router = useRouter()
  const maxUsernameLength = 35
  if(!username || username.length >  maxUsernameLength) router.push('/')
  
  const [data, setData] = useState([])
  socket.on("connect", () => {
    socket.emit("join", username);
    socket.on("messages", (data) => {
      console.log(data)
      setData(data)
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from server.");
    });
  });

  console.log(data)


  return (
    <div>{username}</div>
  )
}

export default Page