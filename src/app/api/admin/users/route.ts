import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import db from '@/src/lib/db';

export async function GET() {
  const session = await auth();

  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  try {
    const [users] = await db.query(
        "SELECT id, nombre, apellido, email, cedula, provincia, ocupacion, status, created_at FROM users ORDER BY created_at DESC"
    );
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}