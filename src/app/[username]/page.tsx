"use client"
import React from 'react'
import{useParams, useRouter}from 'next/navigation'
const Page = () => {
  const {username} = useParams()
  const router = useRouter()

  const maxUsernameLength = 35

  if(!username || username.length >  maxUsernameLength) router.push('/')

  return (
    <div>{username}</div>
  )
}

export default Page