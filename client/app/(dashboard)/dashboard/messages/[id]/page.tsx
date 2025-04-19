"use client";

import type React from "react";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageList } from "@/components/message-list";
import { Send } from "lucide-react";

// Mock data
const conversations = [
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

const messageHistory = {
  "1": [
    {
      id: 1,
      sender: "Alex Johnson",
      content:
        "Hey, I saw your profile and I'm interested in teaming up for the Global AI Hackathon.",
      timestamp: "10:30 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "Me",
      content:
        "Hi Alex! Thanks for reaching out. I'd be interested in teaming up. What skills are you bringing to the table?",
      timestamp: "10:35 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Alex Johnson",
      content:
        "I'm a frontend developer with experience in React and TypeScript. I've also worked with TensorFlow.js for some client-side ML applications.",
      timestamp: "10:38 AM",
      isMe: false,
    },
    {
      id: 4,
      sender: "Me",
      content:
        "That sounds great! I'm more focused on backend and ML model development. I think we could complement each other well.",
      timestamp: "10:40 AM",
      isMe: true,
    },
    {
      id: 5,
      sender: "Alex Johnson",
      content:
        "Perfect! Do you have any specific ideas for the hackathon project?",
      timestamp: "10:42 AM",
      isMe: false,
    },
  ],
};

export default function ConversationPage({
  params,
}: {
  params: { id: string };
}) {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(
    messageHistory[params.id as keyof typeof messageHistory] || []
  );

  const conversation =
    conversations.find((c) => c.id === params.id) || conversations[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: "Me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

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
          <MessageList conversations={conversations} activeId={params.id} />
        </div>

        <div className="flex flex-col h-[600px]">
          <div className="flex items-center p-4 border-b">
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage
                src={conversation.avatar || "/user.svg"}
                alt={conversation.name}
              />
              <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-medium">{conversation.name}</h2>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isMe ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isMe
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isMe
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
