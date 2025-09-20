"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

export function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">FitReserve</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Classes
            </Link>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Schedule
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Membership
            </a>
            {user?.role === "admin" && (
              <Link href="/admin" className="text-foreground hover:text-primary transition-colors">
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {user.firstName} {user.lastName}
                  </Badge>
                  {user.role === "admin" && (
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Admin</Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
