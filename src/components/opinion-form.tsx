"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Checkbox } from "../components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { AlertCircle, Save, Send } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

export default function OpinionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Resetear el estado de éxito después de 5 segundos
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {isSuccess && (
        <Alert className="bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">Enviado correctamente</AlertTitle>
          <AlertDescription className="text-green-600">
            Tu opinión ha sido registrada. ¡Gracias por contribuir a la búsqueda de soluciones!
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-primary/5 p-4 rounded-lg">
        <p className="text-sm">
          <span className="font-medium">Nota importante:</span> Tus opiniones y propuestas serán analizadas y podrían
          ser incluidas en el informe final de resultados de forma anónima. Toda la información personal se maneja de
          acuerdo con la Ley 81 de Protección de Datos Personales.
        </p>
      </div>

      <Tabs defaultValue="opinion" className="w-full">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="opinion">Opinión general</TabsTrigger>
          <TabsTrigger value="propuesta">Propuesta detallada</TabsTrigger>
        </TabsList>

        <TabsContent value="opinion" className="mt-6">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Tu opinión sobre el sistema educativo panameño</CardTitle>
                <CardDescription>
                  Comparte tu percepción general sobre la problemática y los factores que consideras más relevantes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Percepción general</h3>
                  <div className="space-y-3">
                    <Label>¿Cómo evalúas la calidad actual del sistema educativo panameño?</Label>
                    <RadioGroup defaultValue="regular">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="muy-deficiente" id="muy-deficiente" />
                        <Label htmlFor="muy-deficiente">Muy deficiente</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="deficiente" id="deficiente" />
                        <Label htmlFor="deficiente">Deficiente</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="regular" id="regular" />
                        <Label htmlFor="regular">Regular</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bueno" id="bueno" />
                        <Label htmlFor="bueno">Bueno</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="excelente" id="excelente" />
                        <Label htmlFor="excelente">Excelente</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Factores críticos</h3>
                  <div className="space-y-3">
                    <Label>
                      ¿Cuáles consideras que son los factores más críticos que afectan la calidad educativa? (Selecciona
                      hasta 3)
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="formacion-docente" />
                        <Label htmlFor="formacion-docente">Formación y capacitación docente</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="infraestructura" />
                        <Label htmlFor="infraestructura">Infraestructura y recursos educativos</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="curriculo" />
                        <Label htmlFor="curriculo">Currículo desactualizado</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="tecnologia" />
                        <Label htmlFor="tecnologia">Acceso a tecnología</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="gestion" />
                        <Label htmlFor="gestion">Gestión y administración educativa</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="financiamiento" />
                        <Label htmlFor="financiamiento">Financiamiento insuficiente</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="participacion-familia" />
                        <Label htmlFor="participacion-familia">Participación de las familias</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="desigualdad" />
                        <Label htmlFor="desigualdad">Desigualdad socioeconómica</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Prioridades</h3>
                  <div className="space-y-3">
                    <Label htmlFor="prioridad">
                      ¿Qué área consideras que debería ser prioritaria para mejorar el sistema educativo?
                    </Label>
                    <Select>
                      <SelectTrigger id="prioridad">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formacion-docente">Formación y condiciones laborales docentes</SelectItem>
                        <SelectItem value="infraestructura">Mejora de infraestructura escolar</SelectItem>
                        <SelectItem value="tecnologia">Incorporación de tecnologías educativas</SelectItem>
                        <SelectItem value="curriculo">Actualización curricular</SelectItem>
                        <SelectItem value="evaluacion">Sistemas de evaluación y seguimiento</SelectItem>
                        <SelectItem value="inclusion">Educación inclusiva y atención a la diversidad</SelectItem>
                        <SelectItem value="gestion">Reforma de la gestión educativa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Experiencia personal</h3>
                  <div className="space-y-3">
                    <Label htmlFor="experiencia">
                      Comparte brevemente tu experiencia personal con el sistema educativo panameño
                    </Label>
                    <Textarea
                      id="experiencia"
                      placeholder="Describe tu experiencia como estudiante, docente, padre/madre o ciudadano..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sugerencia general</h3>
                  <div className="space-y-3">
                    <Label htmlFor="sugerencia">
                      ¿Qué sugerencia general harías para mejorar el sistema educativo?
                    </Label>
                    <Textarea id="sugerencia" placeholder="Comparte tu sugerencia..." className="min-h-[100px]" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" className="gap-1">
                  <Save className="h-4 w-4" />
                  Guardar borrador
                </Button>
                <Button type="submit" className="gap-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar opinión
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="propuesta" className="mt-6">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Propuesta detallada de solución</CardTitle>
                <CardDescription>
                  Comparte una propuesta concreta para abordar algún aspecto específico de la problemática educativa.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo-propuesta">Título de la propuesta</Label>
                    <Input
                      id="titulo-propuesta"
                      placeholder="Ej: Programa de formación docente en competencias digitales"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area-propuesta">Área específica que aborda</Label>
                    <Select>
                      <SelectTrigger id="area-propuesta">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formacion-docente">Formación docente</SelectItem>
                        <SelectItem value="curriculo">Currículo y contenidos</SelectItem>
                        <SelectItem value="tecnologia">Tecnología educativa</SelectItem>
                        <SelectItem value="infraestructura">Infraestructura escolar</SelectItem>
                        <SelectItem value="gestion">Gestión y administración</SelectItem>
                        <SelectItem value="evaluacion">Evaluación y seguimiento</SelectItem>
                        <SelectItem value="inclusion">Inclusión y equidad</SelectItem>
                        <SelectItem value="financiamiento">Financiamiento</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problema-especifico">Problema específico que busca resolver</Label>
                    <Textarea
                      id="problema-especifico"
                      placeholder="Describe el problema concreto que tu propuesta busca abordar..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion-propuesta">Descripción detallada de la propuesta</Label>
                    <Textarea
                      id="descripcion-propuesta"
                      placeholder="Explica en qué consiste tu propuesta, cómo funcionaría y qué recursos requeriría..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="beneficios">Beneficios esperados</Label>
                    <Textarea
                      id="beneficios"
                      placeholder="¿Qué resultados positivos se obtendrían con la implementación de tu propuesta?"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="actores">Actores involucrados en la implementación</Label>
                    <Textarea
                      id="actores"
                      placeholder="¿Qué instituciones, organizaciones o grupos deberían participar en la implementación?"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tiempo-implementacion">Tiempo estimado de implementación</Label>
                    <Select>
                      <SelectTrigger id="tiempo-implementacion">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corto">Corto plazo (menos de 1 año)</SelectItem>
                        <SelectItem value="mediano">Mediano plazo (1-3 años)</SelectItem>
                        <SelectItem value="largo">Largo plazo (más de 3 años)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referencias">Referencias o ejemplos (opcional)</Label>
                    <Textarea
                      id="referencias"
                      placeholder="¿Conoces ejemplos similares implementados en otros países o regiones? Comparte referencias si las tienes."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" className="gap-1">
                  <Save className="h-4 w-4" />
                  Guardar borrador
                </Button>
                <Button type="submit" className="gap-1" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar propuesta
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}
