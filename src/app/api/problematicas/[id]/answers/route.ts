// En: src/app/api/problematicas/[id]/answers/route.ts
import { NextResponse } from 'next/server';
import { auth } from '../../../../../auth';
import db from '@/src/lib/db';
export async function POST(request: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const userId = session.user.id;
        // Ahora esperamos un array de objetos desde el frontend
        const { answers } = await request.json();
        
        // Iteramos sobre cada respuesta enviada
        for (const answer of answers) {
            const { questionId, type, value } = answer;

            // Para opción múltiple, insertamos una fila por cada opción seleccionada
            if (type === 'MULTIPLE_CHOICE' && Array.isArray(value)) {
                for (const optionId of value) {
                    const sql = "INSERT INTO answers (question_id, user_id, selected_option_id) VALUES (?, ?, ?)";
                    await db.query(sql, [questionId, userId, optionId]);
                }
            } else {
                // Para los otros tipos, construimos la consulta dinámicamente
                let sql = 'INSERT INTO answers (question_id, user_id, ';
                let valueToInsert = value;

                switch (type) {
                    case 'TEXT':
                    case 'TEXTAREA':
                        sql += 'text_answer';
                        break;
                    case 'BOOLEAN':
                        sql += 'boolean_answer';
                        valueToInsert = (value === 'true'); // Convertir string a booleano
                        break;
                    case 'NUMBER':
                        sql += 'number_answer';
                        break;
                    case 'SINGLE_CHOICE':
                        sql += 'selected_option_id';
                        break;
                    default:
                        continue; // Si el tipo no es reconocido, saltamos esta respuesta
                }
                
                sql += ') VALUES (?, ?, ?)';
                await db.query(sql, [questionId, userId, valueToInsert]);
            }
        }

        return NextResponse.json({ message: "Respuesta enviada con éxito" }, { status: 201 });

    } catch (error: any) {
        console.error("Error al guardar respuesta:", error);
        return NextResponse.json({ message: "Error en el servidor", error: error.message }, { status: 500 });
    }
}