import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Users, FileText, MessageSquare } from "lucide-react"
import HeroSection from "../components/hero-section"
import FeaturedProblematicas from "../components/featured-problematicas"
import ParticipationStats from "../components/participation-stats"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">¿Cómo funciona?</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Nuestra plataforma facilita la participación ciudadana a través de un proceso estructurado y transparente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">1. Informarse</CardTitle>
              </CardHeader>
              <CardContent>
                <FileText className="h-12 w-12 mb-4 text-primary" />
                <p className="text-gray-500">
                  Accede a información detallada y contextualizada sobre las problemáticas nacionales.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">2. Opinar</CardTitle>
              </CardHeader>
              <CardContent>
                <MessageSquare className="h-12 w-12 mb-4 text-primary" />
                <p className="text-gray-500">
                  Comparte tus opiniones y propuestas a través de formularios estructurados.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">3. Co-crear</CardTitle>
              </CardHeader>
              <CardContent>
                <Users className="h-12 w-12 mb-4 text-primary" />
                <p className="text-gray-500">
                  Participa en la deliberación y colabora en la búsqueda de soluciones consensuadas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Problemáticas Destacadas</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Explora los temas más relevantes que afectan a Panamá y contribuye con tus ideas.
            </p>
          </div>

          <FeaturedProblematicas />

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
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Impacto Ciudadano</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Juntos estamos construyendo un Panamá más participativo y democrático.
            </p>
          </div>

          <ParticipationStats />
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Únete a la conversación</h2>
              <p className="text-gray-500 md:text-xl/relaxed">
                Tu voz es importante. Regístrate hoy y comienza a contribuir en la búsqueda de soluciones para los
                desafíos que enfrenta nuestro país.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <Link href="/registro">Crear una cuenta</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/como-funciona">Conoce más</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Ciudadanos participando"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
