// src/components/problematicas-list.tsx
"use client";

import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { Users, MessageSquare, Calendar, ArrowRight } from "lucide-react";

// Tipo que define la estructura de una problemática
interface Problematica {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
  end_date?: string | null;
  // Estos valores necesitarían otra consulta para ser reales
  participants?: number;
  comments?: number;
}

// El componente ahora recibe las problemáticas y el estado de carga como props
interface ProblematicasListProps {
  problematicas: Problematica[];
  isLoading: boolean;
}

export default function ProblematicasList({ problematicas, isLoading }: ProblematicasListProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-PA', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  if (isLoading && problematicas.length === 0) {
    return <div>Cargando...</div>;
  }

  if (!isLoading && problematicas.length === 0) {
    return <div className="text-center py-10">No se encontraron problemáticas con los filtros seleccionados.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {problematicas.map((problematica) => (
        <Card key={problematica.id} className="overflow-hidden">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-6">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{problematica.category}</Badge>
                <Badge variant="outline">{problematica.status}</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">{problematica.title}</h3>
              <p className="text-gray-500 mb-4">{problematica.description}</p>
              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Publicado: {formatDate(problematica.created_at)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{problematica.participants || 0} participantes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{problematica.comments || 0} comentarios</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center p-6 bg-primary/5 border-t md:border-t-0 md:border-l">
              <p className="text-sm text-center mb-4">
                <span className="block font-medium">Cierre de participación:</span>
                <span className="text-gray-500">{problematica.end_date ? formatDate(problematica.end_date) : 'No definida'}</span>
              </p>
              <Button asChild className="w-full gap-1">
                <Link href={`/problematicas/${problematica.id}`}>
                  Participar <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}