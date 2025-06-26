// En: src/app/api/problematicas/[id]/download/forum/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../../../auth';
import db from '@/src/lib/db';
import ExcelJS from 'exceljs';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const problematicaId = params.id;
        const [problematicaRows]: any[] = await db.query("SELECT title FROM problematicas WHERE id = ?", [problematicaId]);
        const problematicaTitle = problematicaRows[0]?.title || 'Foro';

        const sql = `
            SELECT u.nombre, u.apellido, fc.comment_text, fc.created_at
            FROM forum_comments fc
            JOIN users u ON fc.user_id = u.id
            WHERE fc.problematica_id = ?
            ORDER BY fc.created_at ASC
        `;
        const [comments]: any[] = await db.query(sql, [problematicaId]);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Comentarios del Foro');
        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Apellido', key: 'apellido', width: 20 },
            { header: 'Comentario', key: 'comment_text', width: 80 },
            { header: 'Fecha', key: 'created_at', width: 25 },
        ];
        worksheet.addRows(comments);

        const buffer = await workbook.xlsx.writeBuffer();
        const fileName = `${problematicaTitle.replace(/ /g, "_")}-foro.xlsx`;
        
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

    } catch (error) {
        console.error("Error al generar el Excel del foro:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}