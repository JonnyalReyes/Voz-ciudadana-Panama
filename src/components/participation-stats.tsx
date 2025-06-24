import { Card, CardContent } from "../components/ui/card"
import { Users, FileText, MessageSquare, TrendingUp } from "lucide-react"

export default function ParticipationStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Users className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-3xl font-bold">1,250+</h3>
          <p className="text-gray-500">Ciudadanos verificados</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <FileText className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-3xl font-bold">2,847</h3>
          <p className="text-gray-500">Opiniones registradas</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <MessageSquare className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-3xl font-bold">456</h3>
          <p className="text-gray-500">Propuestas ciudadanas</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <TrendingUp className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-3xl font-bold">95%</h3>
          <p className="text-gray-500">Satisfacción del proceso</p>
        </CardContent>
      </Card>
    </div>
  )
}
