import { ReservationInterface } from "@/components/reservation-interface"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Reserve Your Workout</h1>
            <p className="text-lg text-muted-foreground">
              Book your spot in our premium fitness classes and training sessions
            </p>
          </div>
          <ReservationInterface />
        </div>
      </main>
    </div>
  )
}
