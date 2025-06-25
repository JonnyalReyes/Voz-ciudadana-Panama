import { NextResponse } from 'next/server';
import db from '@/src/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    // Primero, nos aseguramos de que el ID existe en los parámetros
    if (!params.id) {
        return NextResponse.json({ message: "ID de problemática no proporcionado" }, { status: 400 });
    }
    
    const problematicaId = params.id;

    try {
        // Obtenemos todas las preguntas para una problemática
        const [questions]: any[] = await db.query(
            "SELECT * FROM questions WHERE problematica_id = ?", 
            [problematicaId]
        );

        // Para cada pregunta, obtenemos sus opciones si es necesario
        for (const q of questions) {
            if (q.question_type === 'SINGLE_CHOICE' || q.question_type === 'MULTIPLE_CHOICE') {
                const [options] = await db.query(
                    "SELECT id, option_text as text FROM question_options WHERE question_id = ?",
                    [q.id]
                );
                q.options = options;
            }
        }
        
        return NextResponse.json(questions);

    } catch (error) {
        console.error(`Error al obtener las preguntas para la problemática ${problematicaId}:`, error);
        return NextResponse.json({ message: 'Error en el servidor al obtener preguntas' }, { status: 500 });
    }
}