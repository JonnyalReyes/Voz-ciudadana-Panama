// src/components/header.tsx
"use client"

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { FileText } from "lucide-react";
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react" // <-- IMPORTA ESTO
import {
  Bell,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  User,
} from "lucide-react"

import { ThemeToggle } from "../components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"

export default function Header() {
  // REEMPLAZA el estado simulado con el hook de NextAuth
  const { data: session, status } = useSession()
  const isLoggedIn = status === "authenticated"
  const isAdmin = session?.user?.role === "admin"
  // ---

  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  // Función auxiliar para obtener iniciales del nombre
  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const router = useRouter();

  // --- Estados y lógica para la búsqueda ---
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (!searchQuery || !isSearchOpen) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${searchQuery}`);
        if (response.ok) {
          setSearchResults(await response.json());
        }
      } catch (error) {
        console.error("Error al buscar:", error);
      }
    }, 300); // Debounce de 300ms

    return () => clearTimeout(timer);
  }, [searchQuery, isSearchOpen]);
  
  const handleSelectResult = useCallback((id: number) => {
    router.push(`/problematicas/${id}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  }, [router]);

  // Definimos el tipo aquí mismo para que sea claro
  interface SearchResult {
    id: number;
    title: string;
    category: string;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Habla Panamá</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/problematicas"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/problematicas")
                  ? "text-primary"
                  : "text-foreground/60"
              }`}
            >
              Problemáticas
            </Link>
            <Link
              href="/como-funciona"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/como-funciona") ? "text-primary" : "text-foreground/60"
              }`}
            >
              Cómo Funciona
            </Link>
            <Link
              href="/resultados"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/resultados") ? "text-primary" : "text-foreground/60"
              }`}
            >
              Resultados
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive("/admin") ? "text-primary" : "text-foreground/60"
                } flex items-center gap-1`}
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* La lógica de visibilidad ahora es manejada internamente por el componente Command */}
          <Command className="hidden md:flex relative rounded-lg border w-40 lg:w-64 overflow-visible">
            <CommandInput 
              placeholder="Buscar problemática..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
            />
            {/* Renderizamos la lista solo si está abierta, pero el contenido lo decide Command */}
            {isSearchOpen && (
              <CommandList className="absolute top-full mt-2 w-full rounded-md border bg-background shadow-lg z-10">
                <CommandEmpty>
                    {searchQuery.length > 1 && searchResults.length === 0 ? "No se encontraron resultados." : ""}
                </CommandEmpty>
                {searchResults.length > 0 && (
                    <CommandGroup heading="Resultados">
                        {searchResults.map((result) => (
                            <CommandItem
                                key={result.id}
                                onSelect={() => handleSelectResult(result.id)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>{result.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
              </CommandList>
            )}
          </Command>

          <ThemeToggle />

          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary"></span>
                <span className="sr-only">Notificaciones</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user?.image || undefined}
                        alt={session.user?.name || ""}
                      />
                      <AvatarFallback>
                        {getInitials(session.user?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/perfil"
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/perfil?tab=notificaciones"
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notificaciones</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin"
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <Shield className="h-4 w-4" />
                        <span>Administración</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link
                      href="/perfil?tab=configuracion"
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Configuración</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="cursor-pointer flex items-center gap-2 text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/registro?tab=iniciar-sesion">Iniciar sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/registro">Solicitar Registro</Link>
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center space-x-2">
                    <span className="font-bold">Habla Panamá</span>
                  </Link>
                  <ThemeToggle />
                </div>

                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Buscar..." className="pl-8" />
                </div>

                <nav className="grid gap-4">
                  <Link
                    href="/problematicas"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/problematicas")
                        ? "text-primary"
                        : "text-foreground/60"
                    }`}
                  >
                    Problemáticas
                  </Link>
                  <Link
                    href="/como-funciona"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/como-funciona")
                        ? "text-primary"
                        : "text-foreground/60"
                    }`}
                  >
                    Cómo Funciona
                  </Link>
                  <Link
                    href="/resultados"
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive("/resultados")
                        ? "text-primary"
                        : "text-foreground/60"
                    }`}
                  >
                    Resultados
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        isActive("/admin") ? "text-primary" : "text-foreground/60"
                      } flex items-center gap-2`}
                    >
                      <Shield className="h-4 w-4" />
                      Administración
                    </Link>
                  )}
                </nav>

                {isLoggedIn ? (
                  <div className="grid gap-2">
                    <Link
                      href="/perfil"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <User className="h-4 w-4" />
                      <span>Mi perfil</span>
                    </Link>
                    <Button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      variant="destructive"
                      className="gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Button asChild>
                      <Link href="/registro">Solicitar verificación</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/registro?tab=iniciar-sesion">
                        Iniciar sesión
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}