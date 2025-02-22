
import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Menu, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Link href="/protected/profile">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © 2024 CareerPath. All rights reserved.
            </div>
          </footer>
        </div>
  )
}

