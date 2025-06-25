// src/components/featured-problematicas.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import Link from "next/link"
import { Users, MessageSquare, ArrowRight } from "lucide-react"
import type { Problematica } from "@/src/lib/data" // Importamos nuestro tipo

// El componente ahora recibe las problemáticas como props
export default function FeaturedProblematicas({ problematicas }: { problematicas: Problematica[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {problematicas.map((problematica) => (
        <Card key={problematica.id} className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge>{problematica.category}</Badge>
              <Badge variant="outline">{problematica.status}</Badge>
            </div>
            <CardTitle className="text-xl">{problematica.title}</CardTitle>
            <CardDescription>{problematica.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{problematica.participants || 0} participantes</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{problematica.comments || 0} comentarios</span>
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

      {/* Puedes mantener este placeholder si quieres */}
      <Card className="flex flex-col h-full border-dashed border-2 border-gray-300">
        <CardContent className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-gray-500 mb-2">Más Próximamente</p>
            <p className="text-sm text-gray-400">Nuevas problemáticas serán añadidas.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}