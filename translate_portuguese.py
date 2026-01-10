#!/usr/bin/env python3
"""
Comprehensive European Portuguese translation for messages.pt.xlf
This script processes the XLIFF file and adds European Portuguese translations.
"""

import xml.etree.ElementTree as ET
import sys

def get_portuguese_translations():
    """Returns a comprehensive dictionary of English to European Portuguese translations"""

    translations = {
        # Core Navigation & Menu
        "Members": "Membros",
        "Rules": "Regras",
        "Shifts": "Turnos",
        "Absences": "Ausências",
        "Schedules": "Horários",
        "Dashboard": "Painel",
        "Home": "Início",
        "Profile": "Perfil",
        "Help": "Ajuda",
        "Features": "Funcionalidades",
        "Settings": "Definições",

        # Basic Actions
        "Save": "Guardar",
        "Create": "Criar",
        "Edit": "Editar",
        "Delete": "Eliminar",
        "Cancel": "Cancelar",
        "Close": "Fechar",
        "Submit": "Submeter",
        "Apply": "Aplicar",
        "Reset": "Repor",
        "Update": "Atualizar",
        "Add": "Adicionar",
        "Remove": "Remover",
        "Actions": "Ações",
        " Actions ": " Ações ",
        "Set": "Definir",
        "View": "Ver",
        "Search": "Pesquisar",
        "Filter": "Filtrar",
        "Export": "Exportar",
        "Import": "Importar",

        # Absence Related
        "Add Absence": "Adicionar ausência",
        "Absence Type": "Tipo de ausência",
        "Absence Start Date": "Data de início da ausência",
        "Absence End Date": "Data de fim da ausência",
        " Full Day Absence ": " Ausência de dia completo ",
        "Absence Types": "Tipos de ausência",

        # Status & States
        "Status": "Estado",
        "Pending": "Pendente",
        "Approved": "Aprovado",
        "Rejected": "Rejeitado",
        "Cancelled": "Cancelado",
        "Observations": "Observações",
        "Active": "Ativo",
        "Inactive": "Inativo",

        # Date & Time
        "Start Date": "Data de início",
        "End Date": "Data de fim",
        "Start Time": "Hora de início",
        " Start Time ": " Hora de início ",
        "End Time": "Hora de fim",
        "Duration": "Duração",
        " Duration ": " Duração ",
        "Date": "Data",
        "Time": "Hora",

        # Form Fields
        "Name": "Nome",
        "Type": "Tipo",
        "Description": "Descrição",
        "Email": "Email",
        "Phone": "Telefone",
        "Address": "Morada",

        # Entity Types
        "Business": "Empresa",
        "Department": "Departamento",
        "Other": "Outro",

        # Shift & Breaks
        "Shift Description": "Descrição do turno",
        "Add Break": "Adicionar pausa",
        " Shift Break Type ": " Tipo de pausa do turno ",
        "Shift Break Type": "Tipo de pausa do turno",
        "Break Start Time": "Hora de início da pausa",
        "Break Duration": "Duração da pausa",
        "Included in the Shift": "Incluído no turno",
        " Included in Shift ": " Incluído no turno ",
        "Is Time Flexible": "Horário flexível",
        " Time Flexible ": " Horário flexível ",
        "Shift Rotation": "Rotação de turnos",
        "Is Leave": "É licença",
        "Create from Scratch": "Criar de raiz",
        "Based on Templates": "Baseado em modelos",

        # Members & Workers
        "Add Member": "Adicionar membro",
        "Edit Member": "Editar membro",
        "Part of Rotation": "Parte da rotação",
        "Multiple Shifts Assignments": "Atribuições de turnos múltiplos",
        "Multiple Shift": "Turno múltiplo",
        "Works on Weekdays": "Trabalha em dias úteis",
        "Works on Weekends": "Trabalha aos fins de semana",
        "Works Week Days": "Trabalha dias úteis",
        "Works Week Ends": "Trabalha fins de semana",
        "In Rotation": "Em rotação",
        "Order Options": "Opções de ordenação",
        "Select Skill": "Selecionar competência",
        "Specific Assignments": "Atribuições específicas",

        # Skills
        "Skill Assignments:": "Atribuições de competências:",
        "Skills": "Competências",
        "Skill": "Competência",

        # Help Documentation Sections
        "Introduction": "Introdução",
        "Getting Started": "Primeiros passos",
        "Features Overview": "Visão geral das funcionalidades",
        "Tutorials / How-To Guides": "Tutoriais / Guias práticos",
        "FAQ": "Perguntas frequentes",
        "Profile Management": "Gestão de perfil",
        "Privacy & Security": "Privacidade e segurança",
        "Notifications": "Notificações",
        "Billing & Subscriptions": "Faturação e subscrições",
        "Contact Support": "Contactar suporte",
        "Release Notes / Updates": "Notas de versão / Atualizações",
        "Legal / Policies": "Legal / Políticas",

        # Common UI Terms
        "Yes": "Sim",
        "No": "Não",
        "OK": "OK",
        "Confirm": "Confirmar",
        "Continue": "Continuar",
        "Back": "Voltar",
        "Next": "Seguinte",
        "Previous": "Anterior",
        "Finish": "Terminar",
        "Done": "Concluído",
        "Loading": "A carregar",
        "Loading...": "A carregar...",
        "Please wait...": "Por favor aguarde...",
        "Success": "Sucesso",
        "Error": "Erro",
        "Warning": "Aviso",
        "Info": "Informação",

        # Days of Week
        "Monday": "Segunda-feira",
        "Tuesday": "Terça-feira",
        "Wednesday": "Quarta-feira",
        "Thursday": "Quinta-feira",
        "Friday": "Sexta-feira",
        "Saturday": "Sábado",
        "Sunday": "Domingo",

        # Months
        "January": "Janeiro",
        "February": "Fevereiro",
        "March": "Março",
        "April": "Abril",
        "May": "Maio",
        "June": "Junho",
        "July": "Julho",
        "August": "Agosto",
        "September": "Setembro",
        "October": "Outubro",
        "November": "Novembro",
        "December": "Dezembro",

        # Time Units
        "Day": "Dia",
        "Days": "Dias",
        "Week": "Semana",
        "Weeks": "Semanas",
        "Month": "Mês",
        "Months": "Meses",
        "Year": "Ano",
        "Years": "Anos",
        "Hour": "Hora",
        "Hours": "Horas",
        "Minute": "Minuto",
        "Minutes": "Minutos",

        # Help Text - Absences
        "This section provides information about employee absences, including types of absences, policies, and procedures for reporting and managing time off.": "Esta secção fornece informações sobre ausências de funcionários, incluindo tipos de ausências, políticas e procedimentos para reportar e gerir licenças.",
        'First step to adding an absence is to click the "Add Absence" button present on the top part of the view.': 'O primeiro passo para adicionar uma ausência é clicar no botão "Adicionar ausência" presente na parte superior da vista.',
        "After clicking the button, a form will appear where you can enter the details of the absence, such as the type of absence, start and end dates, and any additional notes.": "Após clicar no botão, aparecerá um formulário onde pode inserir os detalhes da ausência, como o tipo de ausência, datas de início e fim, e quaisquer notas adicionais.",
        "Absences can be of type full day or partial. In a partial absence scenario, the user must specify the time intervals to which he will be absent.": "As ausências podem ser de tipo dia completo ou parcial. Num cenário de ausência parcial, o utilizador deve especificar os intervalos de tempo em que estará ausente.",
        'Once all the necessary information has been filled out, click the "Create" button to add the absence to the system.': 'Depois de preencher todas as informações necessárias, clique no botão "Criar" para adicionar a ausência ao sistema.',
        "After saving, the new absence will appear in the absences grid.": "Após guardar, a nova ausência aparecerá na grelha de ausências.",
        "Update and Delete": "Atualizar e eliminar",
        "To update or delete absences, it is done by accessing the edit or delete buttons present on each row of their respective grids.": "Para atualizar ou eliminar ausências, aceda aos botões de editar ou eliminar presentes em cada linha das respetivas grelhas.",
        "Pressing the edit button will open the same form as when creating an absence, but populated with the existing data.": "Pressionar o botão de editar abrirá o mesmo formulário usado ao criar uma ausência, mas preenchido com os dados existentes.",
        "When filling out the form, a mandatory absence type is required to be selected, so that it provides full context to the reason why. Here's a list of all available absence types:": "Ao preencher o formulário, é obrigatório selecionar um tipo de ausência, para fornecer o contexto completo do motivo. Aqui está uma lista de todos os tipos de ausência disponíveis:",

        # Delete confirmation
        "Are you sure you want to delete this entity? All data will be erased and everyone associated with this work entity will no longer have access.": "Tem a certeza de que deseja eliminar esta entidade? Todos os dados serão apagados e todos os associados a esta entidade de trabalho deixarão de ter acesso.",

        # Additional common terms
        "Welcome": "Bem-vindo",
        "User": "Utilizador",
        "Password": "Palavra-passe",
        "Login": "Entrar",
        "Logout": "Sair",
        "Register": "Registar",
        "Account": "Conta",
        "Organization": "Organização",
        "Team": "Equipa",
        "Manager": "Gestor",
        "Worker": "Trabalhador",
        "Employee": "Funcionário",
        "Schedule": "Horário",
        "Calendar": "Calendário",
        "Event": "Evento",
        "Required": "Obrigatório",
        "Optional": "Opcional",
        "All": "Todos",
        "None": "Nenhum",
        "Select": "Selecionar",
        "Selected": "Selecionado",
        "Total": "Total",
        "Count": "Contagem",
        "From": "De",
        "To": "Para",
        "Today": "Hoje",
        "Yesterday": "Ontem",
        "Tomorrow": "Amanhã",
        "This Week": "Esta semana",
        "Last Week": "Semana passada",
        "Next Week": "Próxima semana",
        "This Month": "Este mês",
        "Last Month": "Mês passado",
        "Next Month": "Próximo mês",
    }

    return translations

