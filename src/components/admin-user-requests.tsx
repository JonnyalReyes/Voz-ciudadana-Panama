// src/components/admin-user-requests.tsx
"use client"
import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { CheckCircle, XCircle, RotateCcw, Eye } from "lucide-react"

// Definimos un tipo para los datos que esperamos de la API
interface UserRequest {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    cedula: string;
    provincia: string;
    ocupacion: string;
    status: 'pending' | 'approved' | 'rejected' | 'revision';
    created_at: string;
}

export default function AdminUserRequests() {
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");

  // Función para cargar los usuarios desde nuestra API
  const fetchUserRequests = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/users');
      if (!response.ok) {
        throw new Error('No se pudo cargar la información de los usuarios.');
      }
      const data = await response.json();
      setUserRequests(data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar las solicitudes.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar los datos cuando el componente se monta por primera vez
  useEffect(() => {
    fetchUserRequests();
  }, []);
  
  // Función para manejar la actualización de estado
  const handleUpdateRequest = async (userId: number, newStatus: string) => {
    try {
        const response = await fetch(`/api/admin/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
            throw new Error('La actualización falló');
        }

        // Si la actualización es exitosa, volvemos a cargar la lista para ver los cambios
        fetchUserRequests();

    } catch (error) {
        console.error(error);
        alert('Error al actualizar el estado del usuario.');
    }
  };


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pendiente</Badge>
      case "approved":
        return <Badge variant="default" className="bg-green-600">Aprobado</Badge>
      case "rejected":
        return <Badge variant="destructive">Rechazado</Badge>
      case "revision":
        return <Badge variant="outline" className="border-orange-500 text-orange-600">En Revisión</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredRequests = userRequests.filter((request) => filterStatus === "all" || request.status === filterStatus);

  if (isLoading) {
    return <div>Cargando solicitudes...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Solicitudes de Verificación</h2>
          <p className="text-gray-500">Revisa y gestiona las solicitudes de nuevos usuarios</p>
        </div>
        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="approved">Aprobados</SelectItem>
              <SelectItem value="rejected">Rechazados</SelectItem>
              <SelectItem value="revision">En Revisión</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{request.nombre} {request.apellido}</CardTitle>
                    {getStatusBadge(request.status)}
                  </div>
                  <CardDescription>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <span>Email: {request.email}</span>
                      <span>Cédula: {request.cedula}</span>
                      <span>Provincia: {request.provincia}</span>
                      <span>Ocupación: {request.ocupacion}</span>
                    </div>
                  </CardDescription>
                  <p className="text-sm text-gray-500">Enviado: {new Date(request.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700" onClick={() => handleUpdateRequest(request.id, 'approved')}><CheckCircle className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" className="text-orange-600 hover:text-orange-700" onClick={() => handleUpdateRequest(request.id, 'revision')}><RotateCcw className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleUpdateRequest(request.id, 'rejected')}><XCircle className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}