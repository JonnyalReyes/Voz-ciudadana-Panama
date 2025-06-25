// src/app/page.tsx
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, FileText, MessageSquare, Shield } from "lucide-react"

import HeroSection from "../components/hero-section"
import ParticipationStats from "../components/participation-stats"
import FeaturedProblematicas from "../components/featured-problematicas"

// --- Importamos la lógica de Auth y de datos ---
import { auth } from "../auth"
import { getFeaturedProblematicas } from "@/src/lib/data"

export default async function Home() {
  // --- Obtenemos la sesión y los datos en el servidor ---
  const session = await auth();
  const problematicas = await getFeaturedProblematicas();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pasamos la sesión al HeroSection */}
      <HeroSection session={session} />

      <section className="py-12 md:py-16 bg-white">
        { /* ... Esta sección no cambia ... */ }
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Problemáticas nacionales actuales
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Explora las problemáticas más relevantes que requieren la atención y participación ciudadana.
            </p>
          </div>

          {/* Pasamos las problemáticas reales al componente */}
          <FeaturedProblematicas problematicas={problematicas} />

          <div className="flex justify-center mt-8">
            <Button asChild>
              <Link href="/problematicas">
                Ver todas las problemáticas <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        { /* ... Esta sección de estadísticas no cambia ... */ }
      </section>

      {/* --- Ocultamos esta sección si el usuario ya inició sesión --- */}
      {!session && (
        <section className="py-12 md:py-16 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Únete al diálogo</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Forma parte de una comunidad de ciudadanos comprometidos con el desarrollo de Panamá. Completa nuestro
                  proceso de verificación y contribuye con tu voz al diálogo nacional.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg">
                    <Link href="/registro">Solicitar verificación</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/como-funciona">Conoce más</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/image2.png?height=400&width=600"
                  alt="Ciudadanos participando en el diálogo nacional"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}