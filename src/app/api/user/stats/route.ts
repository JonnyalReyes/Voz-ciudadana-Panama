// src/app/api/user/stats/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import db from '@/src/lib/db';

export async function GET() {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const userId = session.user.id;

        // Contar problemáticas en las que ha participado (encuestas respondidas)
        const problematicasSql = `
            SELECT COUNT(DISTINCT q.problematica_id) as problematicasCount 
            FROM answers a 
            JOIN questions q ON a.question_id = q.id 
            WHERE a.user_id = ?
        `;
        const [problematicaRows]: any[] = await db.query(problematicasSql, [userId]);
        const problematicasCount = problematicaRows[0]?.problematicaCount || 0;
        
        // Contar comentarios en foros
        const commentsSql = "SELECT COUNT(*) as commentCount FROM forum_comments WHERE user_id = ?";
        const [commentRows]: any[] = await db.query(commentsSql, [userId]);
        const commentCount = commentRows[0]?.commentCount || 0;

        return NextResponse.json({ problematicasCount, commentCount });

    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}