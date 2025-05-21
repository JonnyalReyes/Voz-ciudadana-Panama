import { Card, CardContent } from "../components/ui/card"
import { Users, FileText, MessageSquare, CheckCircle } from "lucide-react"

export default function ParticipationStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Users className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-3xl font-bold">50,000+</h3>
          <p className="text-gray-500">Ciudadanos registrados</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <FileText className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-3xl font-bold">25+</h3>
          <p className="text-gray-500">Problemáticas abordadas</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <MessageSquare className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-3xl font-bold">28,000+</h3>
          <p className="text-gray-500">Propuestas recibidas</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <CheckCircle className="h-12 w-12 mb-4 text-primary" />
          <h3 className="text-3xl font-bold">12</h3>
          <p className="text-gray-500">Soluciones implementadas</p>
        </CardContent>
      </Card>
    </div>
  )
}
