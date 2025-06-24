"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Switch } from "../components/ui/switch"
import { Plus, Trash2, GripVertical } from "lucide-react"

interface Question {
  id: string
  type: string
  title: string
  description?: string
  required: boolean
  options?: string[]
}

interface DynamicSurveyBuilderProps {
  questions: Question[]
  onQuestionsChange: (questions: Question[]) => void
}

export default function DynamicSurveyBuilder({ questions, onQuestionsChange }: DynamicSurveyBuilderProps) {
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null)

  const questionTypes = [
    { value: "text", label: "Texto corto" },
    { value: "textarea", label: "Texto largo" },
    { value: "radio", label: "Selección única" },
    { value: "checkbox", label: "Selección múltiple" },
    { value: "select", label: "Lista desplegable" },
    { value: "scale", label: "Escala (1-5)" },
    { value: "rating", label: "Calificación" },
  ]

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      type: "text",
      title: "",
      required: false,
      options: [],
    }
    onQuestionsChange([...questions, newQuestion])
    setEditingQuestion(newQuestion.id)
  }

  const updateQuestion = (id: string, updates: Partial<Question>) => {
    const updatedQuestions = questions.map((q) => (q.id === id ? { ...q, ...updates } : q))
    onQuestionsChange(updatedQuestions)
  }

  const deleteQuestion = (id: string) => {
    onQuestionsChange(questions.filter((q) => q.id !== id))
  }

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question) {
      const newOptions = [...(question.options || []), ""]
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options) {
      const newOptions = [...question.options]
      newOptions[optionIndex] = value
      updateQuestion(questionId, { options: newOptions })
    }
  }

  const removeOption = (questionId: string, optionIndex: number) => {
    const question = questions.find((q) => q.id === questionId)
    if (question && question.options) {
      const newOptions = question.options.filter((_, index) => index !== optionIndex)
      updateQuestion(questionId, { options: newOptions })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Preguntas de la Encuesta</h3>
        <Button onClick={addQuestion} variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Pregunta
        </Button>
      </div>

      {questions.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-center">
              <p className="text-gray-500 mb-2">No hay preguntas configuradas</p>
              <Button onClick={addQuestion} variant="outline" size="sm">
                Agregar primera pregunta
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {questions.map((question, index) => (
        <Card key={question.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
                <CardTitle className="text-base">Pregunta {index + 1}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingQuestion(editingQuestion === question.id ? null : question.id)}
                >
                  {editingQuestion === question.id ? "Cerrar" : "Editar"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteQuestion(question.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          {editingQuestion === question.id ? (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Título de la pregunta</Label>
                <Input
                  value={question.title}
                  onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
                  placeholder="Escribe tu pregunta aquí..."
                />
              </div>

              <div className="space-y-2">
                <Label>Descripción (opcional)</Label>
                <Textarea
                  value={question.description || ""}
                  onChange={(e) => updateQuestion(question.id, { description: e.target.value })}
                  placeholder="Descripción adicional para la pregunta..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de pregunta</Label>
                  <Select value={question.type} onValueChange={(value) => updateQuestion(question.id, { type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Pregunta obligatoria</Label>
                  <Switch
                    checked={question.required}
                    onCheckedChange={(checked) => updateQuestion(question.id, { required: checked })}
                  />
                </div>
              </div>

              {(question.type === "radio" || question.type === "checkbox" || question.type === "select") && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Opciones</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addOption(question.id)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar opción
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {question.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          placeholder={`Opción ${optionIndex + 1}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeOption(question.id, optionIndex)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          ) : (
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{question.title || "Sin título"}</p>
                {question.description && <p className="text-sm text-gray-500">{question.description}</p>}
                <div className="flex gap-2 text-xs">
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {questionTypes.find((t) => t.value === question.type)?.label}
                  </span>
                  {question.required && <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Obligatoria</span>}
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
