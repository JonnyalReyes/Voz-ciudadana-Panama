"use client"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Textarea } from "../../components/ui/textarea"
import { Switch } from "../../components/ui/switch"
import Link from "next/link"
import { User, Bell, Shield, FileText } from "lucide-react"
import PageHeader from "../../components/page-header"
import UserParticipationHistory from "../../components/user-participation-history"

export default function PerfilPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="Mi Perfil" description="Gestiona tu cuenta y revisa tu historial de participación." />

      <section className="py-8 md:py-12 bg-white">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="perfil" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Perfil</span>
              </TabsTrigger>
              <TabsTrigger value="participacion" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Participación</span>
              </TabsTrigger>
              <TabsTrigger value="notificaciones" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notificaciones</span>
              </TabsTrigger>
              <TabsTrigger value="privacidad" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacidad</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="perfil" className="py-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Información personal</CardTitle>
                    <CardDescription>Actualiza tu información de perfil.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center space-y-3 mb-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="@usuario" />
                        <AvatarFallback>JP</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Cambiar foto
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" defaultValue="Juan" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input id="apellido" defaultValue="Pérez" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" defaultValue="juan.perez@ejemplo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provincia">Provincia</Label>
                      <Input id="provincia" defaultValue="Panamá" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografía (opcional)</Label>
                      <Textarea id="bio" placeholder="Cuéntanos un poco sobre ti..." />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Guardar cambios</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Áreas de interés</CardTitle>
                    <CardDescription>Selecciona las categorías de problemáticas que te interesan.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <Badge className="cursor-pointer">Educación</Badge>
                      <Badge className="cursor-pointer">Salud</Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Medio Ambiente
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">
                        Economía
                      </Badge>
                      <Badge className="cursor-pointer">Infraestructura</Badge>
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

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Estadísticas de participación</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <p className="text-sm text-gray-500">Problemáticas</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <p className="text-sm text-gray-500">Opiniones</p>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <p className="text-sm text-gray-500">Propuestas</p>
                          <p className="text-2xl font-bold">8</p>
                        </div>
                        <div className="bg-primary/5 p-4 rounded-lg">
                          <p className="text-sm text-gray-500">Comentarios</p>
                          <p className="text-2xl font-bold">36</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="participacion" className="py-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de participación</CardTitle>
                  <CardDescription>Revisa tu actividad en la plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserParticipationHistory />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notificaciones" className="py-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de notificaciones</CardTitle>
                  <CardDescription>Configura cómo y cuándo quieres recibir notificaciones.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notificaciones por correo electrónico</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-nuevas-problematicas">Nuevas problemáticas</Label>
                          <p className="text-sm text-gray-500">
                            Recibe un correo cuando se publique una nueva problemática.
                          </p>
                        </div>
                        <Switch id="email-nuevas-problematicas" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-respuestas">Respuestas a tus comentarios</Label>
                          <p className="text-sm text-gray-500">
                            Recibe un correo cuando alguien responda a tus comentarios.
                          </p>
                        </div>
                        <Switch id="email-respuestas" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-resultados">Publicación de resultados</Label>
                          <p className="text-sm text-gray-500">
                            Recibe un correo cuando se publiquen los resultados de una problemática en la que
                            participaste.
                          </p>
                        </div>
                        <Switch id="email-resultados" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-boletin">Boletín informativo</Label>
                          <p className="text-sm text-gray-500">
                            Recibe un resumen periódico de la actividad en la plataforma.
                          </p>
                        </div>
                        <Switch id="email-boletin" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notificaciones en la plataforma</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="plataforma-respuestas">Respuestas a tus comentarios</Label>
                          <p className="text-sm text-gray-500">
                            Recibe una notificación cuando alguien responda a tus comentarios.
                          </p>
                        </div>
                        <Switch id="plataforma-respuestas" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="plataforma-menciones">Menciones</Label>
                          <p className="text-sm text-gray-500">
                            Recibe una notificación cuando alguien te mencione en un comentario.
                          </p>
                        </div>
                        <Switch id="plataforma-menciones" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="plataforma-actualizaciones">Actualizaciones de problemáticas</Label>
                          <p className="text-sm text-gray-500">
                            Recibe una notificación cuando haya actualizaciones en problemáticas que sigues.
                          </p>
                        </div>
                        <Switch id="plataforma-actualizaciones" defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Guardar preferencias</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacidad" className="py-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacidad y seguridad</CardTitle>
                  <CardDescription>Gestiona la privacidad de tu cuenta y la seguridad de tus datos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Cambiar contraseña</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Contraseña actual</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar nueva contraseña</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button className="mt-2">Actualizar contraseña</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Visibilidad del perfil</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="perfil-publico">Perfil público</Label>
                          <p className="text-sm text-gray-500">
                            Permite que otros usuarios vean tu perfil y actividad.
                          </p>
                        </div>
                        <Switch id="perfil-publico" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mostrar-nombre">Mostrar nombre completo</Label>
                          <p className="text-sm text-gray-500">Muestra tu nombre completo en lugar de un pseudónimo.</p>
                        </div>
                        <Switch id="mostrar-nombre" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mostrar-provincia">Mostrar provincia</Label>
                          <p className="text-sm text-gray-500">Muestra tu provincia en tu perfil público.</p>
                        </div>
                        <Switch id="mostrar-provincia" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Datos personales</h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500">
                        De acuerdo con la Ley 81 de Protección de Datos Personales de Panamá, tienes derecho a acceder,
                        rectificar, cancelar y oponerte al tratamiento de tus datos personales.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          Descargar mis datos
                        </Button>
                        <Button variant="outline" size="sm">
                          Solicitar eliminación de cuenta
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Para más información, consulta nuestra{" "}
                        <Link href="/privacidad" className="text-primary hover:underline">
                          Política de Privacidad
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
