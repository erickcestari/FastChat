import { User } from "@/types/userTypes"
import { Avatar, Divider } from "@mui/material"

interface RenderUserProps {
  user: User
  isUserSelected: boolean
  handleSelectUser: (user: User) => void
}

const RenderUser = (props: RenderUserProps) => {
  const { user, isUserSelected, handleSelectUser} = props
  return (
    <div onClick={() => handleSelectUser(user)} className={`${isUserSelected ? 'bg-slate-700' : 'bg-slate-800'}`}>
      <Divider sx={{ color: '#fff', width: '100%' }} />
      <div className={`flex items-center px-3 py-4 text-slate-300 cursor-pointer gap-2`}>
        <Avatar  sx={{ width: 28, height: 28, fontSize:'15px', background: `linear-gradient(to right bottom, #${user.id.slice(0, 6)}, #${user.id.slice(user.id.length - 7, user.id.length - 1)})`}}>{user.name.slice(0, 2).toUpperCase()}</Avatar>
        <h1 className='font-roboto font-normal text-base'>{user.name.toUpperCase()}</h1>
      </div>
    </div>
  )
}

export default RenderUser