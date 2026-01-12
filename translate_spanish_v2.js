const fs = require('fs');
const path = require('path');

// Comprehensive Spanish translations dictionary
const translations = {
    // Common UI Actions
    "Save": "Guardar",
    "Create": "Crear",
    "Edit": "Editar",
    "Delete": "Eliminar",
    "Cancel": "Cancelar",
    "Close": "Cerrar",
    "Actions": "Acciones",
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
    "Submit": "Enviar",
    "Search": "Buscar",
    "Filter": "Filtrar",
    "Reset": "Restablecer",
    "Clear": "Limpiar",
    "Add": "Agregar",
    "Remove": "Eliminar",
    "Update": "Actualizar",
    "Confirm": "Confirmar",
    "Set": "Establecer",

    // Status and States
    "Status": "Estado",
    "Pending": "Pendiente",
    "Approved": "Aprobado",
    "Rejected": "Rechazado",
    "Loading": "Cargando",
    "Processing": "Procesando",
    "Active": "Activo",
    "Inactive": "Inactivo",
    "Enabled": "Habilitado",
    "Disabled": "Deshabilitado",
    "Public": "Público",
    "Private": "Privado",
    "New": "Nuevo",
    "Old": "Antiguo",

    // Navigation and Menu
    "Home": "Inicio",
    "Dashboard": "Panel de control",
    "Profile": "Perfil",
    "Settings": "Configuración",
    "Help": "Ayuda",
    "About": "Acerca de",
    "Contact": "Contacto",
    "Logout": "Cerrar sesión",
    "Login": "Iniciar sesión",
    "Register": "Registrarse",
    "Sign up": "Registrarse",
    "Sign in": "Iniciar sesión",

    // User Fields
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

    // Time and Date
    "Date": "Fecha",
    "Time": "Hora",
    "Start Date": "Fecha de inicio",
    "End Date": "Fecha de fin",
    "Start Time": "Hora de inicio",
    "End Time": "Hora de fin",
    "Duration": "Duración",
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
    "Start:": "Inicio:",
    "End:": "Fin:",

    // Content Fields
    "Description": "Descripción",
    "Notes": "Notas",
    "Comments": "Comentarios",
    "Observations": "Observaciones",
    "Details": "Detalles",
    "Details:": "Detalles:",
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

    // Workforce Management - Core Entities
    "Members": "Miembros",
    "Member": "Miembro",
    "Workers": "Trabajadores",
    "Worker": "Trabajador",
    "Worker Name": "Nombre del trabajador",
    "Employee": "Empleado",
    "Employees": "Empleados",
    "Entity": "Entidad",
    "Entities": "Entidades",
    "Organization": "Organización",
    "Department": "Departamento",
    "Team": "Equipo",
    "Role": "Rol",
    "Roles": "Roles",
    "Position": "Puesto",
    "Positions": "Puestos",

    // Absences
    "Absences": "Ausencias",
    "Absence": "Ausencia",
    "Absence Type": "Tipo de ausencia",
    "Absence Types": "Tipos de ausencia",
    "Absence Start Date": "Fecha de inicio de ausencia",
    "Absence End Date": "Fecha de fin de ausencia",
    "Add Absence": "Agregar ausencia",
    " Full Day Absence ": " Ausencia de día completo ",
    "Absence Approval": "Aprobación de ausencia",

    // Shifts
    "Schedule": "Horario",
    "Schedules": "Horarios",
    "Shift": "Turno",
    "Shifts": "Turnos",
    "Shift Name": "Nombre del turno",
    "Shift Color": "Color del turno",
    "Shift Alias": "Alias del turno",
    "Shift Start Time": "Hora de inicio del turno",
    "Shift Duration": "Duración del turno",
    "Shift Description": "Descripción del turno",
    "Shift Management": "Gestión de turnos",
    "Add Shift": "Agregar turno",
    "Set Shift Rotation": "Establecer rotación de turno",
    "Shift Rotation": "Rotación de turno",
    "Shift Break Type": "Tipo de descanso del turno",
    "Shift Includes Weekends": "El turno incluye fines de semana",

    // Schedule Operations
    "Delete Schedule": "Eliminar horario",
    "Create Schedule": "Crear horario",
    "Create from Scratch": "Crear desde cero",
    "Based on Templates": "Basado en plantillas",
    "Selected Entry": "Entrada seleccionada",
    "Add Entry": "Agregar entrada",
    "Available Workers": "Trabajadores disponibles",
    "Assigned Workers": "Trabajadores asignados",
    "Event Details": "Detalles del evento",
    "Event Name:": "Nombre del evento:",
    "Participants": "Participantes",

    // Skills
    "Skills": "Habilidades",
    "Skill": "Habilidad",
    "Skill Assignments:": "Asignaciones de habilidades:",
    "Add Skill": "Agregar habilidad",
    "Select Skill": "Seleccionar habilidad",
    "Select a skill to add to the worker:": "Seleccione una habilidad para agregar al trabajador:",

    // Rules
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
    "Specification Value": "Valor de especificación",
    "Reference Item": "Elemento de referencia",
    "Reference Type": "Tipo de referencia",
    "Reference Item 2": "Elemento de referencia 2",
    "Reference Type 2": "Tipo de referencia 2",
    "Rule Priorities": "Prioridades de reglas",
    "Know the Rules Types": "Conozca los tipos de reglas",

    // Breaks and Rest
    "Break": "Descanso",
    "Breaks": "Descansos",
    "Add Break": "Agregar descanso",
    "Break Start Time": "Hora de inicio del descanso",
    "Break Duration": "Duración del descanso",
    "Included in the Shift": "Incluido en el turno",
    "Is Time Flexible": "¿Es flexible el horario?",
    "Is Leave": "Es licencia",
    "Rest Period": "Período de descanso",
    "Post Shift Rest Hours": "Horas de descanso post-turno",

    // Assignments and Rotation
    "Assignment": "Asignación",
    "Assignments": "Asignaciones",
    "Rotation": "Rotación",
    "Pattern": "Patrón",
    "Template": "Plantilla",
    "Part of Rotation": "Parte de la rotación",
    "In Rotation": "En rotación",
    "Multiple Shifts Assignments": "Asignaciones de múltiples turnos",
    "Multiple Shift": "Turnos múltiples",
    "Specific Assignments": "Asignaciones específicas",

    // Working Days/Hours
    "Hours": "Horas",
    "Working Hours": "Horas de trabajo",
    "Overtime": "Horas extras",
    "Calendar": "Calendario",
    "Works on Weekdays": "Trabaja en días laborables",
    "Works on Weekends": "Trabaja en fines de semana",
    "Works Week Days": "Trabaja días de semana",
    "Works Week Ends": "Trabaja fines de semana",

    // Member Management
    "Add Member": "Agregar miembro",
    "Edit Member": "Editar miembro",
    "Members Management": "Gestión de miembros",
    "Adding New Members": "Agregar nuevos miembros",
    "Editing Members": "Edición de miembros",
    "Order Options": "Opciones de orden",

    // Common Messages
    "Required": "Requerido",
    "Optional": "Opcional",
    "All": "Todos",
    "None": "Ninguno",
    "Other": "Otro",
    "Total": "Total",
    "Subtotal": "Subtotal",
    "Amount": "Cantidad",
    "Quantity": "Cantidad",
    "Are you sure?": "¿Está seguro?",
    "Please confirm": "Por favor confirme",
    "No data available": "No hay datos disponibles",
    "No results found": "No se encontraron resultados",
    "Loading data": "Cargando datos",
    "Please wait": "Por favor espere",
    "Invalid input": "Entrada inválida",
    "Required field": "Campo requerido",
    "No schedule entries found.": "No se encontraron entradas de horario.",
    "No Shift Rotations have been created yet.": "Aún no se han creado rotaciones de turno.",

    // Help Documentation
    "Introduction": "Introducción",
    "Getting Started": "Comenzando",
    "Features Overview": "Descripción general de funciones",
    "Tutorials / How-To Guides": "Tutoriales / Guías de instrucciones",
    "FAQ": "Preguntas frecuentes",
    "Profile Management": "Gestión de perfiles",
    "Privacy & Security": "Privacidad y seguridad",
    "Privacy &amp; Security": "Privacidad y seguridad",
    "Notifications": "Notificaciones",
    "Billing & Subscriptions": "Facturación y suscripciones",
    "Billing &amp; Subscriptions": "Facturación y suscripciones",
    "Contact Support": "Contactar soporte",
    "Release Notes / Updates": "Notas de la versión / Actualizaciones",
    "Legal / Policies": "Legal / Políticas",
    "Tips": "Consejos",
    "Next Steps": "Próximos pasos",
    "Support Tools": "Herramientas de soporte",
    "Account & Billing": "Cuenta y facturación",
    "Account &amp; Billing": "Cuenta y facturación",

    // Descriptive Text - Absences
    "This section provides information about employee absences, including types of absences, policies, and procedures for reporting and managing time off.": "Esta sección proporciona información sobre las ausencias de los empleados, incluyendo tipos de ausencias, políticas y procedimientos para reportar y gestionar el tiempo libre.",
    "First step to adding an absence is to click the \"Add Absence\" button present on the top part of the view.": "El primer paso para agregar una ausencia es hacer clic en el botón \"Agregar ausencia\" presente en la parte superior de la vista.",
    "After clicking the button, a form will appear where you can enter the details of the absence, such as the type of absence, start and end dates, and any additional notes.": "Después de hacer clic en el botón, aparecerá un formulario donde puede ingresar los detalles de la ausencia, como el tipo de ausencia, fechas de inicio y fin, y cualquier nota adicional.",
    "Absences can be of type full day or partial. In a partial absence scenario, the user must specify the time intervals to which he will be absent.": "Las ausencias pueden ser de tipo día completo o parcial. En un escenario de ausencia parcial, el usuario debe especificar los intervalos de tiempo en los que estará ausente.",
    "Once all the necessary information has been filled out, click the \"Create\" button to add the absence to the system.": "Una vez que se haya completado toda la información necesaria, haga clic en el botón \"Crear\" para agregar la ausencia al sistema.",
    "After saving, the new absence will appear in the absences grid.": "Después de guardar, la nueva ausencia aparecerá en la cuadrícula de ausencias.",
    "Update and Delete": "Actualizar y eliminar",
    "To update or delete absences, it is done by accessing the edit or delete buttons present on each row of their respective grids.": "Para actualizar o eliminar ausencias, se hace accediendo a los botones de editar o eliminar presentes en cada fila de sus respectivas cuadrículas.",
    "Pressing the edit button will open the same form as when creating an absence, but populated with the existing data.": "Presionar el botón de editar abrirá el mismo formulario que al crear una ausencia, pero poblado con los datos existentes.",
    "When filling out the form, a mandatory absence type is required to be selected, so that it provides full context to the reason why. Here's a list of all available absence types:": "Al completar el formulario, se requiere seleccionar un tipo de ausencia obligatorio, para que proporcione el contexto completo de la razón. Aquí hay una lista de todos los tipos de ausencia disponibles:",
    "Absences can only be approved by the owner or any other manager responsible for this section. This operation can be done in the absences grid status column with the thumb icons.": "Las ausencias solo pueden ser aprobadas por el propietario o cualquier otro gerente responsable de esta sección. Esta operación se puede hacer en la columna de estado de la cuadrícula de ausencias con los iconos de pulgar.",
    "Clicking the thumbs up icon will approve the absence, while clicking the thumbs down icon will reject it. If approved, this absence will be taken into account when forming schedules, as the worker may or may not be available to specific shift entries.": "Hacer clic en el icono de pulgar arriba aprobará la ausencia, mientras que hacer clic en el icono de pulgar abajo la rechazará. Si se aprueba, esta ausencia se tendrá en cuenta al formar horarios, ya que el trabajador puede o no estar disponible para entradas de turno específicas.",

    // Descriptive Text - Features
    "Shift Scheduler offers a collection of tools designed to simplify workforce scheduling and improve team coordination. This overview highlights the key features available in the application.": "Shift Scheduler ofrece una colección de herramientas diseñadas para simplificar la programación de la fuerza laboral y mejorar la coordinación del equipo. Esta descripción general destaca las características clave disponibles en la aplicación.",
    "From this page, you can see who is part of the organization in one place. As a managar, you can add new users, update their roles, define availability, and control access permissions to ensure accurate and secure scheduling.": "Desde esta página, puede ver quién es parte de la organización en un solo lugar. Como gerente, puede agregar nuevos usuarios, actualizar sus roles, definir disponibilidad y controlar permisos de acceso para garantizar una programación precisa y segura.",
    "You can also create profiles to simulate people, either as a tool for experimenting new possibilities, or to create standins, managing the same information that a regular worker has.": "También puede crear perfiles para simular personas, ya sea como una herramienta para experimentar nuevas posibilidades, o para crear suplentes, gestionando la misma información que tiene un trabajador regular.",
    "Build and maintain shift templates with customizable start times, durations, and requirements. These templates serve as the foundation for schedule generation. Either create them from scratch or make use of many available templates, to speed up configuration.": "Construya y mantenga plantillas de turnos con horarios de inicio, duraciones y requisitos personalizables. Estas plantillas sirven como base para la generación de horarios. Ya sea créelos desde cero o haga uso de muchas plantillas disponibles, para acelerar la configuración.",
    "Rules & Constraints": "Reglas y restricciones",
    "Rules &amp; Constraints": "Reglas y restricciones",
    "Define rules that control how schedules are generated. You can select from a vast selection of rule types and specify custom values and associations that will shape the outcome of your scheudle. These can include minimum weekly hours, required rest times, role requirements, and custom business logic.": "Defina reglas que controlen cómo se generan los horarios. Puede seleccionar de una amplia selección de tipos de reglas y especificar valores y asociaciones personalizadas que darán forma al resultado de su horario. Estos pueden incluir horas semanales mínimas, tiempos de descanso requeridos, requisitos de rol y lógica empresarial personalizada.",
    "Absences & Availability": "Ausencias y disponibilidad",
    "Absences &amp; Availability": "Ausencias y disponibilidad",
    "Track absences, time-off requests, and general availability. This ensures the created schedules accurately reflect who can work and when.": "Realice un seguimiento de ausencias, solicitudes de tiempo libre y disponibilidad general. Esto garantiza que los horarios creados reflejen con precisión quién puede trabajar y cuándo.",
    "Shift Scheduler keeps your team informed with notifications for schedule updates, shift changes, approvals, and more. Notification preferences can be customized in the user settings.": "Shift Scheduler mantiene a su equipo informado con notificaciones sobre actualizaciones de horarios, cambios de turnos, aprobaciones y más. Las preferencias de notificación se pueden personalizar en la configuración del usuario.",
    "Manage your profile, organization settings, and subscription in one place. Access billing details, plan information, and invoices whenever needed.": "Gestione su perfil, configuración de la organización y suscripción en un solo lugar. Acceda a detalles de facturación, información del plan y facturas cuando sea necesario.",
    "Shift Scheduler includes a complete support system to help you succeed. Access tutorials, FAQs, release notes, and contact options for technical assistance.": "Shift Scheduler incluye un sistema de soporte completo para ayudarle a tener éxito. Acceda a tutoriales, preguntas frecuentes, notas de la versión y opciones de contacto para asistencia técnica.",
    "Create and organize weekly or monthly schedules. The scheduling engine uses your shift templates and rules to automatically generate optimized work plans for your team.": "Cree y organice horarios semanales o mensuales. El motor de programación utiliza sus plantillas de turnos y reglas para generar automáticamente planes de trabajo optimizados para su equipo.",
    "You can also manually plan your schedule by specifying whos is working on every given day and which roles are they performing.": "También puede planificar manualmente su horario especificando quién está trabajando cada día y qué roles están desempeñando.",

    // Descriptive Text - Getting Started
    "Welcome to Shift Scheduler! This guide will walk you through the essential steps to begin using the application and understand its core workflow.": "¡Bienvenido a Shift Scheduler! Esta guía le guiará a través de los pasos esenciales para comenzar a usar la aplicación y comprender su flujo de trabajo principal.",
    "Create/Join a Work Entity": "Crear/Unirse a una entidad de trabajo",
    "To start using Shift Scheduler, you'll first need to create or join a work entity. You can do this by:": "Para comenzar a usar Shift Scheduler, primero deberá crear o unirse a una entidad de trabajo. Puede hacer esto:",
    "Navigating the Dashboard": "Navegando por el panel de control",
    "When you login in, the dashboard provides quick access to your schedules, team information, shift templates, rules, absences, and other relevant information of your work entities. Each section is designed to keep your scheduling operations clear and organized.": "Cuando inicia sesión, el panel de control proporciona acceso rápido a sus horarios, información del equipo, plantillas de turnos, reglas, ausencias y otra información relevante de sus entidades de trabajo. Cada sección está diseñada para mantener sus operaciones de programación claras y organizadas.",
    "Adding Members": "Agregar miembros",
    "As a manager, you can add your team members to the system. You can define their roles, availability, and permissions, ensuring Shift Scheduler has accurate data to work with.": "Como gerente, puede agregar a los miembros de su equipo al sistema. Puede definir sus roles, disponibilidad y permisos, asegurando que Shift Scheduler tenga datos precisos con los que trabajar.",
    "Setting Up Shifts & Rules": "Configuración de turnos y reglas",
    "Setting Up Shifts &amp; Rules": "Configuración de turnos y reglas",
    "Shift Scheduler relies on templates and rules to build schedules efficiently. Define shift types, durations, requirements, and constraints so the system knows how to assign work properly.": "Shift Scheduler se basa en plantillas y reglas para construir horarios de manera eficiente. Defina tipos de turnos, duraciones, requisitos y restricciones para que el sistema sepa cómo asignar el trabajo adecuadamente.",
    "Log / Manage Absences": "Registrar / Gestionar ausencias",
    "As a worker, you can submit absence requests for your manager to approve. These absences are taken into account for generating the required schedules.": "Como trabajador, puede enviar solicitudes de ausencia para que su gerente las apruebe. Estas ausencias se tienen en cuenta para generar los horarios requeridos.",
    "Creating Your First Schedule": "Crear su primer horario",
    "With your team, shifts, and rules in place, you're ready to generate your first schedule. Simply choose a time period, apply your templates, resolve conflicts if needed, and publish the schedule to your team.": "Con su equipo, turnos y reglas en su lugar, está listo para generar su primer horario. Simplemente elija un período de tiempo, aplique sus plantillas, resuelva conflictos si es necesario y publique el horario a su equipo.",
    "After setting up the basics, explore other help sections to learn more about:": "Después de configurar los conceptos básicos, explore otras secciones de ayuda para obtener más información sobre:",

    // Descriptive Text - Introduction
    "What is Shift Scheduler?": "¿Qué es Shift Scheduler?",
    "Shift Scheduler is a scheduling platform built to automate and simplify the creation of work schedules. It helps organizations eliminate manual planning, ensure fair distribution of workloads, and maintain visibility over member availability, absences, and work rules.": "Shift Scheduler es una plataforma de programación construida para automatizar y simplificar la creación de horarios de trabajo. Ayuda a las organizaciones a eliminar la planificación manual, garantizar una distribución justa de las cargas de trabajo y mantener la visibilidad sobre la disponibilidad de los miembros, ausencias y reglas de trabajo.",
    "Who is it for?": "¿Para quién es?",
    "Administrators who configure rules, create schedules, and manage members": "Administradores que configuran reglas, crean horarios y gestionan miembros",
    "Managers who oversee shifts, staffing, and team availability": "Gerentes que supervisan turnos, personal y disponibilidad del equipo",
    "What can you do with Shift Scheduler": "Qué puede hacer con Shift Scheduler",
    "With Shift Scheduler, you can easily:": "Con Shift Scheduler, puede fácilmente:",
    "Create weekly, monthly, or custom schedules": "Crear horarios semanales, mensuales o personalizados",
    "Manage member profiles, roles, and availability": "Gestionar perfiles de miembros, roles y disponibilidad",
    "Define shift templates, scheduling rules, and constraints": "Definir plantillas de turnos, reglas de programación y restricciones",
    "Track absences and conflicts automatically": "Rastrear ausencias y conflictos automáticamente",
    "Review, publish, and share schedules": "Revisar, publicar y compartir horarios",
    "Configure notifications for changes or approvals": "Configurar notificaciones para cambios o aprobaciones",
    "Manage subscription, billing, and account settings": "Gestionar suscripción, facturación y configuración de la cuenta",
    "How to Start": "Cómo empezar",
    "If you're new to the app, we recommend beginning with:": "Si es nuevo en la aplicación, recomendamos comenzar con:",
    "Navigating Shift Scheduler": "Navegando por Shift Scheduler",
    "Shift Scheduler organizes its tools into a few core sections:": "Shift Scheduler organiza sus herramientas en algunas secciones principales:",
    "Once you're familiar with the basics, explore our:": "Una vez que esté familiarizado con los conceptos básicos, explore nuestro:",

    // Descriptive Text - Members
    "This is where you'll see and manage the members of the organization.": "Aquí es donde verá y gestionará los miembros de la organización.",
    "List or Grid?": "¿Lista o cuadrícula?",
    "From this page, you can see all members and can choose in what you": "Desde esta página, puede ver todos los miembros y puede elegir en qué formato desea verlos",
    "Filter what you want to see": "Filtrar lo que desea ver",
    "You can filter members by their roles, availability, or other criteria to quickly find specific individuals or groups within your organization.": "Puede filtrar miembros por sus roles, disponibilidad u otros criterios para encontrar rápidamente individuos o grupos específicos dentro de su organización.",
    "By clicking on the filters button, a popup will appear with following options:": "Al hacer clic en el botón de filtros, aparecerá una ventana emergente con las siguientes opciones:",
    "To add a new member to the organization, click on the \"Add Member\" button. A popup will appear to which you have the following options:": "Para agregar un nuevo miembro a la organización, haga clic en el botón \"Agregar miembro\". Aparecerá una ventana emergente con las siguientes opciones:",
    "When a member is invited by email, it will send a notification to the user to join your work organization, to which it will be up to decision. On the other hand, creating a profile will create an impersonator/standin that the manager can use for either simulation purposes or to take the place of someone who hasn't joined the work organization yet. This profile will be exclusive to the organization, so it will not be showned anywhere else.": "Cuando un miembro es invitado por correo electrónico, se enviará una notificación al usuario para unirse a su organización de trabajo, lo cual quedará a su decisión. Por otro lado, crear un perfil creará un suplente que el gerente puede usar con fines de simulación o para ocupar el lugar de alguien que aún no se ha unido a la organización de trabajo. Este perfil será exclusivo de la organización, por lo que no se mostrará en ningún otro lugar.",
    "You can make these operations for when you wish to invite someone, or creating someone, to the exception of assigning specific shifts. Once the person has joined the work entity, you can then assign specific shifts if required.": "Puede realizar estas operaciones cuando desee invitar a alguien, o crear a alguien, con la excepción de asignar turnos específicos. Una vez que la persona se haya unido a la entidad de trabajo, puede asignar turnos específicos si es necesario.",
    "As a manager, you can update these at any time, by pressing the edit button visible for each worker, in the \"Actions\" column. You can also remove them from the organization, using the remove button also present in the same column.": "Como gerente, puede actualizar estos en cualquier momento, presionando el botón de editar visible para cada trabajador, en la columna \"Acciones\". También puede eliminarlos de la organización, usando el botón de eliminar también presente en la misma columna.",

    // Descriptive Text - Rules
    "In order for schedules to tailor into the needs of the managers, each work entity must have a set of rules that the application will then interpret to generate a schedule.": "Para que los horarios se adapten a las necesidades de los gerentes, cada entidad de trabajo debe tener un conjunto de reglas que la aplicación interpretará para generar un horario.",
    "First step to adding a rule is to click the \"Add Rule\" button present on the top part of the view.": "El primer paso para agregar una regla es hacer clic en el botón \"Agregar regla\" presente en la parte superior de la vista.",
    "After clicking the button, the first form will appear with the following fields:": "Después de hacer clic en el botón, aparecerá el primer formulario con los siguientes campos:",
    "When a rule is selected, a secondary form will appear based on the rule type, for different kind of fields may be required to create the specifications that complement the rule.": "Cuando se selecciona una regla, aparecerá un formulario secundario basado en el tipo de regla, ya que se pueden requerir diferentes tipos de campos para crear las especificaciones que complementan la regla.",
    "After filling the specifications form, pressing the \"+\" button will to save the rule specification. Some rules will allow for multiple specifications to be added to the same rule type, like the example below:": "Después de completar el formulario de especificaciones, presionar el botón \"+\" guardará la especificación de la regla. Algunas reglas permitirán agregar múltiples especificaciones al mismo tipo de regla, como el ejemplo a continuación:",
    "Finally, pressing the \"Save\" button, will save the rule to the work entity.": "Finalmente, presionar el botón \"Guardar\", guardará la regla en la entidad de trabajo.",
    "To update or delete rules and their specifications, it is done by accessing the edit or delete buttons present on each row of their respective grids.": "Para actualizar o eliminar reglas y sus especificaciones, se hace accediendo a los botones de editar o eliminar presentes en cada fila de sus respectivas cuadrículas.",
    "Pressing the edit button will open the same forms as when creating a rule, but populated with the existing data.": "Presionar el botón de editar abrirá los mismos formularios que al crear una regla, pero poblados con los datos existentes.",
    "Rule types dictate the behaviour of schedule generating operations. They can be of single instance, meaning only one rule of that specific type can exist at any given time, multiple instances, single or multiple specifications, with different type of references that can be associated.": "Los tipos de reglas dictan el comportamiento de las operaciones de generación de horarios. Pueden ser de instancia única, lo que significa que solo puede existir una regla de ese tipo específico en cualquier momento dado, instancias múltiples, especificaciones únicas o múltiples, con diferentes tipos de referencias que se pueden asociar.",
    "Here's a list of all available rule types and their descriptions:": "Aquí hay una lista de todos los tipos de reglas disponibles y sus descripciones:",
    "When adding layers of rules to your organization, conflicts can occur due to their similar nature between them. In this current version of schedule generation, certain rule types have priorities over others.": "Al agregar capas de reglas a su organización, pueden ocurrir conflictos debido a su naturaleza similar entre ellas. En esta versión actual de generación de horarios, ciertos tipos de reglas tienen prioridades sobre otros.",
    "For example, setting a maximum amount of workers per shift of 10, will prioritize higher over required amount of skillset per shift that can specify 6 workers of Skill X and 6 of Skill Y.": "Por ejemplo, establecer una cantidad máxima de trabajadores por turno de 10, priorizará más alto sobre la cantidad requerida de conjunto de habilidades por turno que puede especificar 6 trabajadores de Habilidad X y 6 de Habilidad Y.",
    "Here is the list of rule types ordered by priority from highest to lowest, that can enter in conflict:": "Aquí está la lista de tipos de reglas ordenados por prioridad de mayor a menor, que pueden entrar en conflicto:",
    "INSERT PRIORITIES HERE": "INSERTAR PRIORIDADES AQUÍ",
    "When creating rules, keep in mind that the more rules you add, the more restrictions the schedule generator will have to comply with. This can lead to situations where no valid schedule can be generated due to conflicting or overly restrictive rules.": "Al crear reglas, tenga en cuenta que cuantas más reglas agregue, más restricciones tendrá que cumplir el generador de horarios. Esto puede llevar a situaciones donde no se puede generar un horario válido debido a reglas conflictivas o demasiado restrictivas.",
    "It's advisable to start with a basic set of rules and gradually add more as needed, testing the schedule generation after each addition to ensure feasibility.": "Es aconsejable comenzar con un conjunto básico de reglas y agregar gradualmente más según sea necesario, probando la generación de horarios después de cada adición para garantizar la viabilidad.",
    "Some rule types cover specific scenarios. Recommend the use of a mix of generic and specific rule types for better results.": "Algunos tipos de reglas cubren escenarios específicos. Recomiende el uso de una mezcla de tipos de reglas genéricas y específicas para obtener mejores resultados.",
    "Engage with your workforce to understand their needs and preferences, and consider incorporating their feedback into the rule-setting process to enhance satisfaction and compliance.": "Interactúe con su fuerza laboral para comprender sus necesidades y preferencias, y considere incorporar sus comentarios en el proceso de establecimiento de reglas para mejorar la satisfacción y el cumplimiento.",

    // Rule Types
    "Max. Hours by Day": "Máx. horas por día",
    "Min. Hours per Week": "Mín. horas por semana",
    "Max. Hours per Week": "Máx. horas por semana",
    "Min. Hours per Month": "Mín. horas por mes",
    "Min. Workers per Shift": "Mín. trabajadores por turno",
    "Max. Workers per Shift": "Máx. trabajadores por turno",
    "Required Skill Set per Shift": "Conjunto de habilidades requerido por turno",
    "Required Quantity Skill Set per Shift": "Cantidad de conjunto de habilidades requerido por turno",
    "Required Quantity Skill Set per Shift on Weekdays": "Cantidad de conjunto de habilidades requerido por turno en días laborables",
    "Required Quantity Skill Set per Shift on Weekends": "Cantidad de conjunto de habilidades requerido por turno en fines de semana",
    "Max Consecutive Shifts": "Máx. turnos consecutivos",
    "Min. Days off per Week": "Mín. días libres por semana",
    "Min. Weekends Off per Month": "Mín. fines de semana libres por mes",
    "Max. Consecutive Days for Non Rotationers": "Máx. días consecutivos para no rotadores",
    "Avg. Hours per Week": "Prom. horas por semana",
    "Avg. Hours per Month": "Prom. horas por mes",

    // Specific messages
    "Are you sure you want to delete this entity? All data will be erased and everyone associated with this work entity will no longer have access.": "¿Está seguro de que desea eliminar esta entidad? Todos los datos serán borrados y todas las personas asociadas con esta entidad de trabajo ya no tendrán acceso.",

    // About/Landing Page
    "About Us": "Acerca de nosotros",
    "Revolutionizing Workforce Management": "Revolucionando la gestión de la fuerza laboral",
    "At Shift Scheduler, we understand the challenges of organizing and managing a dynamic workforce. That's why we've created an intuitive, feature-rich platform designed to streamline your scheduling needs. Our mission is to save you time, minimize conflicts, and provide actionable insights, so you can focus on what really matters—growing your business.": "En Shift Scheduler, comprendemos los desafíos de organizar y gestionar una fuerza laboral dinámica. Por eso hemos creado una plataforma intuitiva y rica en funciones diseñada para optimizar sus necesidades de programación. Nuestra misión es ahorrarle tiempo, minimizar conflictos y proporcionar información procesable, para que pueda concentrarse en lo que realmente importa: hacer crecer su negocio.",
    "With features that cater to managers and employees alike, Shift Scheduler ensures transparency, efficiency, and fairness in workforce scheduling. Join our growing community of businesses revolutionizing the way they manage teams": "Con funciones que atienden tanto a gerentes como a empleados, Shift Scheduler garantiza transparencia, eficiencia y equidad en la programación de la fuerza laboral. Únase a nuestra creciente comunidad de empresas que están revolucionando la forma en que gestionan equipos",
    "Discover the Features That Transform Scheduling": "Descubra las funciones que transforman la programación",
    "Create & Manage Worker Entities": "Crear y gestionar entidades de trabajadores",
    "Create &amp; Manage Worker Entities": "Crear y gestionar entidades de trabajadores",
    "Seamlessly register your account and create or join a company profile. Manage your workforce with ease.": "Registre su cuenta sin problemas y cree o únase a un perfil de empresa. Gestione su fuerza laboral con facilidad.",
    "Skill-Based Assignments": "Asignaciones basadas en habilidades",
    "Assign specific skills to workers to ensure the right people are placed in the right shifts.": "Asigne habilidades específicas a los trabajadores para garantizar que las personas adecuadas se coloquen en los turnos correctos.",
    "Absence Management": "Gestión de ausencias",
    "Keep track of who's absent and approve or decline absentee notices with a click.": "Realice un seguimiento de quién está ausente y apruebe o rechace avisos de ausencia con un clic.",
    "Customizable Shifts & Templates": "Turnos y plantillas personalizables",
    "Customizable Shifts &amp; Templates": "Turnos y plantillas personalizables",
    "Design shifts with designated breaks and utilize templates to save time and maintain consistency.": "Diseñe turnos con descansos designados y utilice plantillas para ahorrar tiempo y mantener la coherencia.",
    "Set custom rules—such as hourly limits—and let Shift Scheduler create efficient schedules for your team automatically.": "Establezca reglas personalizadas, como límites por hora, y deje que Shift Scheduler cree horarios eficientes para su equipo automáticamente.",
    "Manual Adjustments": "Ajustes manuales",
    "Need more control? Edit schedules manually to account for unique situations.": "¿Necesita más control? Edite horarios manualmente para tener en cuenta situaciones únicas.",
    "We offer subscription-based pricing to ensure affordability and scalability as your business grows.": "Ofrecemos precios basados en suscripción para garantizar asequibilidad y escalabilidad a medida que su negocio crece.",

    // Pricing
    "Monthly": "Mensual",
    "Quarterly": "Trimestral",
    "Yearly": "Anual",
    "Starter": "Inicial",
    "Perfect for small teams and startups. Includes up to 10 users, manual scheduling, and absence tracking.": "Perfecto para equipos pequeños y startups. Incluye hasta 10 usuarios, programación manual y seguimiento de ausencias.",
    "per entity": "por entidad",
    "Start your free trial now": "Comience su prueba gratuita ahora",
    "Growth": "Crecimiento",
    "Ideal for mid-sized teams. Supports up to 50 users, includes automated scheduling, and access to skill-based assignments.": "Ideal para equipos de tamaño mediano. Admite hasta 50 usuarios, incluye programación automatizada y acceso a asignaciones basadas en habilidades.",
    "Enterprise": "Empresarial",
    "For large teams with complex needs. Includes unlimited users, advanced analytics, priority support, and enterprise-grade security. Contact us for a tailored quote.": "Para equipos grandes con necesidades complejas. Incluye usuarios ilimitados, análisis avanzados, soporte prioritario y seguridad de nivel empresarial. Contáctenos para obtener una cotización personalizada.",
    "Sends us a message": "Envíenos un mensaje",
    "Contact Us": "Contáctenos",
    "Get in touch with us for more information or support.": "Póngase en contacto con nosotros para obtener más información o soporte.",
    "Email address": "Dirección de correo electrónico",
    "Subject": "Asunto",
    "Send": "Enviar",

    // User Profile
    "Gender": "Género",
    "Confirm Password": "Confirmar contraseña",

    // Entity
    "New Work Entity": "Nueva entidad de trabajo",
    "Entity Name": "Nombre de la entidad",
    "Minimum of 3 characters": "Mínimo de 3 caracteres",
    "Entity Type": "Tipo de entidad",
    "Terms and Conditions (WIP)": "Términos y condiciones (en progreso)",
    "Ok": "Aceptar",

    // Various
    "Definições": "Definiciones",

    // Days of week abbreviations and full
    "Weekday": "Día de semana",
    "Weekend": "Fin de semana",
    "Weekdays": "Días de semana",
    "Weekends": "Fines de semana",

    // Additional common terms that might appear
    "Approve": "Aprobar",
    "Reject": "Rechazar",
    "Publish": "Publicar",
    "Duplicate": "Duplicar",
    "Copy": "Copiar",
    "Share": "Compartir",
    "Open": "Abrir",
    "Hide": "Ocultar",
    "Show": "Mostrar",
    "Sort": "Ordenar",
    "Group": "Agrupar",
    "Options": "Opciones",
    "Preferences": "Preferencias",
    "Advanced": "Avanzado",
    "Basic": "Básico",
    "Custom": "Personalizado",
    "Default": "Predeterminado",
    "Standard": "Estándar",
    "Premium": "Premium",
    "Free": "Gratis",
    "Trial": "Prueba",
    "Upgrade": "Actualizar",
    "Downgrade": "Degradar",
    "Renew": "Renovar",
    "Expire": "Expirar",
    "Valid": "Válido",
    "Invalid": "Inválido",
    "Complete": "Completo",
    "Incomplete": "Incompleto",
    "Available": "Disponible",
    "Unavailable": "No disponible",
    "Online": "En línea",
    "Offline": "Fuera de línea",
    "Connected": "Conectado",
    "Disconnected": "Desconectado",
    "Saved": "Guardado",
    "Unsaved": "No guardado",
    "Modified": "Modificado",
    "Unmodified": "Sin modificar",
    "Draft": "Borrador",
    "Published": "Publicado",
    "Archived": "Archivado",
    "Deleted": "Eliminado",
    "Restored": "Restaurado",
};

