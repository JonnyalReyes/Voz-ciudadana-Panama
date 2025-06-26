import { NextResponse } from 'next/server';
import { auth } from '../../../../../../auth';
import db from '@/src/lib/db';
import ExcelJS from 'exceljs';
import { PoolConnection } from 'mysql2/promise';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const session = await auth();
    if (!session || session.user?.role !== 'admin') {
        return NextResponse.json({ message: 'No autorizado' }, { status: 401 });
    }

    try {
        const problematicaId = params.id;

        // 1. Obtener la información de la problemática para el nombre del archivo
        const [problematicaRows]: any[] = await db.query("SELECT title FROM problematicas WHERE id = ?", [problematicaId]);
        if (problematicaRows.length === 0) {
            return NextResponse.json({ message: "Problemática no encontrada" }, { status: 404 });
        }
        const problematicaTitle = problematicaRows[0]?.title || 'Resultados';

        // 2. Obtener todas las preguntas de la encuesta para usarlas como cabeceras
        const [questions]: any[] = await db.query("SELECT id, question_text FROM questions WHERE problematica_id = ? ORDER BY id ASC", [problematicaId]);
        if (questions.length === 0) {
            return NextResponse.json({ message: "Esta problemática no tiene preguntas de encuesta." }, { status: 404 });
        }
        const questionIds = questions.map((q: {id: number}) => q.id);

        // 3. Cargar todas las opciones de respuesta posibles en un mapa para consulta rápida
        const [options]: any[] = await db.query("SELECT id, option_text FROM question_options WHERE question_id IN (?)", [questionIds]);
        const optionsMap = new Map<number, string>();
        options.forEach((opt: {id: number, option_text: string}) => {
            optionsMap.set(opt.id, opt.option_text);
        });

        // 4. Obtener todas las respuestas y los datos del usuario que respondió
        const sql = `
            SELECT 
                u.nombre, u.apellido, YEAR(CURDATE()) - YEAR(u.fecha_nacimiento) as edad, u.sexo, u.provincia,
                a.question_id, a.text_answer, a.boolean_answer, a.number_answer, a.selected_option_id, u.id as userId
            FROM answers a
            JOIN users u ON a.user_id = u.id
            WHERE a.question_id IN (?)
        `;
        const [answersData]: any[] = await db.query(sql, [questionIds]);
        
        // 5. Procesar y pivotar los datos, traduciendo los IDs a texto
        const usersData: { [key: string]: any } = {};
        type AnswerRow = { userId: number; nombre: string; apellido: string; edad: number; sexo: string; provincia: string; question_id: number; text_answer?: string; boolean_answer?: number; number_answer?: number; selected_option_id?: number; };

        answersData.forEach((row: AnswerRow) => {
            if (!usersData[row.userId]) {
                usersData[row.userId] = { nombre: row.nombre, apellido: row.apellido, edad: row.edad, sexo: row.sexo, provincia: row.provincia, };
            }

            let displayAnswer;
            if (row.selected_option_id) {
                // Si la respuesta es un ID de opción, lo buscamos en nuestro mapa
                displayAnswer = optionsMap.get(row.selected_option_id) || `ID:${row.selected_option_id}`;
            } else if (row.boolean_answer !== null && row.boolean_answer !== undefined) {
                // Si la respuesta es booleana, la convertimos a Sí/No
                displayAnswer = row.boolean_answer ? 'Sí' : 'No';
            }
            else {
                // Para los demás tipos (texto, número), usamos el valor directo
                displayAnswer = row.text_answer ?? row.number_answer;
            }
            usersData[row.userId][`pregunta_${row.question_id}`] = displayAnswer;
        });

        // 6. Crear el archivo Excel con los datos procesados
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Respuestas');

        type QuestionRow = { id: number, question_text: string };
        const headers = ['Nombre', 'Apellido', 'Edad', 'Sexo', 'Provincia', ...questions.map((q: QuestionRow) => q.question_text)];
        worksheet.addRow(headers);

        Object.values(usersData).forEach((user: any) => {
            const rowData = [user.nombre, user.apellido, user.edad, user.sexo, user.provincia];
            questions.forEach((q: QuestionRow) => {
                rowData.push(user[`pregunta_${q.id}`] || ''); // Añade la respuesta o un string vacío
            });
            worksheet.addRow(rowData);
        });

        // 7. Preparar el buffer del archivo para la respuesta
        const buffer = await workbook.xlsx.writeBuffer();
        const fileName = `${problematicaTitle.replace(/\s/g, "_")}-resultados_encuesta.xlsx`;
        
        return new NextResponse(buffer, {
            status: 200,
            headers: {
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });

    } catch (error) {
        console.error("Error al generar el Excel de encuestas:", error);
        return NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
    }
}