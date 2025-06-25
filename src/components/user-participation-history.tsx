// src/components/user-participation-history.tsx
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

// Definimos el tipo para cada item del historial
interface HistoryItem {
    id: number;
    problematica_id: number;
    problematica_title: string;
    comment_text: string;
    created_at: string;
}

// El componente ahora recibe el historial como una prop
export default function UserParticipationHistory({ history }: { history: HistoryItem[] }) {

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">Aún no has participado en ninguna discusión.</p>
        <Button asChild>
          <Link href="/problematicas">Explorar problemáticas</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <div key={item.id} className="border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className="mt-1">
                <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Comentaste en:</p>
              <h3 className="font-medium">{item.problematica_title}</h3>
              <blockquote className="mt-2 pl-4 border-l-2 italic text-gray-700">
                "{item.comment_text}"
              </blockquote>
              <p className="text-xs text-gray-500 mt-2">
                Fecha: {new Date(item.created_at).toLocaleString('es-PA')}
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild className="mt-1">
              <Link href={`/problematicas/${item.problematica_id}`}>
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Ir a la problemática</span>
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}