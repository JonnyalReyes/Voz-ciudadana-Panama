"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Users, FileText, Settings } from "lucide-react";
import AdminProblematicasManager from "./admin-problematicas-manager";
import AdminUserRequests from "./admin-user-requests";

// Recibimos el nombre del admin como una prop
export default function AdminDashboard({ adminName }: { adminName: string | null | undefined }) {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-8 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Panel de Administración</h1>
              {/* Podemos mostrar el nombre del admin logueado */}
              <p className="text-gray-500 mt-2">Bienvenido, {adminName}. Gestiona la plataforma.</p>
            </div>
            <Badge variant="secondary" className="text-sm">
              Administrador
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white flex-1">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="problematicas" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="problematicas" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Problemáticas
              </TabsTrigger>
              <TabsTrigger value="solicitudes" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Solicitudes de Usuarios
              </TabsTrigger>
              <TabsTrigger value="configuracion" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Configuración
              </TabsTrigger>
            </TabsList>

            <TabsContent value="problematicas" className="mt-6">
              <AdminProblematicasManager />
            </TabsContent>

            <TabsContent value="solicitudes" className="mt-6">
              <AdminUserRequests />
            </TabsContent>

            <TabsContent value="configuracion" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración del Sistema</CardTitle>
                  <CardDescription>Ajustes generales de la plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* ... Tu JSX de configuración no cambia ... */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}