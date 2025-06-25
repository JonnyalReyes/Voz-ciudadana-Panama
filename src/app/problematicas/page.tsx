// src/app/problematicas/page.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Search, Filter, ChevronRight } from "lucide-react";
import ProblematicasList from "../../components/problematicas-list";
import PageHeader from "../../components/page-header";

interface Problematica {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
  // ...otros campos
}

export default function ProblematicasPage() {
  const [problematicas, setProblematicas] = useState<Problematica[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Estado para todos los filtros
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    sortBy: 'recientes',
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Función para cargar los datos basada en los filtros y la página
  const fetchProblematicas = useCallback(async (currentPage: number, currentFilters: typeof filters) => {
    setIsLoading(true);
    const params = new URLSearchParams({
      page: currentPage.toString(),
      ...currentFilters,
    });

    try {
      const response = await fetch(`/api/problematicas?${params.toString()}`);
      const data = await response.json();

      if (currentPage === 1) {
        setProblematicas(data); // Reemplazar datos en la primera carga o al cambiar filtro
      } else {
        setProblematicas(prev => [...prev, ...data]); // Añadir datos al cargar más
      }
      setHasMore(data.length > 0);
    } catch (error) {
      console.error("Error al cargar problemáticas:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect para recargar cuando cambian los filtros
  useEffect(() => {
    setPage(1); // Resetea la página al cambiar un filtro
    fetchProblematicas(1, filters);
  }, [filters, fetchProblematicas]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    // Si se hace clic en el mismo filtro activo, se desactiva
    const newValue = filters[key] === value ? '' : value;
    setFilters(prev => ({ ...prev, [key]: newValue }));
  };
  
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProblematicas(nextPage, filters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Problemáticas Nacionales"
        description="Explora las problemáticas que afectan a Panamá y contribuye con tus ideas y propuestas."
      />

      <section className="py-8 md:py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar problemáticas..."
                className="pl-8"
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Ordenar por" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="recientes">Más recientes</SelectItem>
                  {/* <SelectItem value="participacion">Mayor participación</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader><CardTitle>Categorías</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Educación', 'Salud', 'Medio Ambiente', 'Economía', 'Infraestructura', 'Seguridad', 'Transparencia'].map(cat => (
                    <Badge key={cat} variant={filters.category === cat ? "default" : "outline"} onClick={() => handleFilterChange('category', cat)} className="cursor-pointer">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20 md:col-span-2">
              <CardHeader><CardTitle>Estado de participación</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Activa', 'En Analisis', 'Cerrada'].map(stat => (
                     <Badge key={stat} variant={filters.status === stat ? "default" : "outline"} onClick={() => handleFilterChange('status', stat)} className="cursor-pointer">
                       {stat}
                     </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Le pasamos las problemáticas y el estado de carga al componente de lista */}
          <ProblematicasList problematicas={problematicas} isLoading={isLoading} />

          <div className="flex justify-center mt-8">
            {hasMore && (
              <Button onClick={handleLoadMore} variant="outline" className="gap-1" disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Cargar más'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}