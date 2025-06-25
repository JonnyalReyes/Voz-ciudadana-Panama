// src/app/api/problematicas/[id]/route.ts

import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { auth } from '../../../../auth';
import { PoolConnection } from 'mysql2/promise';

// --- FUNCIÓN PARA EDITAR (PUT) ---
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    const problematicaId = params.id;
    let connection: PoolConnection | undefined;

    try {
      const data = await request.json();
      const { title, description, content, category, imageUrl, allowForum, showResults, questions } = data;

      connection = await db.getConnection();
      await connection.beginTransaction();

      // 1. Actualizar la problemática principal
      const problematicaSql = `
        UPDATE problematicas 
        SET title = ?, description = ?, content = ?, category = ?, image_url = ?, allow_forum = ?, show_results = ?
        WHERE id = ?
      `;
      await connection.query(problematicaSql, [title, description, content, category, imageUrl, allowForum, showResults, problematicaId]);

      // 2. Borrar las preguntas antiguas para reemplazarlas con las nuevas
      // (ON DELETE CASCADE se encarga de las opciones de respuesta)
      await connection.query("DELETE FROM questions WHERE problematica_id = ?", [problematicaId]);

      // 3. Insertar las preguntas y opciones nuevas (si existen)
      if (questions && questions.length > 0) {
        for (const q of questions) {
            const questionSql = "INSERT INTO questions (problematica_id, question_text, question_type, is_required) VALUES (?, ?, ?, ?)";
            const [qResult]: any = await connection.query(questionSql, [problematicaId, q.question_text, q.question_type, q.is_required]);
            const questionId = qResult.insertId;

            if (q.options && q.options.length > 0) {
                for (const opt of q.options) {
                    const optionSql = "INSERT INTO question_options (question_id, option_text) VALUES (?, ?)";
                    await connection.query(optionSql, [questionId, opt.text]);
                }
            }
        }
      }

      await connection.commit();
      return NextResponse.json({ message: 'Problemática actualizada con éxito' }, { status: 200 });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error(`Error al actualizar la problemática ${problematicaId}:`, error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}


// --- FUNCIÓN PARA ELIMINAR (DELETE) ---
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const { id } = params;

        // NOTA: Esto fallará si hay comentarios asociados. Ver la nota sobre borrado en cascada al final.
        const sql = "DELETE FROM problematicas WHERE id = ?";
        await db.query(sql, [id]);

        return NextResponse.json({ message: 'Problemática eliminada con éxito' }, { status: 200 });

    } catch (error) {
        console.error("Error al eliminar la problemática:", error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    }
}