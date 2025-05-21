import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Search, Filter, ChevronRight } from "lucide-react"
import ProblematicasList from "../../components/problematicas-list"
import PageHeader from "../../components/page-header"

export default function ProblematicasPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Problemáticas Nacionales"
        description="Explora las problemáticas que afectan a Panamá y contribuye con tus ideas y propuestas."
      />

      <section className="py-8 md:py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Buscar problemáticas..." className="pl-8" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="recientes">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recientes">Más recientes</SelectItem>
                  <SelectItem value="participacion">Mayor participación</SelectItem>
                  <SelectItem value="alfabetico">Alfabéticamente</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filtrar</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Educación
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Salud
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Medio Ambiente
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Economía
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Infraestructura
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Seguridad
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Transparencia
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Derechos Humanos
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20 md:col-span-2">
              <CardHeader>
                <CardTitle>Estado de participación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Fase de información
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Recolección de opiniones
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    En discusión
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Análisis de resultados
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Resultados publicados
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <ProblematicasList />

          <div className="flex justify-center mt-8">
            <Button variant="outline" className="gap-1">
              Cargar más <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
