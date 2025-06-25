import { Button } from "../../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import PageHeader from "../../components/page-header";
import { auth } from "../../auth"; 

export default async function ComoFuncionaPage() { // <-- 2. CONVERTIMOS LA FUNCIÓN EN ASYNC
  const session = await auth(); // Obtenemos la sesión en el servidor

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="¿Cómo Funciona?"
        description="Conoce el proceso de participación ciudadana en nuestra plataforma."
      />

      <section className="py-8 md:py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:gap-16">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">Fase 1</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Publicación y Contextualización</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Nuestro equipo editorial investiga y publica un dossier exhaustivo sobre una problemática nacional
                  específica, proporcionando información clara, objetiva y contextualizada.
                </p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Descripción clara del problema con lenguaje accesible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Antecedentes históricos y contexto socio-político</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Datos cuantitativos y cualitativos con fuentes verificables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Identificación de actores involucrados y sus posturas</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Publicación de problemáticas"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1 relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Recolección de opiniones"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">Fase 2</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Recolección de Opiniones y Propuestas
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Habilitamos formularios específicos para cada problemática, diseñados para recopilar tanto datos
                  cuantitativos como opiniones cualitativas y propuestas detalladas.
                </p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Preguntas cerradas para medir percepciones generales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Preguntas abiertas para análisis profundos y propuestas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Diseño imparcial y efectivo para evitar sesgos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Posibilidad de guardar borradores antes del envío final</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">Fase 3</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Discusión y Debate</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Facilitamos espacios de discusión moderados donde los ciudadanos pueden interactuar, debatir sobre las
                  opiniones y propuestas, y construir sobre las ideas presentadas.
                </p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Foros de discusión temáticos moderados activamente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Posibilidad de valorar o apoyar propuestas específicas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Ambiente constructivo, respetuoso y libre de desinformación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Construcción colectiva de ideas y soluciones</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Discusión y debate"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1 relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Análisis y visualización"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">Fase 4</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Análisis, Síntesis y Visualización</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Nuestro equipo analiza rigurosamente todas las respuestas e interacciones para identificar tendencias,
                  consensos y propuestas destacadas.
                </p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Identificación de temas emergentes y patrones en las opiniones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Cuantificación de tendencias a partir de preguntas cerradas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Sistematización y categorización de propuestas de solución</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Visualizaciones claras y accesibles de los resultados</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">Fase 5</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Publicación y Promoción de Soluciones
                </h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Publicamos los resultados y promovemos activamente que las propuestas ciudadanas lleguen a los
                  tomadores de decisiones relevantes.
                </p>
                <ul className="space-y-2 text-gray-500">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Informes de síntesis accesibles para consulta pública</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Difusión a tomadores de decisiones, medios y sociedad civil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Seguimiento a la implementación de propuestas viables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Retroalimentación continua sobre el impacto generado</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Publicación de resultados"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* 3. AÑADIMOS LA CONDICIÓN PARA MOSTRAR LA SECCIÓN SOLO SI NO HAY SESIÓN */}
          {!session && (
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">¿Listo para participar?</h2>
              <p className="text-gray-500 md:text-lg/relaxed max-w-[700px] mx-auto mb-6">
                Únete a Voz Ciudadana Panamá y comienza a contribuir en la búsqueda de soluciones para los desafíos que
                enfrenta nuestro país.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg">
                  <Link href="/registro">Crear una cuenta</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/problematicas">Explorar problemáticas</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}