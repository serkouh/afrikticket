import { IconUser } from '@tabler/icons-react'

interface DefaultAvatarProps {
  className?: string
}

const DefaultAvatar = ({ className = "h-10 w-10" }: DefaultAvatarProps) => {
  return (
    <div className={`flex items-center justify-center rounded-full bg-neutral-100 ${className}`}>
      <IconUser className="h-1/2 w-1/2 text-neutral-500" />
    </div>
  )
}

export default DefaultAvatar 