"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Switch } from "../components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Badge } from "../components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Plus, Edit, Trash2, Eye } from "lucide-react"
import DynamicSurveyBuilder from "../components/dynamic-survey-builder"

export default function AdminProblematicasManager() {
  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [surveyQuestions, setSurveyQuestions] = useState<any[]>([])

  // Datos de ejemplo de problemáticas existentes
  const problematicas = [
    {
      id: "1",
      title: "Reforma de la Caja del Seguro Social - Ley 462",
      description:
        "Análisis de la controvertida Ley 462 y sus implicaciones para los trabajadores y pensionados panameños.",
      category: "Seguridad Social",
      status: "Activa",
      participants: 2847,
      allowForum: true,
      showResults: true,
      imageUrl: "https://example.com/css-image.jpg",
      createdAt: "2024-01-15",
    },
  ]

  const handleCreateProblematica = () => {
    setIsCreating(true)
    setSurveyQuestions([])
  }

  const handleSaveProblematica = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar la problemática
    console.log("Guardando problemática con encuesta:", surveyQuestions)
    setIsCreating(false)
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Problemáticas</h2>
          <p className="text-gray-500">Crea, edita y gestiona las problemáticas nacionales</p>
        </div>
        <Button onClick={handleCreateProblematica} className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Problemática
        </Button>
      </div>

      {/* Lista de problemáticas existentes */}
      <div className="grid gap-4">
        {problematicas.map((problematica) => (
          <Card key={problematica.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{problematica.title}</CardTitle>
                    <Badge variant={problematica.status === "Activa" ? "default" : "secondary"}>
                      {problematica.status}
                    </Badge>
                  </div>
                  <CardDescription>{problematica.description}</CardDescription>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>Categoría: {problematica.category}</span>
                    <span>Participantes: {problematica.participants}</span>
                    <span>Creada: {problematica.createdAt}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingId(problematica.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span>Foro:</span>
                  <Badge variant={problematica.allowForum ? "default" : "secondary"}>
                    {problematica.allowForum ? "Habilitado" : "Deshabilitado"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <span>Resultados públicos:</span>
                  <Badge variant={problematica.showResults ? "default" : "secondary"}>
                    {problematica.showResults ? "Sí" : "No"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal para crear/editar problemática */}
      <Dialog
        open={isCreating || editingId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreating(false)
            setEditingId(null)
          }
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isCreating ? "Crear Nueva Problemática" : "Editar Problemática"}</DialogTitle>
            <DialogDescription>
              Completa la información de la problemática y configura la encuesta asociada.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProblematica} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título de la problemática *</Label>
                <Input id="title" placeholder="Ingresa el título" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="educacion">Educación</SelectItem>
                    <SelectItem value="salud">Salud</SelectItem>
                    <SelectItem value="seguridad-social">Seguridad Social</SelectItem>
                    <SelectItem value="medio-ambiente">Medio Ambiente</SelectItem>
                    <SelectItem value="economia">Economía</SelectItem>
                    <SelectItem value="infraestructura">Infraestructura</SelectItem>
                    <SelectItem value="seguridad">Seguridad</SelectItem>
                    <SelectItem value="transparencia">Transparencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción de la problemática *</Label>
              <Textarea
                id="description"
                placeholder="Describe detalladamente la problemática..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Contenido completo *</Label>
              <Textarea
                id="content"
                placeholder="Contenido detallado de la problemática, antecedentes, datos clave, etc..."
                className="min-h-[200px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL de la imagen</Label>
              <Input id="imageUrl" placeholder="https://ejemplo.com/imagen.jpg" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mostrar resultados a usuarios</Label>
                  <p className="text-sm text-gray-500">Los usuarios podrán ver los resultados de la encuesta</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Permitir foro de discusión</Label>
                  <p className="text-sm text-gray-500">Habilitar comentarios y discusiones</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium">Configuración de Encuesta</Label>
              <DynamicSurveyBuilder questions={surveyQuestions} onQuestionsChange={setSurveyQuestions} />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreating(false)
                  setEditingId(null)
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">{isCreating ? "Crear Problemática" : "Guardar Cambios"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
