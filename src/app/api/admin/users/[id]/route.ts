// src/app/api/admin/users/[id]/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import db from '@/src/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  const userIdToUpdate = params.id;

  if (!session || session.user?.role !== 'admin') {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
  }

  try {
    const { status } = await request.json();

    if (!['approved', 'rejected', 'revision', 'pending'].includes(status)) {
        return NextResponse.json({ message: 'Estado no válido' }, { status: 400 });
    }

    await db.query(
      "UPDATE users SET status = ? WHERE id = ?",
      [status, userIdToUpdate]
    );

    return NextResponse.json({ message: `Usuario ${userIdToUpdate} actualizado a ${status}` });

  } catch (error) {
    console.error(`Error al actualizar usuario ${userIdToUpdate}:`, error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}