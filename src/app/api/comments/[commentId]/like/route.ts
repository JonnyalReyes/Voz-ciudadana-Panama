// En: src/app/api/comments/[commentId]/like/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import db from '@/src/lib/db';

export async function POST(request: Request, { params }: { params: { commentId: string } }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ message: 'No autorizado' }, { status: 401 });

    const { commentId } = params;
    const userId = session.user.id;

    try {
        // Intenta borrar primero (quitar like)
        const [deleteResult]: any = await db.query(
            "DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?", 
            [userId, commentId]
        );

        // Si no se borró nada, significa que no había like, entonces lo insertamos
        if (deleteResult.affectedRows === 0) {
            await db.query(
                "INSERT INTO comment_likes (user_id, comment_id) VALUES (?, ?)", 
                [userId, commentId]
            );
            return NextResponse.json({ message: 'Like añadido' });
        }

        return NextResponse.json({ message: 'Like quitado' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    }
}