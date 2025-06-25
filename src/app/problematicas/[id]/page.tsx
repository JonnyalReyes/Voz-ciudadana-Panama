import { auth } from "../../../auth";
import { getProblematicaById, getQuestionsByProblematicaId, getSurveyParticipantCount } from "@/src/lib/data";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { FileText, MessageSquare, BarChart3, Users, Clock, Calendar, Share2 } from "lucide-react";
import ProblematicaContent from "../../../components/problematica-content";
import OpinionForm from "../../../components/opinion-form";
import DiscussionForum from "../../../components/discussion-forum";
import ResultsVisualization from "../../../components/results-visualization";
import Link from "next/link";
import { Progress } from "../../../components/ui/progress";


export default async function ProblematicaDetailPage({ params }: { params: { id: string } }) {
  
  // Obtenemos todos los datos necesarios en paralelo para mayor eficiencia
  const [problematica, questions, participantCount, session] = await Promise.all([
    getProblematicaById(params.id),
    getQuestionsByProblematicaId(params.id),
    getSurveyParticipantCount(params.id),
    auth()
  ]);

  // Si la problemática no se encuentra, nos detenemos y mostramos un mensaje.
  if (!problematica) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">Problemática no encontrada</h1>
        <p className="text-muted-foreground mt-2">La problemática que buscas no existe o fue eliminada.</p>
        <Button asChild className="mt-6">
            <Link href="/problematicas">Volver a la lista</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-12 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{problematica.category}</Badge>
                <Badge variant="outline">{problematica.status}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {problematica.title}
              </h1>
              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500 pt-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Publicado: {new Date(problematica.created_at).toLocaleDateString('es-PA')}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 md:w-72">
              <Card>
                <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">{participantCount} Ciudadanos</p>
                            <p className="text-xs text-muted-foreground">Han participado en la encuesta</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium">Fecha de Cierre</p>
                            <p className="text-xs text-muted-foreground">
                                {problematica.end_date ? new Date(problematica.end_date).toLocaleDateString('es-PA') : 'No definida'}
                            </p>
                        </div>
                    </div>
                </CardContent>
              </Card>
              <Button>Participar ahora</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="informacion" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-3xl mx-auto">
              <TabsTrigger value="informacion" className="flex items-center gap-1"><FileText className="h-4 w-4" /> <span className="hidden sm:inline">Información</span></TabsTrigger>
              <TabsTrigger value="opinar" className="flex items-center gap-1"><MessageSquare className="h-4 w-4" /> <span className="hidden sm:inline">Opinar</span></TabsTrigger>
              <TabsTrigger value="discusion" className="flex items-center gap-1" disabled={!problematica.allow_forum}><Users className="h-4 w-4" /> <span className="hidden sm:inline">Discusión</span></TabsTrigger>
              <TabsTrigger value="resultados" className="flex items-center gap-1" disabled={!problematica.show_results}><BarChart3 className="h-4 w-4" /> <span className="hidden sm:inline">Resultados</span></TabsTrigger>
            </TabsList>

            <TabsContent value="informacion" className="py-6">
              <ProblematicaContent problematica={problematica} />
            </TabsContent>
            
            <TabsContent value="opinar" className="py-6">
              <OpinionForm problematicaId={problematica.id} questions={questions} session={session} />
            </TabsContent>

            <TabsContent value="discusion" className="py-6">
              {problematica.allow_forum ? (
                <DiscussionForum problematicaId={problematica.id} session={session} />
              ) : (
                <div className="text-center py-10 text-muted-foreground">El foro de discusión no está habilitado para esta problemática.</div>
              )}
            </TabsContent>

            <TabsContent value="resultados" className="py-6">
              {problematica.show_results ? (
                <ResultsVisualization />
              ) : (
                <div className="text-center py-10 text-muted-foreground">Los resultados de esta problemática aún no son públicos.</div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}