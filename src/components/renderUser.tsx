import { User } from "@/types/userTypes"

interface RenderUserProps {
  user: User
}

const RenderUser = (props: RenderUserProps) => {
  const { user } = props
  return (
    <div>{user.id} - {user.name}</div>
  )
}

export default RenderUser