"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "member" | "admin"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("fitreserve_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication logic
    const mockUser: User = {
      id: "1",
      email,
      firstName: "John",
      lastName: "Doe",
      role: email.includes("admin") ? "admin" : "member",
    }

    setUser(mockUser)
    localStorage.setItem("fitreserve_user", JSON.stringify(mockUser))
  }

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // Mock registration logic
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      role: "member",
    }

    setUser(mockUser)
    localStorage.setItem("fitreserve_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("fitreserve_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
