"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Textarea } from "../components/ui/textarea"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ThumbsUp, MessageSquare, Flag, Send } from "lucide-react"

export default function DiscussionForum() {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false)
      setNewComment("")
    }, 1000)
  }

  // Datos de ejemplo para los comentarios
  const comments = [
    {
      id: "1",
      user: {
        name: "María González",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MG",
      },
      content:
        "Considero que uno de los principales problemas es la falta de capacitación continua para los docentes. Muchos maestros no tienen acceso a programas de actualización, especialmente en zonas rurales. Deberíamos implementar un sistema de formación continua que sea accesible para todos los educadores, independientemente de su ubicación geográfica.",
      date: "Hace 2 días",
      likes: 24,
      replies: 3,
      isProposal: true,
    },
    {
      id: "2",
      user: {
        name: "Carlos Mendoza",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "CM",
      },
      content:
        "Estoy de acuerdo con María. Además, creo que debemos mejorar la infraestructura tecnológica en las escuelas. Durante la pandemia quedó claro que muchas instituciones no estaban preparadas para la educación virtual. Necesitamos garantizar que todas las escuelas tengan acceso a internet y dispositivos adecuados.",
      date: "Hace 1 día",
      likes: 18,
      replies: 2,
      isProposal: false,
    },
    {
      id: "3",
      user: {
        name: "Ana Castillo",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AC",
      },
      content:
        "Propongo crear un programa nacional de mentorías donde docentes experimentados puedan guiar a los nuevos educadores durante sus primeros años de enseñanza. Esto podría mejorar significativamente la calidad de la educación y reducir la deserción de maestros noveles. El programa podría incluir observaciones de clase, retroalimentación constructiva y comunidades de aprendizaje profesional.",
      date: "Hace 12 horas",
      likes: 32,
      replies: 5,
      isProposal: true,
    },
    {
      id: "4",
      user: {
        name: "Roberto Díaz",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RD",
      },
      content:
        "No podemos olvidar la importancia de actualizar el currículo educativo. Muchos de los contenidos que se enseñan actualmente no preparan adecuadamente a los estudiantes para los desafíos del siglo XXI. Necesitamos enfocarnos más en habilidades como el pensamiento crítico, la resolución de problemas y la alfabetización digital.",
      date: "Hace 8 horas",
      likes: 15,
      replies: 1,
      isProposal: false,
    },
    {
      id: "5",
      user: {
        name: "Laura Pinzón",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "LP",
      },
      content:
        "Mi experiencia como docente en una escuela rural me ha mostrado que la desigualdad en el acceso a recursos educativos es enorme. Mientras algunas escuelas en la ciudad tienen laboratorios modernos, nosotros apenas contamos con materiales básicos. Propongo crear un fondo especial para equipar a las escuelas rurales y capacitar a sus docentes en el uso de recursos educativos digitales.",
      date: "Hace 4 horas",
      likes: 27,
      replies: 4,
      isProposal: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-primary/5 p-4 rounded-lg">
        <p className="text-sm">
          <span className="font-medium">Normas de la comunidad:</span> Este es un espacio para el diálogo constructivo.
          Por favor, mantén un tono respetuoso, fundamenta tus opiniones y evita comentarios ofensivos o
          discriminatorios. Los moderadores se reservan el derecho de eliminar contenido que viole estas normas.
        </p>
      </div>

      <Tabs defaultValue="todos" className="w-full">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="todos">Todos los comentarios</TabsTrigger>
          <TabsTrigger value="propuestas">Propuestas</TabsTrigger>
          <TabsTrigger value="destacados">Más destacados</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="mt-6">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Participa en la discusión</CardTitle>
              <CardDescription>
                Comparte tu opinión o propuesta sobre la mejora del sistema educativo panameño.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <Textarea
                  placeholder="Escribe tu comentario aquí..."
                  className="min-h-[100px]"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                    Marcar como propuesta
                  </Badge>
                </div>
                <Button type="submit" className="gap-1" disabled={isSubmitting || !newComment.trim()}>
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Publicar comentario
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className={comment.isProposal ? "border-primary/20" : ""}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.user.name}</span>
                          {comment.isProposal && <Badge variant="secondary">Propuesta</Badge>}
                        </div>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm" className="gap-1 h-8">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{comment.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1 h-8">
                          <MessageSquare className="h-4 w-4" />
                          <span>{comment.replies}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1 h-8 ml-auto">
                          <Flag className="h-4 w-4" />
                          <span className="sr-only">Reportar</span>
                        </Button>
                      </div>

                      {/* Mostrar respuestas si hay alguna */}
                      {comment.replies > 0 && (
                        <Button variant="link" size="sm" className="px-0">
                          Ver {comment.replies} respuestas
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="propuestas" className="mt-6">
          <div className="space-y-4">
            {comments
              .filter((comment) => comment.isProposal)
              .map((comment) => (
                <Card key={comment.id} className="border-primary/20">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.user.name}</span>
                            <Badge variant="secondary">Propuesta</Badge>
                          </div>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm" className="gap-1 h-8">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{comment.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1 h-8">
                            <MessageSquare className="h-4 w-4" />
                            <span>{comment.replies}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1 h-8 ml-auto">
                            <Flag className="h-4 w-4" />
                            <span className="sr-only">Reportar</span>
                          </Button>
                        </div>

                        {/* Mostrar respuestas si hay alguna */}
                        {comment.replies > 0 && (
                          <Button variant="link" size="sm" className="px-0">
                            Ver {comment.replies} respuestas
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="destacados" className="mt-6">
          <div className="space-y-4">
            {comments
              .sort((a, b) => b.likes - a.likes)
              .slice(0, 3)
              .map((comment) => (
                <Card key={comment.id} className={comment.isProposal ? "border-primary/20" : ""}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.user.name}</span>
                            {comment.isProposal && <Badge variant="secondary">Propuesta</Badge>}
                          </div>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                        <div className="flex items-center gap-4 pt-2">
                          <Button variant="ghost" size="sm" className="gap-1 h-8">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{comment.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1 h-8">
                            <MessageSquare className="h-4 w-4" />
                            <span>{comment.replies}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1 h-8 ml-auto">
                            <Flag className="h-4 w-4" />
                            <span className="sr-only">Reportar</span>
                          </Button>
                        </div>

                        {/* Mostrar respuestas si hay alguna */}
                        {comment.replies > 0 && (
                          <Button variant="link" size="sm" className="px-0">
                            Ver {comment.replies} respuestas
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-8">
        <Button variant="outline">Cargar más comentarios</Button>
      </div>
    </div>
  )
}
