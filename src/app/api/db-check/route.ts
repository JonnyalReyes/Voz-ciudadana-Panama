// src/app/api/db-check/route.ts
import { NextResponse } from 'next/server';
import db from '@/src/lib/db';

export async function GET() {
  let connection;
  try {
    // Intenta obtener una conexión del pool
    connection = await db.getConnection();

    // Si llegamos aquí, la conexión fue exitosa.
    // Podemos hacer una consulta simple para estar 100% seguros.
    await connection.query('SELECT 1');

    return NextResponse.json(
      { status: 'ok', message: 'La conexión con la base de datos es exitosa.' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error de conexión a la base de datos:', error);
    return NextResponse.json(
      { status: 'error', message: 'No se pudo conectar a la base de datos.', error: error.message },
      { status: 500 }
    );
  } finally {
    // ¡Muy importante! Libera la conexión para que pueda ser reutilizada por otros.
    if (connection) {
      connection.release();
    }
  }
}