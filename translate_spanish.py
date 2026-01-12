import xml.etree.ElementTree as ET
import re

# Translation dictionary for common terms
translations = {
    # Common UI elements
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

    # Workforce/Schedule specific
    "Absences": "Ausencias",
    "Absence": "Ausencia",
    "Absence Start Date": "Fecha de inicio de ausencia",
    "Absence End Date": "Fecha de fin de ausencia",
    "Workers": "Trabajadores",
    "Worker": "Trabajador",
    "Employee": "Empleado",
    "Employees": "Empleados",
    "Schedule": "Horario",
    "Schedules": "Horarios",
    "Shift": "Turno",
    "Shifts": "Turnos",
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
    "Validation": "Validación",
    "Coverage": "Cobertura",
    "Availability": "Disponibilidad",
    "Constraints": "Restricciones",
    "Requirements": "Requisitos",
    "Skills": "Habilidades",
    "Skill": "Habilidad",
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
    "Monday": "Lunes",
    "Tuesday": "Martes",
    "Wednesday": "Miércoles",
    "Thursday": "Jueves",
    "Friday": "Viernes",
    "Saturday": "Sábado",
    "Sunday": "Domingo",
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

    # Actions and verbs
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

    # Messages
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
}

def get_translation(text):
    """Get Spanish translation for a given English text."""
    # Direct match
    if text in translations:
        return translations[text]

    # Try case-insensitive match
    for key, value in translations.items():
        if key.lower() == text.lower():
            return value

    # Return None if no translation found
    return None

def translate_file(input_file, output_file):
    """Process XLIFF file and add missing Spanish translations."""

    # Parse XML with namespace handling
    ET.register_namespace('', 'urn:oasis:names:tc:xliff:document:1.2')
    tree = ET.parse(input_file)
    root = tree.getroot()

    ns = {'xliff': 'urn:oasis:names:tc:xliff:document:1.2'}

    # Find all trans-units
    trans_units = root.findall('.//xliff:trans-unit', ns)

    translated_count = 0
    skipped_count = 0
    already_translated = 0

    for unit in trans_units:
        source = unit.find('xliff:source', ns)
        target = unit.find('xliff:target', ns)

        # Get source text
        if source is not None:
            source_text = ET.tostring(source, encoding='unicode', method='text').strip()

            # Only process if source has meaningful text
            if source_text and not source_text.startswith('<x id='):
                # Check if target is missing or empty
                needs_translation = False

                if target is None:
                    # Create target element
                    target = ET.SubElement(unit, '{urn:oasis:names:tc:xliff:document:1.2}target')
                    needs_translation = True
                else:
                    target_text = ET.tostring(target, encoding='unicode', method='text').strip()
                    if not target_text:
                        needs_translation = True
                    else:
                        already_translated += 1

                if needs_translation:
                    # Get translation
                    translation = get_translation(source_text)

                    if translation:
                        # Copy the structure from source to target
                        target.clear()
                        # Copy all children from source
                        for child in source:
                            target.append(child)
                        # Set the text
                        if source.text:
                            target.text = translation
                        if source.tail:
                            target.tail = source.tail

                        translated_count += 1
                    else:
                        skipped_count += 1

    # Write the updated XML
    tree.write(output_file, encoding='UTF-8', xml_declaration=True)

    return translated_count, skipped_count, already_translated

if __name__ == "__main__":
    input_file = r'E:\Repositories\ShiftSchedulerAngular\src\locale\messages.es.xlf'
    output_file = r'E:\Repositories\ShiftSchedulerAngular\src\locale\messages.es.xlf'

    translated, skipped, already = translate_file(input_file, output_file)

    print(f"Translation complete!")
    print(f"Entries translated: {translated}")
    print(f"Entries skipped (no translation available): {skipped}")
    print(f"Entries already translated: {already}")
