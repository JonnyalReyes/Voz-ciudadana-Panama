import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import Link from "next/link"
import { Users, MessageSquare, ArrowRight } from "lucide-react"

export default function FeaturedProblematicas() {
  // Datos de ejemplo para problemáticas destacadas
  const problematicas = [
    {
      id: "1",
      title: "Mejora del Sistema Educativo Panameño",
      description:
        "Análisis de los desafíos actuales y propuestas para fortalecer la calidad educativa en todos los niveles.",
      category: "Educación",
      phase: "Recolección de opiniones",
      participants: 1245,
      comments: 324,
    },
    {
      id: "2",
      title: "Acceso al Agua Potable en Zonas Rurales",
      description:
        "Evaluación de la situación actual y estrategias para garantizar el acceso equitativo al agua potable en todo el territorio nacional.",
      category: "Infraestructura",
      phase: "En discusión",
      participants: 876,
      comments: 215,
    },
    {
      id: "3",
      title: "Transparencia en la Gestión Pública",
      description:
        "Mecanismos para fortalecer la rendición de cuentas y prevenir la corrupción en las instituciones públicas.",
      category: "Transparencia",
      phase: "Fase de información",
      participants: 543,
      comments: 98,
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
    </div>
  )
}
