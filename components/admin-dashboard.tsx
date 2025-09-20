"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, TrendingUp, Clock, Plus, Edit, Eye, CheckCircle, XCircle } from "lucide-react"

interface Booking {
  id: string
  memberName: string
  memberEmail: string
  className: string
  date: string
  time: string
  status: "confirmed" | "cancelled" | "pending"
}

interface ClassStats {
  totalClasses: number
  totalBookings: number
  activeMembers: number
  todayBookings: number
}

const mockBookings: Booking[] = [
  {
    id: "1",
    memberName: "John Smith",
    memberEmail: "john@example.com",
    className: "HIIT Training",
    date: "2024-01-15",
    time: "07:00",
    status: "confirmed",
  },
  {
    id: "2",
    memberName: "Sarah Johnson",
    memberEmail: "sarah@example.com",
    className: "Yoga Flow",
    date: "2024-01-15",
    time: "08:00",
    status: "confirmed",
  },
  {
    id: "3",
    memberName: "Mike Chen",
    memberEmail: "mike@example.com",
    className: "Spin Class",
    date: "2024-01-15",
    time: "18:00",
    status: "pending",
  },
  {
    id: "4",
    memberName: "Emma Wilson",
    memberEmail: "emma@example.com",
    className: "Pilates",
    date: "2024-01-15",
    time: "19:00",
    status: "cancelled",
  },
]

const mockStats: ClassStats = {
  totalClasses: 25,
  totalBookings: 156,
  activeMembers: 89,
  todayBookings: 23,
}

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)

  const handleStatusChange = (bookingId: string, newStatus: "confirmed" | "cancelled") => {
    setBookings((prev) =>
      prev.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)),
    )
    console.log("[v0] Updated booking status:", bookingId, newStatus)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground">Manage your gym reservations and classes</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Class
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeMembers}</div>
            <p className="text-xs text-muted-foreground">+5 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Bookings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.todayBookings}</div>
            <p className="text-xs text-muted-foreground">3 pending approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
          <TabsTrigger value="classes">Manage Classes</TabsTrigger>
          <TabsTrigger value="members">Manage Members</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>View and manage member reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{booking.memberName}</h4>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.memberEmail}</p>
                      <p className="text-sm">
                        <span className="font-medium">{booking.className}</span> • {booking.date} at {booking.time}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {booking.status === "pending" && (
                        <>
                          <Button variant="ghost" size="sm" onClick={() => handleStatusChange(booking.id, "confirmed")}>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleStatusChange(booking.id, "cancelled")}>
                            <XCircle className="w-4 h-4 text-red-600" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Management</CardTitle>
              <CardDescription>Add, edit, or remove gym classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Class Management</h3>
                <p className="text-muted-foreground mb-4">Create and manage your gym class schedule</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Class
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Management</CardTitle>
              <CardDescription>View and manage gym members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Member Directory</h3>
                <p className="text-muted-foreground mb-4">Manage member profiles and memberships</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
