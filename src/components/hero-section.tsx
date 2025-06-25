// src/components/hero-section.tsx
import { Button } from "../components/ui/button"
import Link from "next/link"
import Image from "next/image"
import type { Session } from "next-auth" // Importamos el tipo Session

// El componente ahora recibe la sesión como prop
export default function HeroSection({ session }: { session: Session | null }) {
  const isLoggedIn = !!session;
  const userName = session?.user?.name;

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              {/* Mensaje personalizado si el usuario ha iniciado sesión */}
              {isLoggedIn ? `Bienvenido, ${userName}` : "Tu voz importa en el futuro de Panamá"}
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Habla Panamá es una plataforma digital que facilita la participación ciudadana verificada en las
              problemáticas nacionales. Únete a una comunidad comprometida con el desarrollo responsable del país.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/problematicas">Explorar problemáticas</Link>
              </Button>
              {/* Ocultamos el botón de registro si ya inició sesión */}
              {!isLoggedIn && (
                <Button asChild variant="outline" size="lg">
                  <Link href="/registro">Solicitar verificación</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
            <Image
              src="/image1.png?height=500&width=800"
              alt="Ciudadanos participando en el diálogo nacional"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}