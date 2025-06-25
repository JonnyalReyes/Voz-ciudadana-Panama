// src/app/api/user/history/route.ts
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
        const sql = `
            SELECT 
                fc.id, 
                fc.comment_text, 
                fc.created_at, 
                p.id as problematica_id, 
                p.title as problematica_title
            FROM forum_comments fc
            JOIN problematicas p ON fc.problematica_id = p.id
            WHERE fc.user_id = ?
            ORDER BY fc.created_at DESC
        `;
        
        const [comments] = await db.query(sql, [userId]);
        return NextResponse.json(comments);

    } catch (error) {
        console.error("Error al obtener el historial:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}