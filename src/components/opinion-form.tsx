"use client";

import type React from "react";
import type { Session } from "next-auth";
import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle, Send } from "lucide-react";
import type { SurveyQuestion } from "@/src/lib/data";

interface OpinionFormProps {
  problematicaId: number;
  questions: SurveyQuestion[];
  session: Session | null;
}

export default function OpinionForm({ problematicaId, questions, session }: OpinionFormProps) {
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleAnswerChange = (questionId: number, value: any, type: string) => {
    // Para checkboxes (opción múltiple)
    if (type === 'MULTIPLE_CHOICE') {
      const existingAnswers: string[] = answers[questionId] || [];
      const newAnswers = existingAnswers.includes(value)
        ? existingAnswers.filter((a: any) => a !== value) // Si ya existe, lo quita (uncheck)
        : [...existingAnswers, value]; // Si no existe, lo añade (check)
      setAnswers(prev => ({ ...prev, [questionId]: newAnswers }));
    } else {
      // Para todos los demás tipos de input
      setAnswers(prev => ({ ...prev, [questionId]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    try {
      const response = await fetch(`/api/problematicas/${problematicaId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) throw new Error("Error al enviar la respuesta.");
      setFormState('success');
    } catch (error) {
      console.error(error);
      setFormState('error');
    }
  };

  // Si no hay sesión, no se puede opinar
  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Participa en la Encuesta</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Se requiere inicio de sesión</AlertTitle>
            <AlertDescription>
              Debes <Link href="/registro?tab=iniciar-sesion" className="font-bold underline">iniciar sesión</Link> para poder participar con tu opinión.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  // Si ya se envió el formulario con éxito
  if (formState === 'success') {
    return (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Opinión registrada exitosamente</AlertTitle>
          <AlertDescription className="text-green-700">
            ¡Gracias por compartir tu voz! Tu opinión es muy valiosa para el diálogo ciudadano.
          </AlertDescription>
        </Alert>
    );
  }
  
  // Si no hay preguntas para esta problemática
  if (!questions || questions.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Opinar</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Actualmente no hay una encuesta activa para esta problemática.</p>
            </CardContent>
        </Card>
    );
  }

  // Renderizado del formulario dinámico
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tu Opinión Cuenta</CardTitle>
        <CardDescription>
          Responde las siguientes preguntas para compartir tu perspectiva sobre esta problemática.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-8">
          {questions.map((q) => (
            <div key={q.id} className="space-y-3">
              <Label className="text-base font-semibold">
                {q.question_text}
                {q.is_required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {
                {
                  'TEXT': <Input required={q.is_required} onChange={e => handleAnswerChange(q.id, e.target.value, q.question_type)} />,
                  'TEXTAREA': <Textarea required={q.is_required} className="min-h-[120px]" onChange={e => handleAnswerChange(q.id, e.target.value, q.question_type)} />,
                  'NUMBER': <Input type="number" required={q.is_required} onChange={e => handleAnswerChange(q.id, e.target.value, q.question_type)} />,
                  'BOOLEAN': <RadioGroup onValueChange={value => handleAnswerChange(q.id, value, q.question_type)}><div className="flex items-center space-x-2"><RadioGroupItem value="true" id={`q-${q.id}-yes`}/><Label htmlFor={`q-${q.id}-yes`}>Sí</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="false" id={`q-${q.id}-no`}/><Label htmlFor={`q-${q.id}-no`}>No</Label></div></RadioGroup>,
                  'SINGLE_CHOICE': <RadioGroup onValueChange={value => handleAnswerChange(q.id, value, q.question_type)} className="space-y-2">{q.options?.map(opt => <div key={opt.id} className="flex items-center space-x-2"><RadioGroupItem value={String(opt.id)} id={`opt-${opt.id}`}/><Label htmlFor={`opt-${opt.id}`}>{opt.text}</Label></div>)}</RadioGroup>,
                  'MULTIPLE_CHOICE': <div className="space-y-2">{q.options?.map(opt => <div key={opt.id} className="flex items-center space-x-2"><Checkbox id={`opt-${opt.id}`} onCheckedChange={() => handleAnswerChange(q.id, String(opt.id), q.question_type)} /><Label htmlFor={`opt-${opt.id}`}>{opt.text}</Label></div>)}</div>
                }[q.question_type]
              }
            </div>
          ))}
          {formState === 'error' && <p className="text-sm text-red-500">Hubo un error al enviar tu respuesta. Por favor, inténtalo de nuevo.</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full gap-2" disabled={formState === 'submitting'}>
            {formState === 'submitting' ? 'Enviando...' : <><Send className="h-4 w-4" /> Enviar mi Voz</>}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}