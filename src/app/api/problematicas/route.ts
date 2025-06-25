import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import { auth } from '../../../auth';
import { PoolConnection } from 'mysql2/promise';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const status = searchParams.get('status') || '';
    const sortBy = searchParams.get('sortBy') || 'recientes';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 10;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM problematicas WHERE 1=1';
    const params: (string | number)[] = [];

    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }
    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    switch (sortBy) {
      default:
        sql += ' ORDER BY created_at DESC';
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    const [rows] = await db.query(sql, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Error al obtener las problemáticas.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }
  
    let connection: PoolConnection | undefined;
    try {
        const data = await request.json();
        const { title, description, content, category, imageUrl, allowForum, showResults, questions } = data;
        const adminId = session.user.id;
      
        connection = await db.getConnection();
        await connection.beginTransaction();

        const problematicaSql = `
          INSERT INTO problematicas (title, description, content, category, image_url, allow_forum, show_results, created_by, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Activa')
        `;
        const [result]: any = await connection.query(problematicaSql, [title, description, content, category, imageUrl, allowForum, showResults, adminId]);
        const problematicaId = result.insertId;

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
        return NextResponse.json({ message: 'Problemática y encuesta creadas con éxito' }, { status: 201 });
  
    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error al crear la problemática:", error);
        return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}