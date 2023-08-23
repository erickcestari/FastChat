import { User } from "@/types/userTypes"
import { Avatar } from "@mui/material"

interface RenderUserProps {
  user: User
}

const RenderUser = (props: RenderUserProps) => {
  const { user } = props
  return (
    <div className='bg-slate-900'>
      <div className='flex items-center gap-2'>
        <Avatar sx={{ bgcolor: `#${user.id.slice(user.id.length - 7, user.id.length - 1)}` }}>{user.name.slice(0, 2).toUpperCase()}</Avatar>
        <h1 className='font-roboto font-normal'>{user.name.toUpperCase()}</h1>
      </div>
    </div>
  )
}

export default RenderUser