def process_xliff_file(input_path, output_path):
    """Process the XLIFF file and add European Portuguese translations where available"""

    try:
        tree = ET.parse(input_path)
        root = tree.getroot()
    except Exception as e:
        print(f"Error parsing XML file: {e}")
        return False

    # Register namespace
    ET.register_namespace('', 'urn:oasis:names:tc:xliff:document:1.2')
    ns = {'': 'urn:oasis:names:tc:xliff:document:1.2'}

    translations = get_portuguese_translations()
    trans_units = root.findall('.//trans-unit', ns)

    stats = {
        'total': len(trans_units),
        'translated': 0,
        'skipped_empty': 0,
        'skipped_has_target': 0,
        'no_translation': 0
    }

    print(f"Processing {stats['total']} trans-units...")

    for unit in trans_units:
        source = unit.find('source', ns)
        target = unit.find('target', ns)

        if target is not None:
            stats['skipped_has_target'] += 1
            continue

        if source is None:
            stats['skipped_empty'] += 1
            continue

        source_text = source.text
        if not source_text or not source_text.strip():
            stats['skipped_empty'] += 1
            continue

        if source_text in translations:
            target = ET.Element('target')
            target.text = translations[source_text]
            source_index = list(unit).index(source)
            unit.insert(source_index + 1, target)
            stats['translated'] += 1
        else:
            stats['no_translation'] += 1

    try:
        tree.write(output_path, encoding='UTF-8', xml_declaration=True)
        print(f"\nSuccessfully wrote translated file to: {output_path}")
    except Exception as e:
        print(f"Error writing output file: {e}")
        return False

    print("\n" + "="*70)
    print("TRANSLATION STATISTICS - EUROPEAN PORTUGUESE")
    print("="*70)
    print(f"Total trans-units:              {stats['total']:>6}")
    print(f"Successfully translated:        {stats['translated']:>6}")
    print(f"Skipped (already has target):   {stats['skipped_has_target']:>6}")
    print(f"Skipped (empty source):         {stats['skipped_empty']:>6}")
    print(f"No translation available:       {stats['no_translation']:>6}")
    print("="*70)

    return True

if __name__ == "__main__":
    input_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.pt.xlf"
    output_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.pt.xlf"

    print("="*70)
    print("European Portuguese Translation Script for messages.pt.xlf")
    print("="*70)
    print(f"Input:  {input_file}")
    print(f"Output: {output_file}")
    print("="*70)
    print()

    success = process_xliff_file(input_file, output_file)

    if success:
        print("\nTranslation process completed successfully!")
        sys.exit(0)
    else:
        print("\nTranslation process failed!")
        sys.exit(1)
