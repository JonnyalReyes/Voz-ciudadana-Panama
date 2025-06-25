"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import DynamicSurveyBuilder, { type SurveyQuestion } from "./dynamic-survey-builder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

// Tipo para la 'problemática' que coincide con la BD
interface Problematica {
    id: number;
    title: string;
    description: string;
    content: string;
    category: string;
    status: string;
    image_url?: string;
    allow_forum: boolean;
    show_results: boolean;
    created_at: string;
    participants?: number;
}

// Estado inicial para el formulario, para facilitar el reseteo
const initialFormState = {
    title: "",
    description: "",
    content: "",
    category: "",
    imageUrl: "",
    allowForum: true,
    showResults: true,
};

export default function AdminProblematicasManager() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [viewingProblematica, setViewingProblematica] = useState<Problematica | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  
  const [problematicas, setProblematicas] = useState<Problematica[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  const [surveyQuestions, setSurveyQuestions] = useState<SurveyQuestion[]>([]);

  const fetchProblematicas = async () => {
    setIsLoading(true);
    try {
        const response = await fetch('/api/problematicas');
        if (!response.ok) throw new Error('No se pudo cargar la lista de problemáticas');
        setProblematicas(await response.json());
    } catch (error) { console.error(error); } finally { setIsLoading(false); }
  };

  useEffect(() => {
    fetchProblematicas();
  }, []);

  const handleOpenDialog = async (problematica: Problematica | null = null) => {
    setSurveyQuestions([]); // Siempre reseteamos las preguntas al abrir
    if (problematica) { // Modo Edición
        setEditingId(problematica.id);
        setFormData({
            title: problematica.title,
            description: problematica.description,
            content: problematica.content,
            category: problematica.category,
            imageUrl: problematica.image_url || "",
            allowForum: Boolean(problematica.allow_forum),
            showResults: Boolean(problematica.show_results),
        });
        // Cargamos las preguntas existentes para esta problemática
        try {
            const response = await fetch(`/api/problematicas/${problematica.id}/questions`);
            if (response.ok) setSurveyQuestions(await response.json());
        } catch (error) { console.error("Error al cargar preguntas:", error); }
    } else { // Modo Creación
        setEditingId(null);
        setFormData(initialFormState);
        setIsCreating(true); // <-- ESTA LÍNEA ES CLAVE PARA ABRIR EL DIÁLOGO
    }
  };
  
  const handleSaveProblematica = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.category) { alert("Por favor, selecciona una categoría."); return; }
    
    const url = editingId ? `/api/problematicas/${editingId}` : '/api/problematicas';
    const method = editingId ? 'PUT' : 'POST';
    const body = { ...formData, questions: surveyQuestions };

    try {
        const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        if (!response.ok) throw new Error(editingId ? 'Error al actualizar' : 'Error al crear');
        
        // Cerramos el diálogo y recargamos la lista
        setEditingId(null);
        setIsCreating(false);
        fetchProblematicas();
    } catch (error) { alert((error as Error).message); }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    try {
        const response = await fetch(`/api/problematicas/${deletingId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar');
        setDeletingId(null);
        fetchProblematicas();
    } catch (error) { alert((error as Error).message); }
  };

  if (isLoading) return <div className="p-4 text-center">Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gestión de Problemáticas</h2>
          <p className="text-gray-500">Crea, edita y gestiona las problemáticas nacionales</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" /> Nueva Problemática
        </Button>
      </div>

      <div className="grid gap-4">
        {problematicas.length > 0 ? (
            problematicas.map((problematica) => (
            <Card key={problematica.id}>
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap"><CardTitle className="text-lg">{problematica.title}</CardTitle><Badge variant={problematica.status === "Activa" ? "default" : "secondary"}>{problematica.status}</Badge></div>
                      <CardDescription>{problematica.description}</CardDescription>
                      <div className="flex gap-4 text-sm text-gray-500 pt-1"><span>Categoría: {problematica.category}</span><span>Creada: {new Date(problematica.created_at).toLocaleDateString()}</span></div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setViewingProblematica(problematica)}><Eye className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm" onClick={() => handleOpenDialog(problematica)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => setDeletingId(problematica.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </CardHeader>
            </Card>
            ))
        ) : (
            <p className="text-muted-foreground text-center py-8">No hay problemáticas creadas todavía. Haz clic en "Nueva Problemática" para empezar.</p>
        )}
      </div>

      {/* DIÁLOGO PARA VER DETALLES */}
      <Dialog open={viewingProblematica !== null} onOpenChange={() => setViewingProblematica(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewingProblematica?.title}</DialogTitle>
            <DialogDescription>{viewingProblematica?.category}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {viewingProblematica?.image_url && <div className="relative h-60 w-full bg-muted rounded-md"><Image src={viewingProblematica.image_url} alt={viewingProblematica.title} layout="fill" objectFit="cover" className="rounded-md border" /></div>}
            <div><h3 className="font-semibold mb-1">Descripción</h3><p className="text-sm text-muted-foreground">{viewingProblematica?.description}</p></div>
            <div><h3 className="font-semibold mb-1">Contenido Completo</h3><p className="text-sm text-muted-foreground whitespace-pre-wrap">{viewingProblematica?.content}</p></div>
          </div>
           <DialogFooter><Button type="button" variant="outline" onClick={() => setViewingProblematica(null)}>Cerrar</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* DIÁLOGO PARA CREAR/EDITAR */}
      <Dialog open={isCreating || editingId !== null} onOpenChange={(open) => {
          if (!open) { setIsCreating(false); setEditingId(null); }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Problemática" : "Crear Nueva Problemática"}</DialogTitle>
            <DialogDescription>Completa la información y configura la encuesta asociada.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="info" className="w-full pt-4">
              <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Información General</TabsTrigger>
                  <TabsTrigger value="encuesta">Encuesta</TabsTrigger>
              </TabsList>
              <form onSubmit={handleSaveProblematica}>
                  <TabsContent value="info" className="space-y-6 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label htmlFor="title">Título *</Label><Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required /></div>
                      <div className="space-y-2"><Label htmlFor="category">Categoría *</Label><Select required value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}><SelectTrigger id="category"><SelectValue placeholder="Selecciona..." /></SelectTrigger><SelectContent><SelectItem value="Educación">Educación</SelectItem><SelectItem value="Salud">Salud</SelectItem><SelectItem value="Seguridad Social">Seguridad Social</SelectItem><SelectItem value="Medio Ambiente">Medio Ambiente</SelectItem><SelectItem value="Economía">Economía</SelectItem><SelectItem value="Infraestructura">Infraestructura</SelectItem><SelectItem value="Seguridad">Seguridad</SelectItem><SelectItem value="Transparencia">Transparencia</SelectItem></SelectContent></Select></div>
                    </div>
                    <div className="space-y-2"><Label htmlFor="description">Descripción Corta *</Label><Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required className="min-h-[100px]" /></div>
                    <div className="space-y-2"><Label htmlFor="content">Contenido Completo</Label><Textarea id="content" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="min-h-[150px]" /></div>
                    <div className="space-y-2"><Label htmlFor="imageUrl">URL de Imagen</Label><Input id="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} /></div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><Label htmlFor="allowForum">Permitir foro de discusión</Label></div><Switch id="allowForum" checked={formData.allowForum} onCheckedChange={(checked) => setFormData({...formData, allowForum: checked})} /></div>
                        <div className="flex items-center justify-between rounded-lg border p-3"><div className="space-y-0.5"><Label htmlFor="showResults">Mostrar resultados públicos</Label></div><Switch id="showResults" checked={formData.showResults} onCheckedChange={(checked) => setFormData({...formData, showResults: checked})} /></div>
                    </div>
                  </TabsContent>
                  <TabsContent value="encuesta" className="pt-4">
                      <DynamicSurveyBuilder questions={surveyQuestions} onQuestionsChange={setSurveyQuestions} />
                  </TabsContent>
                  <DialogFooter className="mt-6 pt-6 border-t">
                    <Button type="button" variant="outline" onClick={() => { setIsCreating(false); setEditingId(null); }}>Cancelar</Button>
                    <Button type="submit">{editingId ? "Guardar Cambios" : "Crear Problemática"}</Button>
                  </DialogFooter>
              </form>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* DIÁLOGO DE CONFIRMACIÓN PARA ELIMINAR */}
      <AlertDialog open={deletingId !== null} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente la problemática y sus datos asociados (preguntas, respuestas, etc.).</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">Eliminar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}