"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import PageHeader from "../../components/page-header"

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Únete a Voz Ciudadana Panamá"
        description="Crea una cuenta para participar en la búsqueda de soluciones a los desafíos que enfrenta nuestro país."
      />

      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-md">
          <Tabs defaultValue="registro" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="registro">Registro</TabsTrigger>
              <TabsTrigger value="iniciar-sesion">Iniciar Sesión</TabsTrigger>
            </TabsList>
            <TabsContent value="registro" className="py-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crear una cuenta</CardTitle>
                  <CardDescription>Completa el formulario para registrarte en la plataforma.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" placeholder="Tu nombre" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellido">Apellido</Label>
                      <Input id="apellido" placeholder="Tu apellido" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crea una contraseña segura"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="provincia">Provincia</Label>
                    <Input id="provincia" placeholder="Tu provincia" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      Acepto los{" "}
                      <Link href="/terminos" className="text-primary hover:underline">
                        términos y condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacidad" className="text-primary hover:underline">
                        política de privacidad
                      </Link>
                    </Label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Crear cuenta</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="iniciar-sesion" className="py-6">
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar sesión</CardTitle>
                  <CardDescription>Ingresa tus credenciales para acceder a la plataforma.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Correo electrónico</Label>
                    <Input id="login-email" type="email" placeholder="tu@ejemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Contraseña</Label>
                      <Link href="/recuperar-contrasena" className="text-sm text-primary hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Tu contraseña"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Iniciar sesión</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
