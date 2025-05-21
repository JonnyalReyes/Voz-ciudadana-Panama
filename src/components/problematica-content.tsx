import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Image from "next/image"

export default function ProblematicaContent() {
  return (
    <div className="space-y-8">
      <Tabs defaultValue="resumen" className="w-full">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="antecedentes">Antecedentes</TabsTrigger>
          <TabsTrigger value="datos">Datos clave</TabsTrigger>
          <TabsTrigger value="actores">Actores</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="mt-6 space-y-4">
          <h2 className="text-2xl font-bold">Resumen de la problemática</h2>
          <p>
            El sistema educativo panameño enfrenta desafíos significativos que afectan la calidad y equidad de la
            educación en todos los niveles. A pesar de las inversiones realizadas en infraestructura y programas
            educativos, persisten brechas importantes en el acceso, la permanencia y los resultados de aprendizaje,
            especialmente en zonas rurales e indígenas.
          </p>
          <p>
            Las pruebas internacionales como PISA han evidenciado que los estudiantes panameños obtienen resultados por
            debajo del promedio regional en áreas fundamentales como matemáticas, ciencias y comprensión lectora.
            Adicionalmente, la pandemia de COVID-19 ha exacerbado las desigualdades existentes y ha puesto de manifiesto
            la necesidad de fortalecer las competencias digitales tanto de docentes como de estudiantes.
          </p>
          <p>
            Esta problemática requiere un abordaje integral que considere aspectos como la formación y valoración
            docente, la actualización curricular, la infraestructura educativa, la incorporación efectiva de
            tecnologías, y la participación de las familias y comunidades en el proceso educativo.
          </p>

          <div className="relative h-[300px] overflow-hidden rounded-xl my-6">
            <Image
              src="/placeholder.svg?height=300&width=800"
              alt="Sistema educativo panameño"
              fill
              className="object-cover"
            />
          </div>

          <h3 className="text-xl font-bold mt-6">Preguntas para la reflexión</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>¿Cuáles consideras que son los principales factores que afectan la calidad educativa en Panamá?</li>
            <li>
              ¿Qué estrategias podrían implementarse para reducir las brechas educativas entre zonas urbanas y rurales?
            </li>
            <li>¿Cómo podría mejorarse la formación y las condiciones laborales de los docentes?</li>
            <li>¿Qué papel deberían jugar las tecnologías digitales en la transformación del sistema educativo?</li>
            <li>
              ¿Qué medidas consideras prioritarias para mejorar los resultados de aprendizaje de los estudiantes
              panameños?
            </li>
          </ul>
        </TabsContent>

        <TabsContent value="antecedentes" className="mt-6 space-y-4">
          <h2 className="text-2xl font-bold">Antecedentes históricos</h2>
          <p>
            El sistema educativo panameño ha experimentado diversas reformas a lo largo de las últimas décadas, con
            avances significativos en cobertura pero desafíos persistentes en calidad. La Ley Orgánica de Educación de
            1946 sentó las bases del sistema actual, mientras que la reforma educativa de los años 90 buscó modernizar
            el currículo y la gestión educativa.
          </p>
          <p>
            En 2010, se implementó el programa "Para la Vida", que introdujo cambios curriculares orientados al
            desarrollo de competencias. Más recientemente, el Plan Estratégico Nacional con Visión de Estado "Panamá
            2030" estableció la educación como uno de sus ejes prioritarios, reconociendo su papel fundamental en el
            desarrollo sostenible del país.
          </p>
          <p>
            Sin embargo, a pesar de estos esfuerzos, los indicadores educativos muestran avances insuficientes. La
            participación de Panamá en evaluaciones internacionales como PISA en 2009 y 2018 reveló resultados
            preocupantes, ubicando al país por debajo del promedio regional y evidenciando la necesidad de
            transformaciones profundas en el sistema.
          </p>

          <h3 className="text-xl font-bold mt-6">Contexto socio-político</h3>
          <p>
            La educación en Panamá se desarrolla en un contexto de crecimiento económico sostenido pero con altos
            niveles de desigualdad. El país ha experimentado un notable desarrollo en sectores como servicios
            financieros, logística y turismo, pero estos beneficios no se han distribuido equitativamente entre la
            población.
          </p>
          <p>
            Las políticas educativas han estado sujetas a cambios con cada administración gubernamental, lo que ha
            dificultado la continuidad de programas y reformas. Adicionalmente, la inversión en educación como
            porcentaje del PIB (aproximadamente 3.2%) se mantiene por debajo del promedio regional y de las
            recomendaciones internacionales.
          </p>
          <p>
            La pandemia de COVID-19 evidenció y profundizó las brechas digitales existentes, afectando particularmente a
            estudiantes de zonas rurales e indígenas que carecían de conectividad y dispositivos para participar en la
            educación a distancia.
          </p>
        </TabsContent>

        <TabsContent value="datos" className="mt-6 space-y-4">
          <h2 className="text-2xl font-bold">Datos clave</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Indicadores generales</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Tasa neta de matrícula primaria:</span>
                  <span className="font-medium">95%</span>
                </li>
                <li className="flex justify-between">
                  <span>Tasa neta de matrícula secundaria:</span>
                  <span className="font-medium">76%</span>
                </li>
                <li className="flex justify-between">
                  <span>Tasa de deserción escolar:</span>
                  <span className="font-medium">12%</span>
                </li>
                <li className="flex justify-between">
                  <span>Años promedio de escolaridad:</span>
                  <span className="font-medium">10.2 años</span>
                </li>
                <li className="flex justify-between">
                  <span>Inversión en educación (% del PIB):</span>
                  <span className="font-medium">3.2%</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Resultados PISA 2018</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Puntaje en Lectura:</span>
                  <span className="font-medium">377 (promedio OCDE: 487)</span>
                </li>
                <li className="flex justify-between">
                  <span>Puntaje en Matemáticas:</span>
                  <span className="font-medium">353 (promedio OCDE: 489)</span>
                </li>
                <li className="flex justify-between">
                  <span>Puntaje en Ciencias:</span>
                  <span className="font-medium">365 (promedio OCDE: 489)</span>
                </li>
                <li className="flex justify-between">
                  <span>Posición entre países participantes:</span>
                  <span className="font-medium">71 de 79</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Brechas educativas</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>La tasa de analfabetismo en zonas rurales (8.3%) es tres veces mayor que en zonas urbanas (2.7%).</li>
              <li>
                Solo el 45% de los estudiantes de comarcas indígenas completa la educación secundaria, comparado con el
                78% en áreas urbanas.
              </li>
              <li>
                El 68% de las escuelas en zonas rurales carece de acceso adecuado a internet, frente al 12% en zonas
                urbanas.
              </li>
              <li>
                La ratio estudiante-docente en zonas rurales es de 28:1, mientras que en zonas urbanas es de 22:1.
              </li>
              <li>
                Solo el 35% de los docentes en zonas rurales ha recibido capacitación en metodologías pedagógicas
                innovadoras, comparado con el 65% en zonas urbanas.
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Fuentes: Instituto Nacional de Estadística y Censo (INEC), Ministerio de Educación de Panamá, OCDE
            (Resultados PISA 2018), UNICEF Panamá.
          </p>
        </TabsContent>

        <TabsContent value="actores" className="mt-6 space-y-4">
          <h2 className="text-2xl font-bold">Actores involucrados</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold">Sector público</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <span className="font-medium">Ministerio de Educación (MEDUCA):</span> Ente rector del sistema
                  educativo, responsable de formular e implementar políticas educativas, gestionar centros educativos
                  públicos y supervisar los privados.
                </li>
                <li>
                  <span className="font-medium">
                    Instituto para la Formación y Aprovechamiento de Recursos Humanos (IFARHU):
                  </span>{" "}
                  Administra programas de becas y créditos educativos para estudiantes panameños.
                </li>
                <li>
                  <span className="font-medium">
                    Secretaría Nacional de Ciencia, Tecnología e Innovación (SENACYT):
                  </span>{" "}
                  Promueve la investigación científica y la innovación educativa.
                </li>
                <li>
                  <span className="font-medium">Universidades públicas:</span> Forman profesionales, incluyendo
                  docentes, y realizan investigación educativa.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold">Sector privado</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <span className="font-medium">Centros educativos privados:</span> Ofrecen alternativas educativas, a
                  menudo con enfoques pedagógicos diferenciados.
                </li>
                <li>
                  <span className="font-medium">Empresas y fundaciones empresariales:</span> Algunas apoyan programas
                  educativos como parte de su responsabilidad social corporativa.
                </li>
                <li>
                  <span className="font-medium">Editoriales y proveedores de tecnología educativa:</span> Suministran
                  recursos didácticos y soluciones tecnológicas para el aprendizaje.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold">Sociedad civil</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <span className="font-medium">Organizaciones no gubernamentales:</span> Implementan programas
                  complementarios, especialmente en comunidades vulnerables.
                </li>
                <li>
                  <span className="font-medium">Asociaciones de padres de familia:</span> Participan en la gestión
                  escolar y abogan por mejoras en la calidad educativa.
                </li>
                <li>
                  <span className="font-medium">Gremios docentes:</span> Representan los intereses del profesorado y
                  participan en diálogos sobre políticas educativas.
                </li>
                <li>
                  <span className="font-medium">Organizaciones estudiantiles:</span> Expresan las necesidades y
                  perspectivas de los estudiantes.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold">Organismos internacionales</h3>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <span className="font-medium">UNESCO:</span> Brinda asistencia técnica y promueve estándares
                  internacionales en educación.
                </li>
                <li>
                  <span className="font-medium">UNICEF:</span> Implementa programas enfocados en la educación de la
                  primera infancia y poblaciones vulnerables.
                </li>
                <li>
                  <span className="font-medium">Banco Interamericano de Desarrollo (BID):</span> Financia proyectos de
                  mejora educativa y realiza investigaciones sobre el sector.
                </li>
                <li>
                  <span className="font-medium">Banco Mundial:</span> Apoya reformas educativas y proyectos de
                  infraestructura escolar.
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-6">Posturas y roles</h3>
          <p>
            Existe un consenso general sobre la necesidad de mejorar la calidad educativa, pero hay diferencias en
            cuanto a las prioridades y enfoques. El MEDUCA ha impulsado reformas curriculares y programas de
            capacitación docente, mientras que los gremios docentes enfatizan la necesidad de mejorar las condiciones
            laborales y la infraestructura escolar.
          </p>
          <p>
            Las organizaciones de la sociedad civil abogan por una mayor equidad en el acceso a educación de calidad,
            especialmente para poblaciones vulnerables. Por su parte, el sector empresarial ha expresado preocupación
            por la brecha entre las competencias de los graduados y las necesidades del mercado laboral.
          </p>
          <p>
            Los organismos internacionales han promovido la adopción de estándares globales y prácticas basadas en
            evidencia, financiando proyectos piloto y evaluaciones del sistema educativo.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
