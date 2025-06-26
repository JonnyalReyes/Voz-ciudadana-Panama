// src/app/api/registro/route.ts
import { NextResponse } from 'next/server';
import db from '@/src/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    // 1. Obtener los datos del cuerpo de la petición
    const data = await request.json();
    console.log('Datos recibidos en la API:', data); // ¡Útil para depurar!

    const {
          nombre, apellido, cedula, fecha_nacimiento, sexo, email, password, telefono, provincia,
          direccion, ocupacion, nivel_educativo, motivacion,
        } = data;

    // 2. Validar que los datos necesarios están presentes
    if (!nombre || !apellido || !cedula || !email || !password) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios." },
        { status: 400 }
      );
    }

    // 3. Hashear la contraseña antes de guardarla (¡MUY IMPORTANTE!)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Preparar la consulta SQL para insertar el nuevo usuario
    const sql = `
      INSERT INTO users (
        nombre, apellido, cedula, fecha_nacimiento, sexo, email, password, telefono, provincia,
        direccion, ocupacion, nivel_educativo, motivacion, status, role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'user')
    `;

    const values = [
      nombre, apellido, cedula, fecha_nacimiento, sexo, email, hashedPassword, telefono, provincia,
      direccion, ocupacion, nivel_educativo, motivacion,
    ];

    // 5. Ejecutar la consulta
    await db.query(sql, values);

    console.log('Usuario registrado en la base de datos.');

    // 6. Devolver una respuesta de éxito
    return NextResponse.json({ message: 'Solicitud de registro enviada con éxito.' }, { status: 201 });

  } catch (error: any) {
    // Manejo de errores
    console.error('Error en la API de registro:', error);

    // Error específico para email o cédula duplicados
    if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json(
            { message: 'El correo electrónico o la cédula ya están registrados.' },
            { status: 409 } // 409 Conflict
        );
    }

    return NextResponse.json(
      { message: 'Error en el servidor al procesar la solicitud.' },
      { status: 500 }
    );
  }
}