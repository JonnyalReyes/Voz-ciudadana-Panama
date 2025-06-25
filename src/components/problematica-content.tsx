import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import Image from "next/image";

// Definimos el tipo para la prop que recibe el componente
interface Problematica {
  title: string;
  description: string;
  content?: string;
  image_url?: string;
  // Puedes añadir más campos si los necesitas mostrar aquí
}

// El componente recibe la 'problemática' como un objeto
export default function ProblematicaContent({ problematica }: { problematica: Problematica }) {
  return (
    <div className="space-y-8">
      {/* Usamos Tabs para separar el resumen de los antecedentes si es necesario */}
      {/* Por ahora, mostramos todo junto para simplicidad */}
      
      <div className="space-y-4 prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold">La Problemática: {problematica.title}</h2>
        
        {/* Mostramos la descripción corta */}
        <p className="lead text-lg text-muted-foreground">
            {problematica.description}
        </p>

        {/* Mostramos la imagen si existe */}
        {problematica.image_url && (
            <div className="relative h-80 w-full my-6">
                <Image 
                    src={problematica.image_url} 
                    alt={problematica.title} 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-lg border" 
                />
            </div>
        )}
        
        {/* Mostramos el contenido completo */}
        <h3 className="text-xl font-bold mt-6">Contexto y Detalles</h3>
        {/* Usamos 'whitespace-pre-wrap' para respetar saltos de línea y espacios */}
        <p className="whitespace-pre-wrap">
          {problematica.content || "No hay contenido adicional disponible."}
        </p>
      </div>
    </div>
  );
}