// En: src/app/api/user/profile/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../auth';
import db from '@/src/lib/db';
import { PoolConnection } from 'mysql2/promise';

export async function GET(request: Request) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const userId = session.user.id;

        // 1. Obtener los datos principales del usuario
        const [userRows]: any[] = await db.query(
            "SELECT nombre, apellido, email, provincia, bio, image_url FROM users WHERE id = ?",
            [userId]
        );

        if (userRows.length === 0) {
            return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
        }

        const userProfile = userRows[0];

        // 2. Obtener los intereses del usuario
        const [interestRows]: any[] = await db.query(
            "SELECT category_name FROM user_interests WHERE user_id = ?",
            [userId]
        );

        // 3. Combinar los datos y devolverlos
        const fullProfile = {
            ...userProfile,
            interests: interestRows.map((row: { category_name: string }) => row.category_name),
        };

        return NextResponse.json(fullProfile);

    } catch (error) {
        console.error("Error al obtener perfil:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ message: 'No autorizado' }, { status: 401 });

    const userId = session.user.id;
    let connection: PoolConnection | undefined;

    try {
        const { nombre, apellido, email, provincia, bio, image_url, interests } = await request.json();
        
        connection = await db.getConnection();
        await connection.beginTransaction();

        // 1. Actualizar la tabla 'users'
        const userSql = "UPDATE users SET nombre = ?, apellido = ?, email = ?, provincia = ?, bio = ?, image_url = ? WHERE id = ?";
        await connection.query(userSql, [nombre, apellido, email, provincia, bio, image_url, userId]);

        // 2. Actualizar los intereses (borrar los antiguos e insertar los nuevos)
        await connection.query("DELETE FROM user_interests WHERE user_id = ?", [userId]);
        if (interests && interests.length > 0) {
            const interestValues = interests.map((interest: string) => [userId, interest]);
            await connection.query("INSERT INTO user_interests (user_id, category_name) VALUES ?", [interestValues]);
        }

        await connection.commit();
        return NextResponse.json({ message: "Perfil actualizado con éxito" });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Error al actualizar perfil:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}