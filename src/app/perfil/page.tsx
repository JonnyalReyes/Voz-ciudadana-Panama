"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import { User, Bell, Shield, FileText } from "lucide-react";
import PageHeader from "../../components/page-header";
import UserParticipationHistory from "../../components/user-participation-history";

// Tipos de datos que esperamos de nuestras APIs
interface HistoryItem { id: number; problematica_id: number; problematica_title: string; comment_text: string; created_at: string; }
interface UserStats { problematicasCount: number; commentCount: number; }
interface UserProfile { nombre: string; apellido: string; email: string; provincia: string | null; bio: string | null; image_url: string | null; interests: string[]; }

const ALL_CATEGORIES = ['Educación', 'Salud', 'Medio Ambiente', 'Economía', 'Infraestructura', 'Seguridad', 'Transparencia', 'Derechos Humanos'];

export default function PerfilPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [participationHistory, setParticipationHistory] = useState<HistoryItem[]>([]);
  const [stats, setStats] = useState<UserStats>({ problematicasCount: 0, commentCount: 0 });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
        const [historyRes, profileRes, statsRes] = await Promise.all([
            fetch('/api/user/history'),
            fetch('/api/user/profile'),
            fetch('/api/user/stats')
        ]);
        if (!profileRes.ok) throw new Error("No se pudo cargar el perfil.");

        const history = await historyRes.json();
        const profile = await profileRes.json();
        const userStats = await statsRes.json();
        
        setParticipationHistory(history);
        setProfileData(profile);
        setStats(userStats);
    } catch (error) {
        console.error("Error al cargar datos del perfil", error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
        fetchAllData();
    }
  }, [status, fetchAllData]);

  if (status === "loading" || isLoading) {
    return <div className="container py-8 text-center">Cargando perfil...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/registro?tab=iniciar-sesion");
    return null;
  }
  
  if (!profileData) {
      return <div className="container py-8 text-center text-destructive">No se pudieron cargar los datos del perfil.</div>
  }

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
      setProfileData(prev => prev ? {...prev, [field]: value} : null);
  };
  
  const handleInterestToggle = (category: string) => {
    if (!profileData) return;
    const newInterests = profileData.interests.includes(category)
        ? profileData.interests.filter(i => i !== category)
        : [...profileData.interests, category];
    setProfileData({...profileData, interests: newInterests});
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
    });
    if (response.ok) {
        alert("Perfil actualizado");
        // Actualizamos la sesión para que el header refleje el cambio de imagen
        await update({ 
            name: `${profileData.nombre} ${profileData.apellido}`, 
            image: profileData.image_url 
        });
    } else { alert("Error al actualizar el perfil"); }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(passwordData.newPassword !== passwordData.confirmPassword) {
        alert("Las nuevas contraseñas no coinciden.");
        return;
    }
    const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData)
    });
    if (response.ok) {
        alert("Contraseña actualizada con éxito");
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
    }
  };
  
  const getInitials = (name: string = '') => name?.split(" ").map(n => n[0]).join("").toUpperCase() || '';

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="Mi Perfil" description="Gestiona tu cuenta y revisa tu historial de participación." />
      <section className="py-8 md:py-12 bg-white">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="perfil" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="perfil"><User className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Perfil</span></TabsTrigger>
                <TabsTrigger value="participacion"><FileText className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Participación</span></TabsTrigger>
                <TabsTrigger value="privacidad"><Shield className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Privacidad</span></TabsTrigger>
                <TabsTrigger value="notificaciones" disabled><Bell className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Notificaciones</span></TabsTrigger>
            </TabsList>

            <TabsContent value="perfil" className="py-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <form onSubmit={handleProfileSubmit}>
                    <CardHeader><CardTitle>Información personal</CardTitle><CardDescription>Actualiza tu información de perfil.</CardDescription></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center space-y-3 mb-4">
                            <Avatar className="h-24 w-24"><AvatarImage src={profileData.image_url || undefined} alt={profileData.nombre} /><AvatarFallback>{getInitials(`${profileData.nombre} ${profileData.apellido}`)}</AvatarFallback></Avatar>
                            <div className="w-full space-y-2">
                                <Label htmlFor="image_url">URL de la foto de perfil</Label>
                                {/* --- CORRECCIÓN AQUÍ --- */}
                                <Input id="image_url" value={profileData.image_url || ''} onChange={e => handleProfileChange('image_url', e.target.value)} placeholder="https://ejemplo.com/foto.png" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2"><Label htmlFor="nombre">Nombre</Label><Input id="nombre" value={profileData.nombre || ''} onChange={e => handleProfileChange('nombre', e.target.value)} /></div>
                            <div className="space-y-2"><Label htmlFor="apellido">Apellido</Label><Input id="apellido" value={profileData.apellido || ''} onChange={e => handleProfileChange('apellido', e.target.value)} /></div>
                        </div>
                        <div className="space-y-2"><Label htmlFor="email">Correo electrónico</Label><Input id="email" type="email" value={profileData.email || ''} onChange={e => handleProfileChange('email', e.target.value)} /></div>
                        <div className="space-y-2"><Label htmlFor="provincia">Provincia</Label><Input id="provincia" value={profileData.provincia || ''} onChange={e => handleProfileChange('provincia', e.target.value)} /></div>
                        <div className="space-y-2"><Label htmlFor="bio">Biografía (opcional)</Label><Textarea id="bio" placeholder="Cuéntanos un poco sobre ti..." value={profileData.bio || ''} onChange={e => handleProfileChange('bio', e.target.value)} /></div>
                    </CardContent>
                    <CardFooter><Button type="submit">Guardar cambios</Button></CardFooter>
                  </form>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Estadísticas y Áreas de Interés</CardTitle><CardDescription>Tu participación y temas que te interesan.</CardDescription></CardHeader>
                  <CardContent>
                    <h3 className="text-lg font-medium mb-4">Estadísticas de participación</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-primary/5 p-4 rounded-lg text-center"><p className="text-2xl font-bold">{stats.problematicasCount}</p><p className="text-sm text-muted-foreground">Problemáticas</p></div>
                      <div className="bg-primary/5 p-4 rounded-lg text-center"><p className="text-2xl font-bold">{stats.commentCount}</p><p className="text-sm text-muted-foreground">Comentarios</p></div>
                    </div>
                    <h3 className="text-lg font-medium mb-4">Áreas de interés</h3>
                    <div className="flex flex-wrap gap-2">
                        {ALL_CATEGORIES.map(category => (
                            <Badge key={category} variant={profileData.interests.includes(category) ? 'default' : 'outline'} onClick={() => handleInterestToggle(category)} className="cursor-pointer text-base py-1 px-3">
                                {category}
                            </Badge>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">Selecciona las categorías que más te interesan para personalizar tu experiencia.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="participacion" className="py-6">
                <Card>
                  <CardHeader><CardTitle>Historial de participación</CardTitle><CardDescription>Revisa tu actividad en la plataforma.</CardDescription></CardHeader>
                  <CardContent>
                    <UserParticipationHistory history={participationHistory} />
                  </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="privacidad" className="py-6">
                <Card>
                    <form onSubmit={handlePasswordSubmit}>{/* ... Formulario de contraseña ... */}</form>
                </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}