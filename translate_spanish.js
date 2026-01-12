const fs = require('fs');
const path = require('path');

// Comprehensive Spanish translations
const translations = {
    // Common UI elements
    "Save": "Guardar",
    "Create": "Crear",
    "Edit": "Editar",
    "Delete": "Eliminar",
    "Cancel": "Cancelar",
    "Close": "Cerrar",
    "Actions": "Acciones",
    "Status": "Estado",
    "Pending": "Pendiente",
    "Approved": "Aprobado",
    "Rejected": "Rechazado",
    "Submit": "Enviar",
    "Search": "Buscar",
    "Filter": "Filtrar",
    "Reset": "Restablecer",
    "Clear": "Limpiar",
    "Add": "Agregar",
    "Remove": "Eliminar",
    "Update": "Actualizar",
    "Confirm": "Confirmar",
    "Back": "Volver",
    "Next": "Siguiente",
    "Previous": "Anterior",
    "Continue": "Continuar",
    "Finish": "Finalizar",
    "Select": "Seleccionar",
    "Yes": "Sí",
    "No": "No",
    "OK": "Aceptar",
    "Apply": "Aplicar",
    "View": "Ver",
    "Download": "Descargar",
    "Upload": "Subir",
    "Export": "Exportar",
    "Import": "Importar",
    "Print": "Imprimir",
    "Refresh": "Actualizar",
    "Loading": "Cargando",
    "Processing": "Procesando",
    "Settings": "Configuración",
    "Help": "Ayuda",
    "About": "Acerca de",
    "Contact": "Contacto",
    "Home": "Inicio",
    "Dashboard": "Panel de control",
    "Profile": "Perfil",
    "Logout": "Cerrar sesión",
    "Login": "Iniciar sesión",
    "Register": "Registrarse",
    "Sign up": "Registrarse",
    "Sign in": "Iniciar sesión",
    "Password": "Contraseña",
    "Email": "Correo electrónico",
    "Username": "Nombre de usuario",
    "Name": "Nombre",
    "First Name": "Nombre",
    "Last Name": "Apellido",
    "Phone": "Teléfono",
    "Address": "Dirección",
    "City": "Ciudad",
    "Country": "País",
    "State": "Estado",
    "Zip Code": "Código postal",
    "Date": "Fecha",
    "Time": "Hora",
    "Start Date": "Fecha de inicio",
    "End Date": "Fecha de fin",
    "Start Time": "Hora de inicio",
    "End Time": "Hora de fin",
    "Duration": "Duración",
    "Description": "Descripción",
    "Notes": "Notas",
    "Comments": "Comentarios",
    "Observations": "Observaciones",
    "Details": "Detalles",
    "Information": "Información",
    "Type": "Tipo",
    "Category": "Categoría",
    "Priority": "Prioridad",
    "Tags": "Etiquetas",
    "Title": "Título",
    "Subject": "Asunto",
    "Message": "Mensaje",
    "Error": "Error",
    "Warning": "Advertencia",
    "Success": "Éxito",
    "Info": "Información",
    "Required": "Requerido",
    "Optional": "Opcional",
    "All": "Todos",
    "None": "Ninguno",
    "Other": "Otro",
    "New": "Nuevo",
    "Old": "Antiguo",
    "Active": "Activo",
    "Inactive": "Inactivo",
    "Enabled": "Habilitado",
    "Disabled": "Deshabilitado",
    "Public": "Público",
    "Private": "Privado",
    "Total": "Total",
    "Subtotal": "Subtotal",
    "Amount": "Cantidad",
    "Price": "Precio",
    "Cost": "Costo",
    "Quantity": "Cantidad",
    "Size": "Tamaño",
    "Color": "Color",
    "Image": "Imagen",
    "File": "Archivo",
    "Folder": "Carpeta",
    "Document": "Documento",

    // Workforce/Schedule specific
    "Members": "Miembros",
    "Member": "Miembro",
    "Absences": "Ausencias",
    "Absence": "Ausencia",
    "Absence Type": "Tipo de ausencia",
    "Absence Start Date": "Fecha de inicio de ausencia",
    "Absence End Date": "Fecha de fin de ausencia",
    "Add Absence": "Agregar ausencia",
    " Full Day Absence ": " Ausencia de día completo ",
    "Workers": "Trabajadores",
    "Worker": "Trabajador",
    "Employee": "Empleado",
    "Employees": "Empleados",
    "Schedule": "Horario",
    "Schedules": "Horarios",
    "Shift": "Turno",
    "Shifts": "Turnos",
    "Shift Name": "Nombre del turno",
    "Entity": "Entidad",
    "Entities": "Entidades",
    "Organization": "Organización",
    "Department": "Departamento",
    "Team": "Equipo",
    "Role": "Rol",
    "Roles": "Roles",
    "Position": "Puesto",
    "Positions": "Puestos",
    "Assignment": "Asignación",
    "Assignments": "Asignaciones",
    "Rules": "Reglas",
    "Rule": "Regla",
    "Rule Type": "Tipo de regla",
    "Rule Description": "Descripción de la regla",
    "Add Rule": "Agregar regla",
    "Validation": "Validación",
    "Coverage": "Cobertura",
    "Availability": "Disponibilidad",
    "Constraints": "Restricciones",
    "Requirements": "Requisitos",
    "Skills": "Habilidades",
    "Skill": "Habilidad",
    "Skill Assignments:": "Asignaciones de habilidades:",
    "Qualifications": "Calificaciones",
    "Hours": "Horas",
    "Working Hours": "Horas de trabajo",
    "Break": "Descanso",
    "Breaks": "Descansos",
    "Rest Period": "Período de descanso",
    "Overtime": "Horas extras",
    "Rotation": "Rotación",
    "Pattern": "Patrón",
    "Template": "Plantilla",
    "Calendar": "Calendario",
    "Week": "Semana",
    "Month": "Mes",
    "Year": "Año",
    "Day": "Día",
    "Days": "Días",
    "Monday": "Lunes",
    "Tuesday": "Martes",
    "Wednesday": "Miércoles",
    "Thursday": "Jueves",
    "Friday": "Viernes",
    "Saturday": "Sábado",
    "Sunday": "Domingo",
    "Mon": "Lun",
    "Tue": "Mar",
    "Wed": "Mié",
    "Thu": "Jue",
    "Fri": "Vie",
    "Sat": "Sáb",
    "Sun": "Dom",
    "January": "Enero",
    "February": "Febrero",
    "March": "Marzo",
    "April": "Abril",
    "May": "Mayo",
    "June": "Junio",
    "July": "Julio",
    "August": "Agosto",
    "September": "Septiembre",
    "October": "Octubre",
    "November": "Noviembre",
    "December": "Diciembre",
    "Jan": "Ene",
    "Feb": "Feb",
    "Mar": "Mar",
    "Apr": "Abr",
    "Jun": "Jun",
    "Jul": "Jul",
    "Aug": "Ago",
    "Sep": "Sep",
    "Oct": "Oct",
    "Nov": "Nov",
    "Dec": "Dic",

    // Specific UI actions and phrases
    "Approve": "Aprobar",
    "Reject": "Rechazar",
    "Assign": "Asignar",
    "Unassign": "Desasignar",
    "Publish": "Publicar",
    "Unpublish": "Despublicar",
    "Archive": "Archivar",
    "Restore": "Restaurar",
    "Duplicate": "Duplicar",
    "Copy": "Copiar",
    "Paste": "Pegar",
    "Cut": "Cortar",
    "Undo": "Deshacer",
    "Redo": "Rehacer",
    "Share": "Compartir",
    "Send": "Enviar",
    "Receive": "Recibir",
    "Open": "Abrir",
    "Hide": "Ocultar",
    "Show": "Mostrar",
    "Expand": "Expandir",
    "Collapse": "Contraer",
    "Maximize": "Maximizar",
    "Minimize": "Minimizar",
    "Sort": "Ordenar",
    "Group": "Agrupar",
    "Ungroup": "Desagrupar",
    "Delete Schedule": "Eliminar horario",
    "Create Schedule": "Crear horario",
    "Selected Entry": "Entrada seleccionada",
    "Add Entry": "Agregar entrada",
    "Available Workers": "Trabajadores disponibles",
    "Specification Value": "Valor de especificación",
    "Reference Item": "Elemento de referencia",
    "Reference Type": "Tipo de referencia",
    "Reference Item 2": "Elemento de referencia 2",
    "Reference Type 2": "Tipo de referencia 2",

    // Messages
    "Are you sure?": "¿Está seguro?",
    "Please confirm": "Por favor confirme",
    "Operation successful": "Operación exitosa",
    "Operation failed": "Operación fallida",
    "No data available": "No hay datos disponibles",
    "No results found": "No se encontraron resultados",
    "Loading data": "Cargando datos",
    "Please wait": "Por favor espere",
    "Invalid input": "Entrada inválida",
    "Required field": "Campo requerido",
    "Invalid format": "Formato inválido",
    "Invalid date": "Fecha inválida",
    "Invalid email": "Correo electrónico inválido",
    "Password too short": "Contraseña demasiado corta",
    "Passwords do not match": "Las contraseñas no coinciden",
    "Changes saved": "Cambios guardados",
    "Changes discarded": "Cambios descartados",
    "Unsaved changes": "Cambios sin guardar",
    "Do you want to save changes?": "¿Desea guardar los cambios?",
    "Are you sure you want to delete this entity? All data will be erased and everyone associated with this work entity will no longer have access.": "¿Está seguro de que desea eliminar esta entidad? Todos los datos serán borrados y todas las personas asociadas con esta entidad de trabajo ya no tendrán acceso.",
};

