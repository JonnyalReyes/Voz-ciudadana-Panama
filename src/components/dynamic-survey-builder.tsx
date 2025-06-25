// src/components/dynamic-survey-builder.tsx
"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Plus, Trash2 } from "lucide-react";

// Definimos los tipos para las preguntas y opciones
export interface QuestionOption {
  id: number | string;
  text: string;
}
export interface SurveyQuestion {
  id: number | string;
  question_text: string;
  question_type: 'TEXT' | 'TEXTAREA' | 'BOOLEAN' | 'NUMBER' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  is_required: boolean;
  options?: QuestionOption[];
}

interface DynamicSurveyBuilderProps {
  questions: SurveyQuestion[];
  onQuestionsChange: (questions: SurveyQuestion[]) => void;
}

export default function DynamicSurveyBuilder({ questions, onQuestionsChange }: DynamicSurveyBuilderProps) {

  const addQuestion = () => {
    const newQuestion: SurveyQuestion = {
      id: `new_${Date.now()}`,
      question_text: "",
      question_type: "TEXT",
      is_required: false,
      options: [],
    };
    onQuestionsChange([...questions, newQuestion]);
  };

  const updateQuestion = (qIndex: number, field: keyof SurveyQuestion, value: any) => {
    const newQuestions = [...questions];
    (newQuestions[qIndex] as any)[field] = value;
    onQuestionsChange(newQuestions);
  };
  
  const removeQuestion = (qIndex: number) => {
    onQuestionsChange(questions.filter((_, index) => index !== qIndex));
  };
  
  const addOption = (qIndex: number) => {
    const newOptions = [...(questions[qIndex].options || []), { id: `new_${Date.now()}`, text: '' }];
    updateQuestion(qIndex, 'options', newOptions);
  };

  const updateOption = (qIndex: number, oIndex: number, text: string) => {
    const newOptions = [...(questions[qIndex].options || [])];
    newOptions[oIndex].text = text;
    updateQuestion(qIndex, 'options', newOptions);
  };
  
  const removeOption = (qIndex: number, oIndex: number) => {
    const newOptions = questions[qIndex].options?.filter((_, index) => index !== oIndex);
    updateQuestion(qIndex, 'options', newOptions);
  };


  return (
    <div className="space-y-4 rounded-lg border p-4">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Preguntas de la Encuesta</h3>
            <Button onClick={addQuestion} type="button" variant="outline" size="sm" className="gap-2"><Plus className="h-4 w-4" /> Agregar Pregunta</Button>
        </div>
        {questions.map((q, qIndex) => (
            <Card key={q.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <p className="font-semibold">Pregunta {qIndex + 1}</p>
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeQuestion(qIndex)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Texto de la pregunta</Label>
                        <Input value={q.question_text} onChange={(e) => updateQuestion(qIndex, 'question_text', e.target.value)} placeholder="Ej: ¿Cuál es tu principal preocupación?" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Tipo de respuesta</Label>
                            <Select value={q.question_type} onValueChange={(value) => updateQuestion(qIndex, 'question_type', value)}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TEXT">Texto Corto</SelectItem>
                                    <SelectItem value="TEXTAREA">Párrafo</SelectItem>
                                    <SelectItem value="SINGLE_CHOICE">Opción Única</SelectItem>
                                    <SelectItem value="MULTIPLE_CHOICE">Opción Múltiple</SelectItem>
                                    <SelectItem value="BOOLEAN">Sí / No</SelectItem>
                                    <SelectItem value="NUMBER">Número (ej. escala 1-5)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2 pt-6">
                            <Switch checked={q.is_required} onCheckedChange={(checked) => updateQuestion(qIndex, 'is_required', checked)} id={`required-${qIndex}`} />
                            <Label htmlFor={`required-${qIndex}`}>Requerida</Label>
                        </div>
                    </div>

                    {(q.question_type === 'SINGLE_CHOICE' || q.question_type === 'MULTIPLE_CHOICE') && (
                        <div className="space-y-2 pl-4 border-l-2">
                            <Label>Opciones de respuesta</Label>
                            {q.options?.map((opt, oIndex) => (
                                <div key={opt.id} className="flex items-center gap-2">
                                    <Input value={opt.text} onChange={(e) => updateOption(qIndex, oIndex, e.target.value)} placeholder={`Opción ${oIndex + 1}`} />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeOption(qIndex, oIndex)}><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => addOption(qIndex)}>Agregar opción</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        ))}
    </div>
  );
}