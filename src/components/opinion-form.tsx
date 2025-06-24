"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Checkbox } from "../components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
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
          <AlertTitle className="text-green-600">Opinión registrada exitosamente</AlertTitle>
          <AlertDescription className="text-green-600">
            Gracias por compartir tu voz. Tu opinión contribuye al diálogo ciudadano sobre la Ley 462.
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-primary/5 p-4 rounded-lg">
        <p className="text-sm">
          <span className="font-medium">Tu voz importa:</span> Comparte tu experiencia y opinión sobre la Ley 462. Todas
          las respuestas son anónimas y serán incluidas en nuestros informes ciudadanos.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Tu opinión sobre la Ley 462 y la CSS</CardTitle>
            <CardDescription>
              Ayúdanos a documentar el impacto real de la Ley 462 en la vida de los panameños.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tu relación con la CSS</h3>
              <div className="space-y-3">
                <Label>¿Cuál es tu relación con la Caja del Seguro Social?</Label>
                <RadioGroup defaultValue="">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="asegurado-activo" id="asegurado-activo" />
                    <Label htmlFor="asegurado-activo">Asegurado activo (trabajador cotizante)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pensionado" id="pensionado" />
                    <Label htmlFor="pensionado">Pensionado/Jubilado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beneficiario" id="beneficiario" />
                    <Label htmlFor="beneficiario">Beneficiario (familiar de asegurado)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="empleador" id="empleador" />
                    <Label htmlFor="empleador">Empleador</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="otro" id="otro" />
                    <Label htmlFor="otro">Otro</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Conocimiento sobre la Ley 462</h3>
              <div className="space-y-3">
                <Label>¿Qué tanto conoces sobre la Ley 462 y sus cambios?</Label>
                <RadioGroup defaultValue="">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mucho" id="conoce-mucho" />
                    <Label htmlFor="conoce-mucho">Conozco mucho sobre la ley y sus implicaciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="algo" id="conoce-algo" />
                    <Label htmlFor="conoce-algo">Conozco algunos aspectos generales</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poco" id="conoce-poco" />
                    <Label htmlFor="conoce-poco">Conozco muy poco</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nada" id="conoce-nada" />
                    <Label htmlFor="conoce-nada">No conozco sobre la ley</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tu opinión sobre la aprobación de la Ley 462</h3>
              <div className="space-y-3">
                <Label>¿Qué opinas sobre la aprobación de la Ley 462?</Label>
                <RadioGroup defaultValue="">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="muy-acuerdo" id="aprobacion-muy-acuerdo" />
                    <Label htmlFor="aprobacion-muy-acuerdo">Estoy muy de acuerdo con la aprobación</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="acuerdo" id="aprobacion-acuerdo" />
                    <Label htmlFor="aprobacion-acuerdo">Estoy de acuerdo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="neutral" id="aprobacion-neutral" />
                    <Label htmlFor="aprobacion-neutral">Me es indiferente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="desacuerdo" id="aprobacion-desacuerdo" />
                    <Label htmlFor="aprobacion-desacuerdo">Estoy en desacuerdo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="muy-desacuerdo" id="aprobacion-muy-desacuerdo" />
                    <Label htmlFor="aprobacion-muy-desacuerdo">Estoy muy en desacuerdo</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Impacto del aumento de cotizaciones</h3>
              <div className="space-y-3">
                <Label>¿Cómo te afecta el aumento de cotizaciones al 12.25%?</Label>
                <RadioGroup defaultValue="">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-afecta" id="cotiz-no-afecta" />
                    <Label htmlFor="cotiz-no-afecta">No me afecta significativamente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="afecta-poco" id="cotiz-afecta-poco" />
                    <Label htmlFor="cotiz-afecta-poco">Me afecta un poco</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="afecta-mucho" id="cotiz-afecta-mucho" />
                    <Label htmlFor="cotiz-afecta-mucho">Me afecta mucho</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="afecta-gravemente" id="cotiz-afecta-gravemente" />
                    <Label htmlFor="cotiz-afecta-gravemente">Me afecta gravemente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no-aplica" id="cotiz-no-aplica" />
                    <Label htmlFor="cotiz-no-aplica">No me aplica</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Calidad de servicios de la CSS</h3>
              <div className="space-y-3">
                <Label>¿Cómo calificarías los servicios actuales de la CSS?</Label>
                <RadioGroup defaultValue="">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excelente" id="servicios-excelente" />
                    <Label htmlFor="servicios-excelente">Excelente</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buena" id="servicios-buena" />
                    <Label htmlFor="servicios-buena">Buena</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="servicios-regular" />
                    <Label htmlFor="servicios-regular">Regular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mala" id="servicios-mala" />
                    <Label htmlFor="servicios-mala">Mala</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="muy-mala" id="servicios-muy-mala" />
                    <Label htmlFor="servicios-muy-mala">Muy mala</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Principales preocupaciones</h3>
              <div className="space-y-3">
                <Label>¿Cuáles son tus principales preocupaciones sobre la Ley 462? (Selecciona hasta 3)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="aumento-cotizaciones" />
                    <Label htmlFor="aumento-cotizaciones">Aumento de cotizaciones</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="edad-jubilacion" />
                    <Label htmlFor="edad-jubilacion">Cambios en edad de jubilación</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="calidad-servicios" />
                    <Label htmlFor="calidad-servicios">No mejora la calidad de servicios</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="falta-transparencia" />
                    <Label htmlFor="falta-transparencia">Falta de transparencia</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="impacto-economico" />
                    <Label htmlFor="impacto-economico">Impacto económico personal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="desconfianza-gestion" />
                    <Label htmlFor="desconfianza-gestion">Desconfianza en la gestión</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="proceso-aprobacion" />
                    <Label htmlFor="proceso-aprobacion">Proceso de aprobación apresurado</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="falta-consulta" />
                    <Label htmlFor="falta-consulta">Falta de consulta ciudadana</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Confianza en la CSS</h3>
              <div className="space-y-3">
                <Label>¿Qué nivel de confianza tienes en la CSS después de la Ley 462?</Label>
                <RadioGroup defaultValue="">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mucha-confianza" id="mucha-confianza" />
                    <Label htmlFor="mucha-confianza">Mucha confianza</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="algo-confianza" id="algo-confianza" />
                    <Label htmlFor="algo-confianza">Algo de confianza</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poca-confianza" id="poca-confianza" />
                    <Label htmlFor="poca-confianza">Poca confianza</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ninguna-confianza" id="ninguna-confianza" />
                    <Label htmlFor="ninguna-confianza">Ninguna confianza</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Prioridad para mejorar la CSS</h3>
              <div className="space-y-3">
                <Label>¿Cuál debería ser la principal prioridad para mejorar la CSS?</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mejorar-servicios">Mejorar calidad de servicios de salud</SelectItem>
                    <SelectItem value="transparencia">Aumentar transparencia y rendición de cuentas</SelectItem>
                    <SelectItem value="modernizar-gestion">Modernizar gestión administrativa</SelectItem>
                    <SelectItem value="infraestructura">Mejorar infraestructura hospitalaria</SelectItem>
                    <SelectItem value="combatir-corrupcion">Combatir la corrupción</SelectItem>
                    <SelectItem value="consulta-ciudadana">Realizar consulta ciudadana real</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Tu experiencia y propuestas</h3>
              <div className="space-y-3">
                <Label htmlFor="experiencia-propuestas">
                  Comparte tu experiencia personal con la CSS y/o tus propuestas para mejorar el sistema
                </Label>
                <Textarea
                  id="experiencia-propuestas"
                  placeholder="Describe tu experiencia con la CSS, cómo te afecta la Ley 462, y qué propones para mejorar el sistema de seguridad social..."
                  className="min-h-[150px]"
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
                  Enviar mi voz
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
