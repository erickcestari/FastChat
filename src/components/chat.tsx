import { User } from '@/types/userTypes'
import { Avatar, TextField } from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

interface ChatProps {
  author: User
  userSelected: User
  socket: Socket
}

const Chat = (props: ChatProps) => {
  const { author, userSelected, socket } = props

  const [messages, setMessages] = useState<any[]>([])
  const [text, setText] = useState('')

  useEffect(() => {
    socket.emit('joinRoom', ({authorId: author.id, receiverId: userSelected.id}))
    socket.on('receiveMessage', (data) => {
      setMessages(data)
    })
    socket.on('updateMessages', () => {
      socket.emit('joinRoom', ({authorId: author.id, receiverId: userSelected.id}))
    })
  }, [socket, author, userSelected])

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && e.shiftKey == false && text.trim().length > 0) {
      console.log(author.id, userSelected.id, text)
      socket.emit('sendMessage', {authorId: author.id, receiverId: userSelected.id, content: text})
      setText('')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(text.trim().length === 0 && e.target.value == '\n') return
    setText(e.target.value)
  }
  return (
    <div className='flex w-full flex-col'>
      <div className='from-slate-900 to-slate-800  bg-gradient-to-br w-full  text-slate-300 font-roboto h-16 py-3 px-3 items-center flex gap-3'>
        <Avatar sx={{ background: `linear-gradient(to right bottom, #${userSelected.id.slice(0, 6)}, #${userSelected.id.slice(userSelected.id.length - 7, userSelected.id.length - 1)})` }}>
          {userSelected.name.slice(0, 2).toUpperCase()}
        </Avatar>
        {userSelected.name[0].toUpperCase() + userSelected.name.slice(1, userSelected.name.length)}
      </div>
      <div className='relative flex h-full bg-slate-950'>
        <div className='flex flex-col gap-2 w-full h-full overflow-auto customScrollBar'>
          {messages.length > 0 && messages.map((message, index) => (
            <div key={index} className={`flex flex-col ${message.authorUser.name.includes(author.name) ? 'items-end' : 'items-start'} gap-1 px-3 py-2`}>
              <div className={`flex flex-col gap-1 ${message.authorUser.name.includes(author.name) ? 'items-end' : 'items-start'}`}>
                <p className={`text-slate-300 font-roboto text-sm ${message.authorUser.name.includes(author.name) ? 'text-right' : 'text-left'}`}>{message.content}</p>
                <p className={`text-slate-400 font-roboto text-xs ${message.authorUser.name.includes(author.name) ? 'text-right' : 'text-left'}`}>{message.authorUser.name.includes(author.name) ? 'Você' : userSelected.name[0].toUpperCase() + userSelected.name.slice(1, userSelected.name.length)} {' - ' + dayjs(message.createdAt).format('MMMM D, YYYY h:mm A')}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='absolute bottom-0 w-full'>
          <TextField onChange={handleChange} value={text} onKeyDown={handleKeyDown} multiline fullWidth variant='filled' placeholder='Digite sua mensagem' />
        </div>
      </div>
    </div>
  )
}

export default Chat