// src/app/api/search/route.ts

import { NextResponse } from 'next/server';
import db from '@/src/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json([]);
    }

    const sql = `
      SELECT id, title, category 
      FROM problematicas 
      WHERE title LIKE ? OR description LIKE ? 
      LIMIT 5
    `;
    const searchQuery = `%${query}%`;
    
    const [results] = await db.query(sql, [searchQuery, searchQuery]);

    // --- LÍNEA DE DEPURACIÓN 2: Ver los resultados ---
    console.log("Resultados encontrados por la BD:", results);
    
    return NextResponse.json(results);

  } catch (error) {
    console.error("Error en la API de búsqueda:", error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}