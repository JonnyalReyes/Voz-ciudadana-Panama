import { Button } from "../components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary/5">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Tu voz importa para construir un mejor Panamá
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Voz Ciudadana Panamá es una plataforma digital que facilita la participación informada y la deliberación
              constructiva sobre los desafíos que enfrenta nuestra nación.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <Link href="/problematicas">Explorar problemáticas</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/registro">Crear una cuenta</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
            <Image
              src="/placeholder.svg?height=500&width=800"
              alt="Ciudadanos participando"
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
