"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Alert, AlertDescription } from "../../components/ui/alert"
import Link from "next/link"
import { Eye, EyeOff, Upload, AlertCircle, Shield } from "lucide-react"
import PageHeader from "../../components/page-header"

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setSelectedFile(file)
    } else {
      alert("Por favor, selecciona un archivo PDF válido")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <PageHeader
          title="Solicitud Enviada"
          description="Tu solicitud de verificación ha sido recibida y está siendo procesada."
        />
        <section className="py-8 md:py-12 bg-white">
          <div className="container px-4 md:px-6 max-w-2xl">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Solicitud Recibida</CardTitle>
                <CardDescription>
                  Hemos recibido tu solicitud de verificación para participar en Habla Panamá.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Próximos pasos:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Nuestro equipo revisará tu documentación en un plazo de 3-5 días hábiles</li>
                      <li>Verificaremos tus antecedentes penales y evaluaremos tu solicitud</li>
                      <li>Recibirás una notificación por correo electrónico con el resultado</li>
                      <li>Si es aprobada, podrás acceder a todas las funcionalidades de la plataforma</li>
                    </ul>
                  </AlertDescription>
                </Alert>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Criterios de evaluación:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Antecedentes penales limpios</li>
                    <li>• Documentación completa y verificable</li>
                    <li>• Compromiso con el diálogo constructivo</li>
                    <li>• Residencia en Panamá</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild>
                  <Link href="/">Volver al inicio</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Solicitud de Verificación"
        description="Completa el proceso de verificación para participar en el diálogo ciudadano de Habla Panamá."
      />

      <section className="py-8 md:py-12 bg-white">
        <div className="container px-4 md:px-6 max-w-2xl">
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>Proceso de verificación:</strong> Para garantizar un diálogo responsable, todos los participantes
              deben completar un proceso de verificación que incluye la revisión de antecedentes penales y documentación
              personal.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Proporciona tu información personal para el proceso de verificación.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo *</Label>
                    <Input id="nombre" placeholder="Tu nombre completo" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellidos *</Label>
                    <Input id="apellido" placeholder="Tus apellidos" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cedula">Número de cédula *</Label>
                  <Input id="cedula" placeholder="X-XXX-XXXX" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico *</Label>
                  <Input id="email" type="email" placeholder="tu@ejemplo.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Número de teléfono *</Label>
                  <Input id="telefono" placeholder="+507 XXXX-XXXX" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crea una contraseña segura"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fecha-nacimiento">Fecha de nacimiento *</Label>
                  <Input id="fecha-nacimiento" type="date" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provincia">Provincia de residencia *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu provincia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="panama">Panamá</SelectItem>
                      <SelectItem value="colon">Colón</SelectItem>
                      <SelectItem value="cocle">Coclé</SelectItem>
                      <SelectItem value="chiriqui">Chiriquí</SelectItem>
                      <SelectItem value="herrera">Herrera</SelectItem>
                      <SelectItem value="los-santos">Los Santos</SelectItem>
                      <SelectItem value="veraguas">Veraguas</SelectItem>
                      <SelectItem value="darien">Darién</SelectItem>
                      <SelectItem value="panama-oeste">Panamá Oeste</SelectItem>
                      <SelectItem value="guna-yala">Guna Yala</SelectItem>
                      <SelectItem value="embera-wounaan">Emberá-Wounaan</SelectItem>
                      <SelectItem value="ngoble-bugle">Ngöble-Buglé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección completa *</Label>
                  <Textarea id="direccion" placeholder="Ingresa tu dirección completa de residencia" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ocupacion">Ocupación *</Label>
                  <Input id="ocupacion" placeholder="Tu ocupación actual" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nivel-educativo">Nivel educativo *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu nivel educativo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primaria">Primaria</SelectItem>
                      <SelectItem value="secundaria">Secundaria</SelectItem>
                      <SelectItem value="tecnico">Técnico</SelectItem>
                      <SelectItem value="universitario">Universitario</SelectItem>
                      <SelectItem value="postgrado">Postgrado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="antecedentes">Documento de antecedentes penales *</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Subir documento de antecedentes penales
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            PDF hasta 5MB. Debe ser emitido por el Órgano Judicial de Panamá.
                          </span>
                        </label>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".pdf"
                          className="sr-only"
                          onChange={handleFileChange}
                          required
                        />
                      </div>
                      {selectedFile && (
                        <div className="mt-2 text-sm text-green-600">Archivo seleccionado: {selectedFile.name}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivacion">Motivación para participar *</Label>
                  <Textarea
                    id="motivacion"
                    placeholder="Explica por qué quieres participar en Habla Panamá y cómo planeas contribuir al diálogo ciudadano..."
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
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

                  <div className="flex items-center space-x-2">
                    <Checkbox id="consent" required />
                    <Label htmlFor="consent" className="text-sm">
                      Autorizo la verificación de mis antecedentes penales y el procesamiento de mis datos personales
                      según la Ley 81 de Protección de Datos Personales
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="commitment" required />
                    <Label htmlFor="commitment" className="text-sm">
                      Me comprometo a participar de manera constructiva y respetuosa en los diálogos de la plataforma
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando solicitud..." : "Enviar solicitud de verificación"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
      </section>
    </div>
  )
}
