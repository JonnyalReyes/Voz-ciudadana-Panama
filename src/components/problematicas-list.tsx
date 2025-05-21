import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import Link from "next/link"
import { Users, MessageSquare, Calendar, ArrowRight } from "lucide-react"

export default function ProblematicasList() {
  // Datos de ejemplo para el listado de problemáticas
  const problematicas = [
    {
      id: "1",
      title: "Mejora del Sistema Educativo Panameño",
      description:
        "Análisis de los desafíos actuales y propuestas para fortalecer la calidad educativa en todos los niveles.",
      category: "Educación",
      phase: "Recolección de opiniones",
      date: "15 de mayo, 2025",
      endDate: "15 de junio, 2025",
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
      date: "10 de mayo, 2025",
      endDate: "10 de junio, 2025",
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
      date: "5 de mayo, 2025",
      endDate: "5 de junio, 2025",
      participants: 543,
      comments: 98,
    },
    {
      id: "4",
      title: "Fortalecimiento del Sistema de Salud",
      description:
        "Análisis de la situación actual del sistema de salud y propuestas para mejorar su cobertura, calidad y eficiencia.",
      category: "Salud",
      phase: "Recolección de opiniones",
      date: "1 de mayo, 2025",
      endDate: "1 de junio, 2025",
      participants: 932,
      comments: 187,
    },
    {
      id: "5",
      title: "Conservación de Ecosistemas Marinos",
      description: "Estrategias para la protección y uso sostenible de los recursos marinos y costeros de Panamá.",
      category: "Medio Ambiente",
      phase: "Análisis de resultados",
      date: "25 de abril, 2025",
      endDate: "25 de mayo, 2025",
      participants: 654,
      comments: 142,
    },
    {
      id: "6",
      title: "Seguridad Ciudadana y Prevención del Delito",
      description:
        "Evaluación de políticas actuales y propuestas para mejorar la seguridad ciudadana con enfoque preventivo.",
      category: "Seguridad",
      phase: "Resultados publicados",
      date: "20 de abril, 2025",
      endDate: "20 de mayo, 2025",
      participants: 1087,
      comments: 256,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-6">
      {problematicas.map((problematica) => (
        <Card key={problematica.id} className="overflow-hidden">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{problematica.category}</Badge>
                <Badge variant="outline">{problematica.phase}</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">{problematica.title}</h3>
              <p className="text-gray-500 mb-4">{problematica.description}</p>
              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Publicado: {problematica.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{problematica.participants} participantes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{problematica.comments} comentarios</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center p-6 bg-primary/5 border-t md:border-t-0 md:border-l">
              <p className="text-sm text-center mb-4">
                <span className="block font-medium">Cierre de participación:</span>
                <span className="text-gray-500">{problematica.endDate}</span>
              </p>
              <Button asChild className="w-full gap-1">
                <Link href={`/problematicas/${problematica.id}`}>
                  Participar <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
