import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Alert, AlertDescription } from "../components/ui/alert"
import { AlertTriangle } from "lucide-react"
import Image from "next/image"

export default function ProblematicaContent() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="resumen" className="w-full">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="resumen">La Problemática</TabsTrigger>
          <TabsTrigger value="antecedentes">Antecedentes</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="mt-6 space-y-4">
          <h2 className="text-2xl font-bold">La problemática de la Ley 462</h2>
          <p>
            La aprobación de la Ley 462 en diciembre de 2023 ha generado una crisis de confianza sin precedentes entre
            la ciudadanía panameña y la Caja del Seguro Social. Esta ley, que reforma el sistema de seguridad social,
            fue aprobada en medio de protestas y críticas por la falta de consulta ciudadana adecuada.
          </p>
          <p>
            Los principales puntos de controversia incluyen el aumento significativo de las cotizaciones al 12.25%,
            cambios en los requisitos de jubilación, y la percepción generalizada de que estos sacrificios no garantizan
            una mejora real en la calidad de los servicios que brinda la CSS.
          </p>
          <p>
            La ciudadanía expresa frustración por tener que pagar más por servicios que consideran deficientes,
            caracterizados por largas esperas, falta de medicamentos, infraestructura deteriorada y problemas
            administrativos crónicos. Además, existe una profunda desconfianza sobre la transparencia en el manejo de
            los recursos públicos.
          </p>

          <div className="relative h-[300px] overflow-hidden rounded-xl my-6">
            <Image
              src="/image3.png?height=300&width=800"
              alt="Protestas ciudadanas contra la Ley 462"
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-xl font-bold mt-6">Principales preocupaciones ciudadanas</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>¿Por qué debo pagar más si los servicios siguen siendo deficientes?</li>
            <li>¿Cómo garantizan que el dinero adicional mejorará realmente la CSS?</li>
            <li>¿Por qué no se consultó adecuadamente a la ciudadanía antes de aprobar la ley?</li>
            <li>¿Qué medidas concretas se tomarán para combatir la corrupción y mejorar la gestión?</li>
            <li>¿Cómo afectará esto a las familias que ya enfrentan dificultades económicas?</li>
          </ul>
        </TabsContent>

        <TabsContent value="antecedentes" className="mt-6 space-y-4">
          <h2 className="text-2xl font-bold">Antecedentes de la controversia</h2>
          <p>
            La crisis de la CSS no es nueva. Durante décadas, los panameños han experimentado un deterioro progresivo en
            la calidad de los servicios, mientras que los problemas financieros de la institución se han agravado. Las
            reformas anteriores, como la Ley 51 de 2005, no lograron resolver los problemas estructurales.
          </p>
          <p>
            El déficit actuarial de la CSS ha crecido exponencialmente, pero la ciudadanía percibe que esto se debe más
            a la mala gestión, corrupción y falta de transparencia que a factores demográficos inevitables. Los
            escándalos de corrupción, como el caso de los sobrecostos en hospitales y la compra irregular de equipos
            médicos, han erosionado la confianza pública.
          </p>
          <p>
            La pandemia de COVID-19 expuso aún más las deficiencias del sistema, con hospitales colapsados, falta de
            insumos básicos y una respuesta administrativa deficiente que afectó tanto a pacientes como al personal de
            salud.
          </p>

          <h3 className="text-xl font-bold mt-6">El proceso de aprobación controvertido</h3>
          <p>
            La Ley 462 fue aprobada en un proceso que muchos ciudadanos consideran apresurado y sin la consulta
            adecuada. A pesar de las protestas callejeras, manifestaciones de trabajadores y críticas de diversos
            sectores de la sociedad, la Asamblea Nacional procedió con la aprobación.
          </p>
          <p>
            Los sindicatos, organizaciones de la sociedad civil y ciudadanos comunes expresaron que no se sintieron
            escuchados en el proceso. Esta percepción de imposición ha alimentado el rechazo y la desconfianza hacia la
            reforma.
          </p>
          <p>
            Las protestas posteriores a la aprobación han demostrado el nivel de malestar ciudadano, con manifestaciones
            que han incluido paros laborales, marchas y expresiones de rechazo en redes sociales.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
