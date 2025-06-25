// src/lib/data.ts
import db from './db';

export interface QuestionOption {
  id: number;
  text: string;
}

export interface SurveyQuestion {
  id: number;
  question_text: string;
  question_type: 'TEXT' | 'TEXTAREA' | 'BOOLEAN' | 'NUMBER' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  is_required: boolean;
  options?: QuestionOption[];
}

// Definimos el tipo aquí para poder reutilizarlo
export interface Problematica {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  created_at: string;
  // Estos campos necesitarían consultas más complejas (JOINs o conteos)
  participants?: number; 
  comments?: number;
}

export async function getFeaturedProblematicas(): Promise<Problematica[]> {
  try {
    const sql = `
      SELECT id, title, description, category, status, created_at 
      FROM problematicas 
      ORDER BY created_at DESC 
      LIMIT 3
    `;
    const [rows] = await db.query(sql);
    return rows as Problematica[];
  } catch (error) {
    console.error("Error al obtener las problemáticas destacadas:", error);
    return []; // Devolvemos un array vacío en caso de error
  }
}