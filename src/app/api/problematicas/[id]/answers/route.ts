// En: src/app/api/problematicas/[id]/answers/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import db from '@/src/lib/db';

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const userId = session.user.id;
        const { answers } = await request.json();

        for (const questionId in answers) {
            const answer = answers[questionId];
            const sql = "INSERT INTO answers (question_id, user_id, text_answer) VALUES (?, ?, ?)";
            await db.query(sql, [questionId, userId, answer]);
        }

        return NextResponse.json({ message: "Respuesta enviada con éxito" }, { status: 201 });
    } catch (error) {
        console.error("Error al guardar respuesta:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}