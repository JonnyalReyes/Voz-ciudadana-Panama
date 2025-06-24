import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Progress } from "../../../components/ui/progress"
import { FileText, MessageSquare, BarChart3, Users, Clock, Calendar, Share2 } from "lucide-react"
import ProblematicaContent from "../../../components/problematica-content"
import OpinionForm from "../../../components/opinion-form"
import DiscussionForum from "../../../components/discussion-forum"
import ResultsVisualization from "../../../components/results-visualization"

export default function ProblematicaDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>Seguridad Social</Badge>
                <Badge variant="outline">Recolección de opiniones</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Reforma de la Caja del Seguro Social - Ley 462
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed max-w-[700px]">
                Análisis de la ley 462 para la reforma de la Caja del Seguro Social.
              </p>
              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Publicado: 15 de mayo, 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Cierre de opiniones: 15 de junio, 2025</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:w-64">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Progreso de participación</p>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium">1,245</p>
                        <p className="text-gray-500">Opiniones</p>
                      </div>
                      <div>
                        <p className="font-medium">324</p>
                        <p className="text-gray-500">Propuestas</p>
                      </div>
                      <div>
                        <p className="font-medium">89</p>
                        <p className="text-gray-500">Días restantes</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col gap-2">
                <Button>Participar ahora</Button>
                <Button variant="outline" className="gap-1">
                  <Share2 className="h-4 w-4" /> Compartir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="informacion" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="informacion" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Información</span>
              </TabsTrigger>
              <TabsTrigger value="opinar" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Opinar</span>
              </TabsTrigger>
              <TabsTrigger value="discusion" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Discusión</span>
              </TabsTrigger>
              <TabsTrigger value="resultados" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Resultados</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="informacion" className="py-6">
              <ProblematicaContent />
            </TabsContent>
            <TabsContent value="opinar" className="py-6">
              <OpinionForm />
            </TabsContent>
            <TabsContent value="discusion" className="py-6">
              <DiscussionForum />
            </TabsContent>
            <TabsContent value="resultados" className="py-6">
              <ResultsVisualization />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
