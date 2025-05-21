import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Download, Share2 } from "lucide-react"

export default function ResultsVisualization() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Resultados de participación</h2>
          <p className="text-gray-500">
            Análisis de las opiniones y propuestas ciudadanas sobre la mejora del sistema educativo panameño.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Descargar informe
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            Compartir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Participación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold">1,245</p>
                <p className="text-sm text-gray-500">Opiniones</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold">324</p>
                <p className="text-sm text-gray-500">Propuestas</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold">89</p>
                <p className="text-sm text-gray-500">Comentarios</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold">756</p>
                <p className="text-sm text-gray-500">Participantes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Evaluación general del sistema educativo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Muy deficiente</span>
                <div className="w-full max-w-md mx-4">
                  <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Deficiente</span>
                <div className="w-full max-w-md mx-4">
                  <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "35%" }}></div>
                  </div>
                </div>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Regular</span>
                <div className="w-full max-w-md mx-4">
                  <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bueno</span>
                <div className="w-full max-w-md mx-4">
                  <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "8%" }}></div>
                  </div>
                </div>
                <span className="text-sm font-medium">8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Excelente</span>
                <div className="w-full max-w-md mx-4">
                  <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "2%" }}></div>
                  </div>
                </div>
                <span className="text-sm font-medium">2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="factores" className="w-full">
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="factores">Factores críticos</TabsTrigger>
          <TabsTrigger value="prioridades">Prioridades</TabsTrigger>
          <TabsTrigger value="propuestas">Propuestas destacadas</TabsTrigger>
        </TabsList>

        <TabsContent value="factores" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Factores críticos que afectan la calidad educativa</CardTitle>
              <CardDescription>Según la percepción de los participantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Formación y capacitación docente</span>
                  <div className="w-full max-w-md mx-4">
                    <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Infraestructura y recursos educativos</span>
                  <div className="w-full max-w-md mx-4">
                    <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Currículo desactualizado</span>
                  <div className="w-full max-w-md mx-4">
                    <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "62%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">62%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Acceso a tecnología</span>
                  <div className="w-full max-w-md mx-4">
                    <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "58%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">58%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gestión y administración educativa</span>
                  <div className="w-full max-w-md mx-4">
                    <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Financiamiento insuficiente</span>
                  <div className="w-full max-w-md mx-4">
                    <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Participación de las familias</span>
                  <div className="w-full max-w-md mx-4">
                    <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "38%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">38%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Desigualdad socioeconómica</span>
                  <div className="w-full max-w-md mx-4">
                    <div className="h-3 bg-primary/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prioridades" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Áreas prioritarias para la mejora educativa</CardTitle>
              <CardDescription>Según la percepción de los participantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Prioridad #1: Formación docente</h3>
                  <p className="text-gray-500 mb-4">
                    El 42% de los participantes considera que la formación y las condiciones laborales de los docentes
                    deberían ser la principal prioridad para mejorar el sistema educativo.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">Aspectos destacados:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                      <li>Actualización de conocimientos pedagógicos</li>
                      <li>Formación en competencias digitales</li>
                      <li>Mejora de condiciones salariales</li>
                      <li>Sistemas de incentivos basados en desempeño</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Prioridad #2: Infraestructura escolar</h3>
                  <p className="text-gray-500 mb-4">
                    El 28% de los participantes considera que la mejora de la infraestructura escolar debería ser
                    prioritaria, especialmente en zonas rurales.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">Aspectos destacados:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                      <li>Mantenimiento de edificios escolares</li>
                      <li>Equipamiento de laboratorios y bibliotecas</li>
                      <li>Acceso a servicios básicos (agua, electricidad)</li>
                      <li>Conectividad a internet</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Prioridad #3: Actualización curricular</h3>
                  <p className="text-gray-500 mb-4">
                    El 18% de los participantes considera prioritaria la actualización de los contenidos curriculares
                    para adaptarlos a las necesidades del siglo XXI.
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">Aspectos destacados:</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-500">
                      <li>Enfoque en competencias y habilidades prácticas</li>
                      <li>Incorporación de tecnologías digitales</li>
                      <li>Educación socioemocional</li>
                      <li>Pertinencia cultural y contextual</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Otras prioridades</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Tecnologías educativas</span>
                        <span className="text-sm font-medium">12%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "12%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Sistemas de evaluación</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Educación inclusiva</span>
                        <span className="text-sm font-medium">8%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "8%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Reforma de gestión</span>
                        <span className="text-sm font-medium">6%</span>
                      </div>
                      <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "6%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="propuestas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Propuestas ciudadanas destacadas</CardTitle>
              <CardDescription>
                Selección de las propuestas más relevantes y con mayor respaldo ciudadano
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Formación docente</Badge>
                    <Badge variant="outline">78 apoyos</Badge>
                  </div>
                  <h3 className="text-lg font-bold">
                    Programa nacional de formación docente en competencias digitales
                  </h3>
                  <p className="text-gray-500 mt-2">
                    Implementar un programa integral de capacitación para docentes en el uso de herramientas digitales y
                    metodologías innovadoras, con énfasis en zonas rurales. El programa incluiría formación presencial y
                    virtual, acompañamiento continuo y evaluación de impacto en el aula.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>Propuesta por: María González</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Infraestructura</Badge>
                    <Badge variant="outline">65 apoyos</Badge>
                  </div>
                  <h3 className="text-lg font-bold">Red de conectividad para escuelas rurales</h3>
                  <p className="text-gray-500 mt-2">
                    Crear una red nacional de conectividad que garantice acceso a internet de calidad en todas las
                    escuelas rurales, mediante alianzas público-privadas y el uso de tecnologías alternativas como
                    satélite o redes comunitarias. Incluiría también la dotación de dispositivos y capacitación para su
                    uso.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>Propuesta por: Carlos Mendoza</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Currículo</Badge>
                    <Badge variant="outline">62 apoyos</Badge>
                  </div>
                  <h3 className="text-lg font-bold">Actualización curricular basada en competencias</h3>
                  <p className="text-gray-500 mt-2">
                    Reformular el currículo educativo con enfoque en competencias para el siglo XXI: pensamiento
                    crítico, creatividad, colaboración, comunicación, ciudadanía digital y aprendizaje autónomo.
                    Incorporar metodologías activas como aprendizaje basado en proyectos y problemas reales.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>Propuesta por: Ana Castillo</span>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Gestión</Badge>
                    <Badge variant="outline">45 apoyos</Badge>
                  </div>
                  <h3 className="text-lg font-bold">Sistema de mentorías para docentes noveles</h3>
                  <p className="text-gray-500 mt-2">
                    Implementar un programa nacional donde docentes experimentados y de excelencia acompañen a los
                    nuevos educadores durante sus primeros tres años de ejercicio profesional, con observaciones de
                    clase, retroalimentación constructiva y comunidades de aprendizaje profesional.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span>Propuesta por: Roberto Díaz</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-primary/5 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Conclusiones y próximos pasos</h3>
        <p className="text-gray-500 mb-4">
          El análisis de las opiniones y propuestas ciudadanas revela un consenso sobre la necesidad de mejorar la
          formación docente, actualizar la infraestructura escolar (especialmente en zonas rurales) y reformular el
          currículo educativo para adaptarlo a las necesidades del siglo XXI.
        </p>
        <p className="text-gray-500 mb-4">
          Las propuestas destacadas serán presentadas al Ministerio de Educación y a la Comisión de Educación de la
          Asamblea Nacional como insumos para la formulación de políticas públicas. Adicionalmente, se organizarán mesas
          de trabajo con representantes de los diferentes sectores para profundizar en las soluciones propuestas.
        </p>
        <p className="text-gray-500">
          Se realizará un seguimiento semestral para evaluar el avance en la implementación de las propuestas adoptadas
          y se informará a la ciudadanía a través de esta plataforma.
        </p>
      </div>
    </div>
  )
}
