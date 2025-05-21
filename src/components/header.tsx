"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { ThemeToggle } from "../components/theme-toggle"
import { Search, Menu, Bell, User, LogOut, Settings } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Simulación de estado de autenticación
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Voz Ciudadana Panamá</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link
              href="/problematicas"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/problematicas") ? "text-primary" : "text-foreground/60"}`}
            >
              Problemáticas
            </Link>
            <Link
              href="/como-funciona"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/como-funciona") ? "text-primary" : "text-foreground/60"}`}
            >
              Cómo Funciona
            </Link>
            <Link
              href="/resultados"
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/resultados") ? "text-primary" : "text-foreground/60"}`}
            >
              Resultados
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex relative w-40 lg:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Buscar..." className="pl-8" />
          </div>

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
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@usuario" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/perfil" className="cursor-pointer flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil?tab=notificaciones" className="cursor-pointer flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <span>Notificaciones</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/perfil?tab=configuracion" className="cursor-pointer flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Configuración</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-destructive">
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
                <Link href="/registro">Registrarse</Link>
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
                    <span className="font-bold">Voz Ciudadana Panamá</span>
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
                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/problematicas") ? "text-primary" : "text-foreground/60"}`}
                  >
                    Problemáticas
                  </Link>
                  <Link
                    href="/como-funciona"
                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/como-funciona") ? "text-primary" : "text-foreground/60"}`}
                  >
                    Cómo Funciona
                  </Link>
                  <Link
                    href="/resultados"
                    className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/resultados") ? "text-primary" : "text-foreground/60"}`}
                  >
                    Resultados
                  </Link>
                </nav>

                {isLoggedIn ? (
                  <div className="grid gap-2">
                    <Link href="/perfil" className="flex items-center gap-2 text-sm font-medium">
                      <User className="h-4 w-4" />
                      <span>Mi perfil</span>
                    </Link>
                    <Button variant="destructive" className="gap-2">
                      <LogOut className="h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Button asChild>
                      <Link href="/registro">Registrarse</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/registro?tab=iniciar-sesion">Iniciar sesión</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
