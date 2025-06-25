// En: src/app/api/problematicas/[id]/comments/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import db from '@/src/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const sql = `
        SELECT fc.*, u.nombre, u.apellido,
            (SELECT COUNT(*) FROM comment_likes WHERE comment_id = fc.id) as likes
        FROM forum_comments fc
        JOIN users u ON fc.user_id = u.id
        WHERE fc.problematica_id = ? AND fc.parent_comment_id IS NULL
        ORDER BY fc.created_at DESC
    `;
    const [comments] = await db.query(sql, [params.id]);
    return NextResponse.json(comments);
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ message: 'No autorizado' }, { status: 401 });

    const { comment_text } = await request.json();
    const sql = "INSERT INTO forum_comments (problematica_id, user_id, comment_text) VALUES (?, ?, ?)";
    await db.query(sql, [params.id, session.user.id, comment_text]);

    return NextResponse.json({ message: "Comentario publicado" }, { status: 201 });
}