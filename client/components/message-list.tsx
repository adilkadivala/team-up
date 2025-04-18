import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MessageListProps {
  conversations: {
    id: string
    name: string
    avatar?: string
    lastMessage: string
    time: string
    unread: boolean
  }[]
  activeId?: string
}

export function MessageList({ conversations, activeId }: MessageListProps) {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/dashboard/messages/${conversation.id}`}
          className={cn(
            "flex items-center gap-3 rounded-lg p-3 text-sm transition-colors hover:bg-accent",
            activeId === conversation.id && "bg-accent",
            conversation.unread && "font-medium",
          )}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <div className="font-medium">{conversation.name}</div>
            <div className="text-xs text-muted-foreground line-clamp-1">{conversation.lastMessage}</div>
          </div>
          <div className="ml-auto text-xs text-muted-foreground">{conversation.time}</div>
          {conversation.unread && <div className="ml-1 h-2 w-2 rounded-full bg-primary"></div>}
        </Link>
      ))}
    </div>
  )
}
