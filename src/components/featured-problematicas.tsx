import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import Link from "next/link"
import { Users, MessageSquare, ArrowRight } from "lucide-react"

export default function FeaturedProblematicas() {
  // Solo la problemática de la CSS como ejemplo
  const problematicas = [
    {
      id: "1",
      title: "Reforma de la Caja del Seguro Social - Ley 462",
      description:
        "Análisis de la controvertida Ley 462 y sus implicaciones para los trabajadores y pensionados panameños.",
      category: "Seguridad Social",
      phase: "Recolección de opiniones",
      participants: 2847,
      comments: 456,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {problematicas.map((problematica) => (
        <Card key={problematica.id} className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge>{problematica.category}</Badge>
              <Badge variant="outline">{problematica.phase}</Badge>
            </div>
            <CardTitle className="text-xl">{problematica.title}</CardTitle>
            <CardDescription>{problematica.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{problematica.participants} participantes</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{problematica.comments} comentarios</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full gap-1">
              <Link href={`/problematicas/${problematica.id}`}>
                Participar <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Placeholder para futuras problemáticas */}
      <Card className="flex flex-col h-full border-dashed border-2 border-gray-300">
        <CardContent className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Próximamente</p>
            <p className="text-sm text-gray-400">Nuevas problemáticas serán agregadas por los administradores</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