function getTranslation(text) {
    // Remove extra whitespace for matching
    const cleanText = text.trim();

    // Direct match
    if (translations[text]) {
        return translations[text];
    }

    if (translations[cleanText]) {
        return translations[cleanText];
    }

    // Try case-insensitive match
    for (const [key, value] of Object.entries(translations)) {
        if (key.toLowerCase() === cleanText.toLowerCase()) {
            return value;
        }
    }

    return null;
}

function extractTextFromSource(sourceContent) {
    // Extract text content, ignoring XML tags like <x id="..."/>
    const textMatch = sourceContent.match(/>([^<]+)</);
    if (textMatch) {
        return textMatch[1].trim();
    }
    return null;
}

function processXLIFF(inputFile, outputFile) {
    console.log('Reading XLIFF file...');
    const content = fs.readFileSync(inputFile, 'utf-8');
    const lines = content.split('\n');

    let inTransUnit = false;
    let currentSource = null;
    let sourceLineIndex = -1;
    let translated = 0;
    let skipped = 0;
    let interpolationOnly = 0;

    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        newLines.push(line);

        // Detect trans-unit start
        if (line.includes('<trans-unit')) {
            inTransUnit = true;
            currentSource = null;
            sourceLineIndex = -1;
        }

        // Detect trans-unit end
        if (line.includes('</trans-unit>')) {
            // If we found a source but no target was added, check if we should add one
            if (inTransUnit && currentSource && sourceLineIndex >= 0) {
                const sourceText = extractTextFromSource(currentSource);
                if (sourceText && !currentSource.includes('<x id=') && !currentSource.match(/<x id="INTERPOLATION"/)) {
                    const translation = getTranslation(sourceText);
                    if (translation) {
                        // Insert target after source
                        const indent = currentSource.match(/^(\s*)/)[1];
                        const targetLine = `${indent}<target>${translation}</target>`;
                        newLines.splice(sourceLineIndex + 1, 0, targetLine);
                        translated++;
                    } else {
                        skipped++;
                    }
                } else if (currentSource.match(/<x id="(INTERPOLATION|PH)"/)) {
                    interpolationOnly++;
                }
            }
            inTransUnit = false;
        }

        // Detect source line
        if (inTransUnit && line.includes('<source>')) {
            currentSource = line;
            sourceLineIndex = newLines.length - 1;
        }
    }

    console.log('Writing translated file...');
    fs.writeFileSync(outputFile, newLines.join('\n'), 'utf-8');

    console.log('\n=== Translation Summary ===');
    console.log(`Entries translated: ${translated}`);
    console.log(`Entries skipped (no translation found): ${skipped}`);
    console.log(`Interpolation-only entries (skipped): ${interpolationOnly}`);
    console.log(`Total processed: ${translated + skipped + interpolationOnly}`);

    return { translated, skipped, interpolationOnly };
}

// Main execution
const inputFile = path.join(__dirname, 'src', 'locale', 'messages.es.xlf');
const outputFile = inputFile; // Overwrite the same file

try {
    processXLIFF(inputFile, outputFile);
    console.log('\nTranslation complete!');
} catch (error) {
    console.error('Error processing file:', error);
    process.exit(1);
}
