console.log("--- Iniciando el script generate-users.js ---");

let bcrypt, fs;
try {
    bcrypt = require('bcrypt');
    fs = require('fs');
    console.log("Dependencias 'bcrypt' y 'fs' cargadas correctamente.");
} catch (e) {
    console.error("ERROR: No se pudo cargar una dependencia. Por favor, ejecuta 'npm install bcrypt' y vuelve a intentarlo.", e);
    process.exit(1);
}

// --- Datos de ejemplo ---
const provincias = ["Panamá", "Colón", "Chiriquí", "Coclé", "Herrera", "Los Santos", "Veraguas", "Panamá Oeste"];
const ocupaciones = ["Estudiante", "Ingeniero", "Docente", "Contador", "Doctor", "Abogado", "Diseñador", "Comerciante"];
const nivelesEducativos = ["Universitario", "Postgrado", "Técnico", "Secundaria"];
const motivaciones = [
    "Quiero participar activamente en las decisiones que afectan a mi país.",
    "Me interesa aportar ideas constructivas para resolver los problemas nacionales.",
    "Deseo ser parte de una comunidad informada y comprometida.",
    "Busco un espacio para expresar mi opinión de forma responsable."
];

// --- Función para generar fechas de nacimiento aleatorias para adultos ---
function getRandomBirthDate() {
    // Genera una fecha entre hace 65 años y hace 18 años.
    const start = new Date();
    start.setFullYear(start.getFullYear() - 65); // Límite de edad superior
    const end = new Date();
    end.setFullYear(end.getFullYear() - 18); // Límite de edad inferior (mayor de 18)

    const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    // Formateamos la fecha al formato que MySQL entiende: 'YYYY-MM-DD'
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Meses son 0-11
    const day = String(randomDate.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}


// --- Función principal ---
async function generateUsersSql() {
    console.log("Generando hashes de contraseña y script SQL...");

    const saltRounds = 10;
    const password = '123';
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const sqlStatements = [];

    for (let i = 1; i <= 30; i++) {
        const nombre = `user${i}`;
        const apellido = `Apellido${i}`;
        const cedula = `8-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
        const fechaNacimiento = getRandomBirthDate(); // <-- Obtenemos la fecha de nacimiento
        const email = `user${i}@example.com`;
        const telefono = `+507 6${Math.floor(100 + Math.random() * 900)}${Math.floor(1000 + Math.random() * 9000)}`;
        const provincia = provincias[i % provincias.length];
        const direccion = `Calle Falsa 123, ${provincia}`;
        const ocupacion = ocupaciones[i % ocupaciones.length];
        const nivelEducativo = nivelesEducativos[i % nivelesEducativos.length];
        const motivacion = motivaciones[i % motivaciones.length];
        const status = (i <= 20) ? 'approved' : 'pending';

        // Actualizamos la sentencia INSERT para incluir la nueva columna
        const sql = "INSERT INTO `users` (`nombre`, `apellido`, `cedula`, `fecha_nacimiento`, `email`, `password`, `telefono`, `provincia`, `direccion`, `ocupacion`, `nivel_educativo`, `motivacion`, `status`, `role`) VALUES " +
                    `('${nombre}', '${apellido}', '${cedula}', '${fechaNacimiento}', '${email}', '${hashedPassword}', '${telefono}', '${provincia}', '${direccion}', '${ocupacion}', '${nivelEducativo}', '${motivacion}', '${status}', 'user');`;
        
        sqlStatements.push(sql);
    }

    fs.writeFileSync('insert_users.sql', sqlStatements.join('\n'));

    console.log("\n¡Éxito! Se ha creado el archivo 'insert_users.sql' actualizado.");
    console.log("Ahora puedes importar este nuevo archivo en phpMyAdmin.");
}

generateUsersSql().catch(err => {
    console.error("Ocurrió un error al ejecutar el script:", err);
});