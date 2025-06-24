"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { CheckCircle, XCircle, RotateCcw, Eye } from "lucide-react"

export default function AdminUserRequests() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [actionType, setActionType] = useState<string>("")
  const [actionMessage, setActionMessage] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Datos de ejemplo de solicitudes
  const userRequests = [
    {
      id: "1",
      name: "María González Pérez",
      email: "maria.gonzalez@email.com",
      cedula: "8-123-4567",
      phone: "+507 6123-4567",
      province: "Panamá",
      occupation: "Enfermera",
      education: "Universitario",
      motivation: "Quiero contribuir al diálogo sobre salud pública en Panamá...",
      status: "pending",
      submittedAt: "2024-01-20",
      documentUrl: "documento1.pdf",
    },
    {
      id: "2",
      name: "Carlos Mendoza Silva",
      email: "carlos.mendoza@email.com",
      cedula: "4-567-8901",
      phone: "+507 6987-6543",
      province: "Chiriquí",
      occupation: "Profesor",
      education: "Postgrado",
      motivation: "Como educador, deseo participar en las discusiones sobre educación...",
      status: "pending",
      submittedAt: "2024-01-19",
      documentUrl: "documento2.pdf",
    },
    {
      id: "3",
      name: "Ana Castillo Rodríguez",
      email: "ana.castillo@email.com",
      cedula: "2-345-6789",
      phone: "+507 6456-7890",
      province: "Coclé",
      occupation: "Ingeniera",
      education: "Universitario",
      motivation: "Quiero aportar mi experiencia técnica a los proyectos de infraestructura...",
      status: "approved",
      submittedAt: "2024-01-18",
      documentUrl: "documento3.pdf",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pendiente</Badge>
      case "approved":
        return (
          <Badge variant="default" className="bg-green-600">
            Aprobado
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rechazado</Badge>
      case "revision":
        return (
          <Badge variant="outline" className="border-orange-500 text-orange-600">
            En Revisión
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleAction = (type: string) => {
    setActionType(type)
    setActionMessage("")
  }

  const submitAction = () => {
    // Aquí iría la lógica para procesar la acción
    console.log(`Acción: ${actionType}, Mensaje: ${actionMessage}`)
    setSelectedRequest(null)
    setActionType("")
    setActionMessage("")
  }

  const filteredRequests = userRequests.filter((request) => filterStatus === "all" || request.status === filterStatus)

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
                    <CardTitle className="text-lg">{request.name}</CardTitle>
                    {getStatusBadge(request.status)}
                  </div>
                  <CardDescription>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <span>Email: {request.email}</span>
                      <span>Cédula: {request.cedula}</span>
                      <span>Provincia: {request.province}</span>
                      <span>Ocupación: {request.occupation}</span>
                    </div>
                  </CardDescription>
                  <p className="text-sm text-gray-500">Enviado: {request.submittedAt}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {request.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 hover:text-green-700"
                        onClick={() => {
                          setSelectedRequest(request)
                          handleAction("approve")
                        }}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-orange-600 hover:text-orange-700"
                        onClick={() => {
                          setSelectedRequest(request)
                          handleAction("revision")
                        }}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => {
                          setSelectedRequest(request)
                          handleAction("reject")
                        }}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Educación:</strong> {request.education}
                </p>
                <p className="text-sm">
                  <strong>Motivación:</strong> {request.motivation}
                </p>
                <p className="text-sm">
                  <strong>Documento:</strong>
                  <Button variant="link" className="p-0 h-auto ml-1" size="sm">
                    {request.documentUrl}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal para ver detalles y tomar acciones */}
      <Dialog
        open={selectedRequest !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedRequest(null)
            setActionType("")
            setActionMessage("")
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {actionType
                ? `${actionType === "approve" ? "Aprobar" : actionType === "reject" ? "Rechazar" : "Solicitar Revisión"} Solicitud`
                : "Detalles de la Solicitud"}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest &&
                (actionType
                  ? `Procesando la solicitud de ${selectedRequest.name}`
                  : `Información completa de la solicitud de ${selectedRequest.name}`)}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              {!actionType ? (
                // Vista de detalles
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-medium">Nombre completo</Label>
                      <p>{selectedRequest.name}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Cédula</Label>
                      <p>{selectedRequest.cedula}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Email</Label>
                      <p>{selectedRequest.email}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Teléfono</Label>
                      <p>{selectedRequest.phone}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Provincia</Label>
                      <p>{selectedRequest.province}</p>
                    </div>
                    <div>
                      <Label className="font-medium">Ocupación</Label>
                      <p>{selectedRequest.occupation}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="font-medium">Motivación</Label>
                    <p className="mt-1 text-sm">{selectedRequest.motivation}</p>
                  </div>

                  <div>
                    <Label className="font-medium">Documento de antecedentes</Label>
                    <Button variant="outline" className="mt-1 w-full">
                      Ver documento: {selectedRequest.documentUrl}
                    </Button>
                  </div>
                </div>
              ) : (
                // Vista de acción
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Acción a realizar:</strong>{" "}
                      {actionType === "approve"
                        ? "Aprobar solicitud"
                        : actionType === "reject"
                          ? "Rechazar solicitud"
                          : "Solicitar revisión"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {actionType === "approve" && "El usuario recibirá acceso completo a la plataforma."}
                      {actionType === "reject" && "El usuario será notificado del rechazo de su solicitud."}
                      {actionType === "revision" && "El usuario deberá corregir aspectos específicos de su solicitud."}
                    </p>
                  </div>

                  {(actionType === "reject" || actionType === "revision") && (
                    <div className="space-y-2">
                      <Label htmlFor="action-message">
                        {actionType === "reject" ? "Motivo del rechazo" : "Aspectos a modificar"} *
                      </Label>
                      <Textarea
                        id="action-message"
                        value={actionMessage}
                        onChange={(e) => setActionMessage(e.target.value)}
                        placeholder={
                          actionType === "reject"
                            ? "Explica el motivo del rechazo..."
                            : "Especifica qué aspectos debe corregir el usuario..."
                        }
                        className="min-h-[100px]"
                        required
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {!actionType ? (
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1 text-green-600 hover:text-green-700"
                  onClick={() => handleAction("approve")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Aprobar
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-orange-600 hover:text-orange-700"
                  onClick={() => handleAction("revision")}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Solicitar Revisión
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-red-600 hover:text-red-700"
                  onClick={() => handleAction("reject")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Rechazar
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setActionType("")}>
                  Cancelar
                </Button>
                <Button
                  onClick={submitAction}
                  disabled={(actionType === "reject" || actionType === "revision") && !actionMessage.trim()}
                >
                  Confirmar {actionType === "approve" ? "Aprobación" : actionType === "reject" ? "Rechazo" : "Revisión"}
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
