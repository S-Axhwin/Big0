"use client"
import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, MessageCircle, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import axios from "axios"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [message, setMessage] = useState('');
  const handleSendMessage = (message: string) => {
    setChatMessages([...chatMessages, { role: 'user', content: message }]);
    axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${"AIzaSyCpTLsYBwjyKEBsOEuvH4b8-MBkOgySBIA"}`, {
      contents: [{ 
        parts: [{ text:"you are a career coach and you are here to help the user with their career path. you are not a therapist or a doctor. you are not here to give advice on anything else than career path. dont give any advice on anything else than career path. dont give any advice on anything else than career path. "+ message, }]
      }]
    }).then((response) => {
    
      console.log(response.data.candidates[0].content.parts[0].text);
      setChatMessages([...chatMessages,{ role: 'user', content: message }, { role: 'assistant', content: response.data.candidates[0].content.parts[0].text }]);
      
    });
    setMessage('');
  };

  return (
    <div className="min-h-screen flex flex-col w-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-4">
                  <Link href="/" className="text-lg font-semibold">
                    Home
                  </Link>
                  <Link href="/explore" className="text-lg">
                    Explore
                  </Link>
                  <Link href="/protected/profile" className="text-lg">
                    Profile
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="text-xl font-bold">
              CareerPath
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/explore" className="text-sm font-medium hover:text-primary">
                Explore
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 z-50 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href="/protected/profile">
              <Avatar className="hover:ring-2 hover:ring-primary transition-all">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Link>
          </div>
            <Button  onClick={() => setChatVisible(!chatVisible)} variant="default" className="fixed bottom-6 left-6 z-100">
              <MessageCircle/>
            </Button>
        </div>
      </header>
      <main className="flex-1">
        {children}
        {chatVisible && (
          <div className="fixed bottom-20 h-2/3 left-6 w-80 bg-white shadow-lg rounded-lg flex flex-col">
            <div className="p-4 flex flex-col h-full">
              <div className="flex-1 overflow-y-auto">
                <div className="mb-2 text-left">Hi there!</div>
                <div className="mb-2 text-right">How can I help you?</div>
                {chatMessages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-2 p-2 rounded-lg ${message.role === 'user' ? 'text-right bg-primary/10' : 'text-left bg-muted/10'}`}
                  >
                    {message.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-1">
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
              <div className="border-t mt-2 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border rounded-md"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button onClick={() => handleSendMessage(message)} variant="default">Send</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2024 CareerPath. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
