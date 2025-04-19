import { MessageList } from "@/components/message-list";
import { MessageSquare } from "lucide-react";

// Mock data
interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "/user.svg",
    lastMessage:
      "Hey, I saw your profile and I'm interested in teaming up for the Global AI Hackathon.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "/user.svg",
    lastMessage:
      "I have experience with UI/UX design and would love to collaborate on your project.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    name: "Miguel Rodriguez",
    avatar: "/user.svg",
    lastMessage: "Thanks for the information. I'll get back to you soon.",
    time: "3h ago",
    unread: false,
  },
  {
    id: "4",
    name: "Priya Sharma",
    avatar: "/user.svg",
    lastMessage: "Let's connect to discuss the hackathon project further.",
    time: "1d ago",
    unread: false,
  },
  {
    id: "5",
    name: "David Kim",
    avatar: "/user.svg",
    lastMessage: "I'm looking forward to working with you on the ML challenge.",
    time: "2d ago",
    unread: false,
  },
];

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Connect with potential teammates and discuss hackathon projects.
        </p>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-6">
        <div className="md:border-r pr-0 md:pr-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Conversations</h2>
          </div>
          <MessageList conversations={conversations} />
        </div>

        <div className="flex items-center justify-center h-[400px]">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Select a conversation
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Choose a conversation from the list or start a new one by
              connecting with teammates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
