import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, FileText, MessageSquare, Shield } from "lucide-react"
import HeroSection from "../components/hero-section"
import ParticipationStats from "../components/participation-stats"
import FeaturedProblematicas from "../components/featured-problematicas"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Participación ciudadana verificada
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
              En Habla Panamá, garantizamos un diálogo responsable mediante un proceso de verificación que asegura la
              participación de ciudadanos comprometidos con el bienestar nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">1. Verificación ciudadana</CardTitle>
              </CardHeader>
              <CardContent>
                <Shield className="h-12 w-12 mb-4 text-primary" />
                <p className="text-gray-500">
                  Proceso de verificación de antecedentes para garantizar la participación responsable en el diálogo
                  nacional.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">2. Información verificada</CardTitle>
              </CardHeader>
              <CardContent>
                <FileText className="h-12 w-12 mb-4 text-primary" />
                <p className="text-gray-500">
                  Accede a información objetiva y contextualizada sobre las problemáticas que afectan a Panamá.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">3. Diálogo constructivo</CardTitle>
              </CardHeader>
              <CardContent>
                <MessageSquare className="h-12 w-12 mb-4 text-primary" />
                <p className="text-gray-500">
                  Participa en discusiones moderadas y contribuye con propuestas viables para el desarrollo nacional.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Participación Ciudadana</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
              Ciudadanos verificados contribuyendo al diálogo nacional sobre las problemáticas de Panamá.
            </p>
          </div>

          <ParticipationStats />
        </div>
      </section>

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
    </div>
  )
}