function getTranslation(text) {
    // Try direct match first
    if (translations[text]) {
        return translations[text];
    }

    // Try trimmed version
    const trimmed = text.trim();
    if (translations[trimmed]) {
        return translations[trimmed];
    }

    // Try case-insensitive match
    for (const [key, value] of Object.entries(translations)) {
        if (key.toLowerCase() === trimmed.toLowerCase()) {
            return value;
        }
    }

    return null;
}

function processXLIFFFile(filePath) {
    console.log(`Reading file: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    let translated = 0;
    let skipped = 0;
    let interpolationOnly = 0;
    let totalSourcesProcessed = 0;

    const newLines = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        // Check if this is a source line with actual text content (not just interpolation)
        const sourceMatch = line.match(/^(\s*)<source>([^<]+)<\/source>\s*$/);

        if (sourceMatch) {
            const indent = sourceMatch[1];
            const sourceText = sourceMatch[2];
            totalSourcesProcessed++;

            // Add the source line
            newLines.push(line);

            // Check if next line is already a target - if so, skip translation
            if (i + 1 < lines.length && lines[i + 1].includes('<target>')) {
                // Target already exists, don't add another
                i++;
                continue;
            }

            // Try to get translation
            const translation = getTranslation(sourceText);

            if (translation) {
                // Insert target line after source
                const targetLine = `${indent}<target>${translation}</target>`;
                newLines.push(targetLine);
                translated++;
            } else {
                skipped++;
            }
        } else if (line.includes('<source>') && line.includes('<x id=')) {
            // This is an interpolation-only source
            newLines.push(line);
            interpolationOnly++;
        } else {
            // Just copy the line as is
            newLines.push(line);
        }

        i++;
    }

    // Write the result back
    console.log(`Writing updated file: ${filePath}`);
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');

    console.log('\n=== Translation Summary ===');
    console.log(`Total source elements processed: ${totalSourcesProcessed}`);
    console.log(`Entries translated: ${translated}`);
    console.log(`Entries skipped (no translation found): ${skipped}`);
    console.log(`Interpolation-only entries (skipped): ${interpolationOnly}`);
    console.log(`\nTranslation complete!`);

    return { translated, skipped, interpolationOnly, totalSourcesProcessed };
}

// Main execution
const filePath = path.join(__dirname, 'src', 'locale', 'messages.es.xlf');

try {
    processXLIFFFile(filePath);
} catch (error) {
    console.error('Error processing file:', error);
    process.exit(1);
}
