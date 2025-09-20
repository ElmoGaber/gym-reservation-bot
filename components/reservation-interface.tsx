"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin } from "lucide-react"

interface GymClass {
  id: string
  name: string
  instructor: string
  time: string
  duration: string
  capacity: number
  booked: number
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  location: string
}

const mockClasses: GymClass[] = [
  {
    id: "1",
    name: "HIIT Training",
    instructor: "Sarah Johnson",
    time: "07:00",
    duration: "45 min",
    capacity: 20,
    booked: 15,
    difficulty: "Intermediate",
    location: "Studio A",
  },
  {
    id: "2",
    name: "Yoga Flow",
    instructor: "Mike Chen",
    time: "08:00",
    duration: "60 min",
    capacity: 15,
    booked: 8,
    difficulty: "Beginner",
    location: "Studio B",
  },
  {
    id: "3",
    name: "Strength Training",
    instructor: "Alex Rodriguez",
    time: "09:00",
    duration: "50 min",
    capacity: 12,
    booked: 10,
    difficulty: "Advanced",
    location: "Weight Room",
  },
  {
    id: "4",
    name: "Spin Class",
    instructor: "Emma Wilson",
    time: "18:00",
    duration: "45 min",
    capacity: 25,
    booked: 20,
    difficulty: "Intermediate",
    location: "Cycling Studio",
  },
  {
    id: "5",
    name: "Pilates",
    instructor: "Lisa Park",
    time: "19:00",
    duration: "55 min",
    capacity: 18,
    booked: 12,
    difficulty: "Beginner",
    location: "Studio C",
  },
]

export function ReservationInterface() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [selectedClass, setSelectedClass] = useState<string | null>(null)

  const handleReservation = (classId: string) => {
    setSelectedClass(classId)
    // Here you would typically make an API call to book the class
    console.log("[v0] Booking class:", classId)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getAvailabilityColor = (booked: number, capacity: number) => {
    const percentage = (booked / capacity) * 100
    if (percentage >= 90) return "text-red-600 dark:text-red-400"
    if (percentage >= 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-green-600 dark:text-green-400"
  }

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date
          </CardTitle>
          <CardDescription>Choose the date for your workout session</CardDescription>
        </CardHeader>
        <CardContent>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            min={new Date().toISOString().split("T")[0]}
          />
        </CardContent>
      </Card>

      {/* Available Classes */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">Available Classes</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockClasses.map((gymClass) => (
            <Card key={gymClass.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{gymClass.name}</CardTitle>
                    <CardDescription className="text-sm">with {gymClass.instructor}</CardDescription>
                  </div>
                  <Badge className={getDifficultyColor(gymClass.difficulty)}>{gymClass.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {gymClass.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {gymClass.duration}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{gymClass.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className={getAvailabilityColor(gymClass.booked, gymClass.capacity)}>
                      {gymClass.capacity - gymClass.booked} spots left
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {gymClass.booked}/{gymClass.capacity}
                  </span>
                </div>

                <Button
                  className="w-full"
                  onClick={() => handleReservation(gymClass.id)}
                  disabled={gymClass.booked >= gymClass.capacity}
                >
                  {gymClass.booked >= gymClass.capacity ? "Fully Booked" : "Reserve Spot"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking Confirmation */}
      {selectedClass && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-200">Reservation Confirmed!</CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Your spot has been reserved. Check your email for confirmation details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={() => setSelectedClass(null)}
              className="border-green-300 text-green-800 hover:bg-green-100 dark:border-green-700 dark:text-green-200 dark:hover:bg-green-900"
            >
              Book Another Class
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
