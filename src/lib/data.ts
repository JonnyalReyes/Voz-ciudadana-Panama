import db from './db';
import type { Problematica, SurveyQuestion } from './types';


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

export async function getProblematicaById(id: string | number): Promise<Problematica | null> {
    try {
        const [rows]: any[] = await db.query("SELECT * FROM problematicas WHERE id = ?", [id]);
        if (rows.length === 0) {
            return null; // No se encontró
        }
        return rows[0] as Problematica;
    } catch (error) {
        console.error("Error de base de datos al obtener la problemática:", error);
        // Lanza el error o devuelve null para que la página pueda manejarlo
        return null;
    }
}

// Obtiene las preguntas de una problemática, directamente de la BD
export async function getQuestionsByProblematicaId(id: string | number): Promise<SurveyQuestion[]> {
    try {
        const [questions]: any[] = await db.query("SELECT * FROM questions WHERE problematica_id = ?", [id]);

        for (const q of questions) {
            if (q.question_type === 'SINGLE_CHOICE' || q.question_type === 'MULTIPLE_CHOICE') {
                const [options] = await db.query("SELECT id, option_text as text FROM question_options WHERE question_id = ?", [q.id]);
                q.options = options;
            }
        }
        return questions;
    } catch (error) {
        console.error("Error de base de datos al obtener las preguntas:", error);
        return [];
    }
}

export async function getSurveyParticipantCount(problematicaId: string | number): Promise<number> {
    try {
        // Esta consulta cuenta los usuarios distintos que han dejado al menos una respuesta
        // para las preguntas de esta problemática.
        const sql = `
            SELECT COUNT(DISTINCT user_id) as participantCount
            FROM answers
            WHERE question_id IN (SELECT id FROM questions WHERE problematica_id = ?)
        `;
        const [rows]: any[] = await db.query(sql, [problematicaId]);
        
        // Devolvemos el conteo, o 0 si no hay resultados.
        return rows[0]?.participantCount || 0;

    } catch (error) {
        console.error("Error de base de datos al contar participantes:", error);
        return 0;
    }
}