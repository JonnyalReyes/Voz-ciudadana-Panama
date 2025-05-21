import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import Link from "next/link"
import { MessageSquare, FileText, ThumbsUp, ArrowRight } from "lucide-react"

export default function UserParticipationHistory() {
  // Datos de ejemplo para el historial de participación
  const participationHistory = [
    {
      id: "1",
      type: "opinion",
      problematica: {
        id: "1",
        title: "Mejora del Sistema Educativo Panameño",
      },
      date: "15 de mayo, 2025",
      status: "Enviada",
    },
    {
      id: "2",
      type: "propuesta",
      problematica: {
        id: "1",
        title: "Mejora del Sistema Educativo Panameño",
      },
      date: "15 de mayo, 2025",
      status: "Destacada",
    },
    {
      id: "3",
      type: "comentario",
      problematica: {
        id: "2",
        title: "Acceso al Agua Potable en Zonas Rurales",
      },
      date: "10 de mayo, 2025",
      status: "Publicado",
    },
    {
      id: "4",
      type: "opinion",
      problematica: {
        id: "3",
        title: "Transparencia en la Gestión Pública",
      },
      date: "5 de mayo, 2025",
      status: "Enviada",
    },
    {
      id: "5",
      type: "propuesta",
      problematica: {
        id: "4",
        title: "Fortalecimiento del Sistema de Salud",
      },
      date: "1 de mayo, 2025",
      status: "En revisión",
    },
  ]

  // Función para obtener el icono según el tipo de participación
  const getIcon = (type: string) => {
    switch (type) {
      case "opinion":
        return <FileText className="h-5 w-5 text-primary" />
      case "propuesta":
        return <ThumbsUp className="h-5 w-5 text-primary" />
      case "comentario":
        return <MessageSquare className="h-5 w-5 text-primary" />
      default:
        return <FileText className="h-5 w-5 text-primary" />
    }
  }

  // Función para obtener la etiqueta según el tipo de participación
  const getLabel = (type: string) => {
    switch (type) {
      case "opinion":
        return "Opinión"
      case "propuesta":
        return "Propuesta"
      case "comentario":
        return "Comentario"
      default:
        return type
    }
  }

  // Función para obtener la variante de la etiqueta según el estado
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Destacada":
        return "default"
      case "En revisión":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {participationHistory.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Aún no has participado en ninguna problemática.</p>
          <Button asChild>
            <Link href="/problematicas">Explorar problemáticas</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {participationHistory.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">{getIcon(item.type)}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-1">
                    <Badge variant="secondary">{getLabel(item.type)}</Badge>
                    <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                  </div>
                  <h3 className="font-medium">{item.problematica.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">Fecha: {item.date}</p>
                </div>
                <Button variant="ghost" size="sm" asChild className="mt-1">
                  <Link href={`/problematicas/${item.problematica.id}`}>
                    <ArrowRight className="h-4 w-4" />
                    <span className="sr-only">Ver detalles</span>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
