// En: src/app/api/user/password/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import db from '@/src/lib/db';
import bcrypt from 'bcrypt';

export async function PUT(request: Request) {
    const session = await auth();
    if (!session?.user?.email) return NextResponse.json({ message: 'No autorizado' }, { status: 401 });

    try {
        const { currentPassword, newPassword } = await request.json();

        // 1. Obtener el hash de la contraseña actual del usuario
        const [rows]: any[] = await db.query("SELECT password FROM users WHERE email = ?", [session.user.email]);
        if (rows.length === 0) {
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
        }
        const hashedPassword = rows[0].password;

        // 2. Comparar la contraseña actual proporcionada con la de la BD
        const passwordsMatch = await bcrypt.compare(currentPassword, hashedPassword);
        if (!passwordsMatch) {
            return NextResponse.json({ message: "La contraseña actual es incorrecta" }, { status: 400 });
        }

        // 3. Hashear y actualizar la nueva contraseña
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query("UPDATE users SET password = ? WHERE email = ?", [newHashedPassword, session.user.email]);

        return NextResponse.json({ message: "Contraseña actualizada con éxito" });

    } catch (error) {
        console.error("Error al cambiar contraseña:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}