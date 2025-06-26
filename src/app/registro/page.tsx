// src/app/registro/page.tsx

"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation" // <-- Importado para leer la URL

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Checkbox } from "../../components/ui/checkbox"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Eye, EyeOff, Upload, AlertCircle, Shield } from "lucide-react"
import PageHeader from "../../components/page-header"
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";

// --- Importamos los componentes para las pestañas y el formulario de login ---
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import LoginForm from "@/src/components/login-form"
// --------------------------------------------------------------------------

export default function RegistroPage() {
  // --- LÓGICA PARA LEER EL PARÁMETRO 'tab' DE LA URL ---
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'iniciar-sesion' ? 'login' : 'registro';
  // ---------------------------------------------------

  // Estados para el formulario de registro
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [provincia, setProvincia] = useState<string>("");
  const [nivelEducativo, setNivelEducativo] = useState<string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Por favor, selecciona un archivo PDF válido");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = {
      nombre: (form.elements.namedItem('nombre') as HTMLInputElement).value,
      apellido: (form.elements.namedItem('apellido') as HTMLInputElement).value,
      cedula: (form.elements.namedItem('cedula') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      telefono: (form.elements.namedItem('telefono') as HTMLInputElement).value,
      direccion: (form.elements.namedItem('direccion') as HTMLTextAreaElement).value,
      ocupacion: (form.elements.namedItem('ocupacion') as HTMLInputElement).value,
      motivacion: (form.elements.namedItem('motivacion') as HTMLTextAreaElement).value,
      provincia: provincia,
      fecha_nacimiento: fechaNacimiento,
      nivel_educativo: nivelEducativo,
      sexo: sexo,
    };

    if (!formData.provincia || !formData.nivel_educativo) {
        alert("Por favor, selecciona una provincia y un nivel educativo.");
        setIsSubmitting(false);
        return;
    }

    try {
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Ocurrió un error.'}`);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('No se pudo conectar con el servidor. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Únete a la Conversación"
        description="Completa el proceso de verificación para participar o inicia sesión en tu cuenta."
      />

      <section className="py-8 md:py-12 bg-white">
        <div className="container px-4 md:px-6 max-w-2xl">
          {/* --- ENVOLVEMOS TODO EN EL COMPONENTE TABS --- */}
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="registro">Solicitar Verificación</TabsTrigger>
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            </TabsList>
            
            {/* --- PESTAÑA DE REGISTRO --- */}
            <TabsContent value="registro">
              <Alert className="mb-6 mt-6">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  <strong>Proceso de verificación:</strong> Para garantizar un diálogo responsable, todos los participantes deben completar este proceso.
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
                        <Input id="nombre" name="nombre" placeholder="Tu nombre completo" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellidos *</Label>
                        <Input id="apellido" name="apellido" placeholder="Tus apellidos" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cedula">Número de cédula *</Label>
                      <Input id="cedula" name="cedula" placeholder="X-XXX-XXXX" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fecha-nacimiento">Fecha de nacimiento *</Label>
                      <Input 
                        id="fecha-nacimiento" 
                        name="fecha-nacimiento" 
                        type="date" 
                        required 
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                        // Lógica para no permitir fechas de menores de 18 años
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Sexo *</Label>
                      <RadioGroup 
                          required 
                          className="flex space-x-6"
                          value={sexo}
                          onValueChange={setSexo}
                      >
                          <div className="flex items-center space-x-2">
                              <RadioGroupItem value="hombre" id="r-hombre" />
                              <Label htmlFor="r-hombre">Hombre</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                              <RadioGroupItem value="mujer" id="r-mujer" />
                              <Label htmlFor="r-mujer">Mujer</Label>
                          </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico *</Label>
                      <Input id="email" name="email" type="email" placeholder="tu@ejemplo.com" required />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="telefono">Número de teléfono *</Label>
                        <Input id="telefono" name="telefono" placeholder="+507 XXXX-XXXX" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
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
                        <Label htmlFor="provincia">Provincia de residencia *</Label>
                        <Select required name="provincia" value={provincia} onValueChange={setProvincia}>
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
                                <SelectItem value="bocas-del-toro">Bocas del Toro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección completa *</Label>
                      <Textarea id="direccion" name="direccion" placeholder="Ingresa tu dirección completa de residencia" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ocupacion">Ocupación *</Label>
                      <Input id="ocupacion" name="ocupacion" placeholder="Tu ocupación actual" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nivel-educativo">Nivel educativo *</Label>
                      <Select required name="nivel-educativo" value={nivelEducativo} onValueChange={setNivelEducativo}>
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
                        name="motivacion"
                        placeholder="Explica por qué quieres participar en Habla Panamá..."
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" required />
                            <Label htmlFor="terms" className="text-sm">
                            Acepto los <Link href="/terminos" className="text-primary hover:underline">términos y condiciones</Link> y la <Link href="/privacidad" className="text-primary hover:underline">política de privacidad</Link>
                            </Label>
                        </div>
                        {/* ... otros checkboxes ... */}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando solicitud..." : "Enviar solicitud de verificación"}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            {/* --- PESTAÑA DE LOGIN --- */}
            <TabsContent value="login">
                <div className="mt-6">
                 <LoginForm />
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}