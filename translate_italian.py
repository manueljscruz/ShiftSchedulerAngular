#!/usr/bin/env python3
"""
Comprehensive Italian translation for messages.it.xlf
This script processes the XLIFF file and adds Italian translations.
"""

import xml.etree.ElementTree as ET
import sys

def get_italian_translations():
    """Returns a comprehensive dictionary of English to Italian translations"""

    translations = {
        # Core Navigation & Menu
        "Members": "Membri",
        "Rules": "Regole",
        "Shifts": "Turni",
        "Absences": "Assenze",
        "Schedules": "Orari",
        "Dashboard": "Cruscotto",
        "Home": "Home",
        "Profile": "Profilo",
        "Help": "Aiuto",
        "Features": "Funzionalità",
        "Settings": "Impostazioni",

        # Basic Actions
        "Save": "Salva",
        "Create": "Crea",
        "Edit": "Modifica",
        "Delete": "Elimina",
        "Cancel": "Annulla",
        "Close": "Chiudi",
        "Submit": "Invia",
        "Apply": "Applica",
        "Reset": "Reimposta",
        "Update": "Aggiorna",
        "Add": "Aggiungi",
        "Remove": "Rimuovi",
        "Actions": "Azioni",
        " Actions ": " Azioni ",
        "Set": "Imposta",
        "View": "Visualizza",
        "Search": "Cerca",
        "Filter": "Filtra",
        "Export": "Esporta",
        "Import": "Importa",

        # Absence Related
        "Add Absence": "Aggiungi assenza",
        "Absence Type": "Tipo di assenza",
        "Absence Start Date": "Data di inizio assenza",
        "Absence End Date": "Data di fine assenza",
        " Full Day Absence ": " Assenza giornata intera ",
        "Absence Types": "Tipi di assenza",

        # Status & States
        "Status": "Stato",
        "Pending": "In attesa",
        "Approved": "Approvato",
        "Rejected": "Rifiutato",
        "Cancelled": "Annullato",
        "Observations": "Osservazioni",
        "Active": "Attivo",
        "Inactive": "Inattivo",

        # Date & Time
        "Start Date": "Data di inizio",
        "End Date": "Data di fine",
        "Start Time": "Ora di inizio",
        " Start Time ": " Ora di inizio ",
        "End Time": "Ora di fine",
        "Duration": "Durata",
        " Duration ": " Durata ",
        "Date": "Data",
        "Time": "Ora",

        # Form Fields
        "Name": "Nome",
        "Type": "Tipo",
        "Description": "Descrizione",
        "Email": "Email",
        "Phone": "Telefono",
        "Address": "Indirizzo",

        # Entity Types
        "Business": "Azienda",
        "Department": "Reparto",
        "Other": "Altro",

        # Shift & Breaks
        "Shift Description": "Descrizione del turno",
        "Add Break": "Aggiungi pausa",
        " Shift Break Type ": " Tipo di pausa turno ",
        "Shift Break Type": "Tipo di pausa turno",
        "Break Start Time": "Ora di inizio pausa",
        "Break Duration": "Durata della pausa",
        "Included in the Shift": "Incluso nel turno",
        " Included in Shift ": " Incluso nel turno ",
        "Is Time Flexible": "Orario flessibile",
        " Time Flexible ": " Orario flessibile ",
        "Shift Rotation": "Rotazione turni",
        "Is Leave": "È un congedo",
        "Create from Scratch": "Crea da zero",
        "Based on Templates": "Basato su modelli",

        # Members & Workers
        "Add Member": "Aggiungi membro",
        "Edit Member": "Modifica membro",
        "Part of Rotation": "Parte della rotazione",
        "Multiple Shifts Assignments": "Assegnazioni turni multipli",
        "Multiple Shift": "Turno multiplo",
        "Works on Weekdays": "Lavora nei giorni feriali",
        "Works on Weekends": "Lavora nei fine settimana",
        "Works Week Days": "Lavora giorni feriali",
        "Works Week Ends": "Lavora fine settimana",
        "In Rotation": "In rotazione",
        "Order Options": "Opzioni di ordinamento",
        "Select Skill": "Seleziona competenza",
        "Specific Assignments": "Assegnazioni specifiche",

        # Skills
        "Skill Assignments:": "Assegnazioni competenze:",
        "Skills": "Competenze",
        "Skill": "Competenza",

        # Help Documentation Sections
        "Introduction": "Introduzione",
        "Getting Started": "Inizia",
        "Features Overview": "Panoramica funzionalità",
        "Tutorials / How-To Guides": "Tutorial / Guide pratiche",
        "FAQ": "Domande frequenti",
        "Profile Management": "Gestione profilo",
        "Privacy & Security": "Privacy e sicurezza",
        "Notifications": "Notifiche",
        "Billing & Subscriptions": "Fatturazione e abbonamenti",
        "Contact Support": "Contatta supporto",
        "Release Notes / Updates": "Note di rilascio / Aggiornamenti",
        "Legal / Policies": "Legale / Politiche",

        # Common UI Terms
        "Yes": "Sì",
        "No": "No",
        "OK": "OK",
        "Confirm": "Conferma",
        "Continue": "Continua",
        "Back": "Indietro",
        "Next": "Avanti",
        "Previous": "Precedente",
        "Finish": "Fine",
        "Done": "Fatto",
        "Loading": "Caricamento",
        "Loading...": "Caricamento...",
        "Please wait...": "Attendere prego...",
        "Success": "Successo",
        "Error": "Errore",
        "Warning": "Avviso",
        "Info": "Informazioni",

        # Days of Week
        "Monday": "Lunedì",
        "Tuesday": "Martedì",
        "Wednesday": "Mercoledì",
        "Thursday": "Giovedì",
        "Friday": "Venerdì",
        "Saturday": "Sabato",
        "Sunday": "Domenica",

        # Months
        "January": "Gennaio",
        "February": "Febbraio",
        "March": "Marzo",
        "April": "Aprile",
        "May": "Maggio",
        "June": "Giugno",
        "July": "Luglio",
        "August": "Agosto",
        "September": "Settembre",
        "October": "Ottobre",
        "November": "Novembre",
        "December": "Dicembre",

        # Time Units
        "Day": "Giorno",
        "Days": "Giorni",
        "Week": "Settimana",
        "Weeks": "Settimane",
        "Month": "Mese",
        "Months": "Mesi",
        "Year": "Anno",
        "Years": "anni",
        "Hour": "Ora",
        "Hours": "Ore",
        "Minute": "Minuto",
        "Minutes": "Minuti",

        # Help Text - Absences
        "This section provides information about employee absences, including types of absences, policies, and procedures for reporting and managing time off.": "Questa sezione fornisce informazioni sulle assenze dei dipendenti, inclusi i tipi di assenze, le politiche e le procedure per segnalare e gestire i permessi.",
        'First step to adding an absence is to click the "Add Absence" button present on the top part of the view.': 'Il primo passo per aggiungere un\'assenza è cliccare sul pulsante "Aggiungi assenza" presente nella parte superiore della vista.',
        "After clicking the button, a form will appear where you can enter the details of the absence, such as the type of absence, start and end dates, and any additional notes.": "Dopo aver cliccato sul pulsante, apparirà un modulo dove è possibile inserire i dettagli dell'assenza, come il tipo di assenza, le date di inizio e fine, e eventuali note aggiuntive.",
        "Absences can be of type full day or partial. In a partial absence scenario, the user must specify the time intervals to which he will be absent.": "Le assenze possono essere di tipo giornata intera o parziale. In uno scenario di assenza parziale, l'utente deve specificare gli intervalli di tempo in cui sarà assente.",
        'Once all the necessary information has been filled out, click the "Create" button to add the absence to the system.': 'Una volta compilate tutte le informazioni necessarie, cliccare sul pulsante "Crea" per aggiungere l\'assenza al sistema.',
        "After saving, the new absence will appear in the absences grid.": "Dopo il salvataggio, la nuova assenza apparirà nella griglia delle assenze.",
        "Update and Delete": "Aggiorna ed elimina",
        "To update or delete absences, it is done by accessing the edit or delete buttons present on each row of their respective grids.": "Per aggiornare o eliminare le assenze, si accede ai pulsanti di modifica o eliminazione presenti su ogni riga delle rispettive griglie.",
        "Pressing the edit button will open the same form as when creating an absence, but populated with the existing data.": "Premendo il pulsante di modifica si aprirà lo stesso modulo utilizzato per creare un'assenza, ma popolato con i dati esistenti.",
        "When filling out the form, a mandatory absence type is required to be selected, so that it provides full context to the reason why. Here's a list of all available absence types:": "Durante la compilazione del modulo, è obbligatorio selezionare un tipo di assenza, in modo da fornire il contesto completo del motivo. Ecco un elenco di tutti i tipi di assenza disponibili:",

        # Delete confirmation
        "Are you sure you want to delete this entity? All data will be erased and everyone associated with this work entity will no longer have access.": "Sei sicuro di voler eliminare questa entità? Tutti i dati verranno cancellati e tutti gli associati a questa entità lavorativa non avranno più accesso.",

        # Additional common terms
        "Welcome": "Benvenuto",
        "User": "Utente",
        "Password": "Password",
        "Login": "Accedi",
        "Logout": "Esci",
        "Register": "Registrati",
        "Account": "Account",
        "Organization": "Organizzazione",
        "Team": "Squadra",
        "Manager": "Manager",
        "Worker": "Lavoratore",
        "Employee": "Dipendente",
        "Schedule": "Orario",
        "Calendar": "Calendario",
        "Event": "Evento",
        "Required": "Obbligatorio",
        "Optional": "Facoltativo",
        "All": "Tutto",
        "None": "Nessuno",
        "Select": "Seleziona",
        "Selected": "Selezionato",
        "Total": "Totale",
        "Count": "Conteggio",
        "From": "Da",
        "To": "A",
        "Today": "Oggi",
        "Yesterday": "Ieri",
        "Tomorrow": "Domani",
        "This Week": "Questa settimana",
        "Last Week": "Settimana scorsa",
        "Next Week": "Prossima settimana",
        "This Month": "Questo mese",
        "Last Month": "Mese scorso",
        "Next Month": "Prossimo mese",
    }

    return translations

def process_xliff_file(input_path, output_path):
    """Process the XLIFF file and add Italian translations where available"""

    try:
        tree = ET.parse(input_path)
        root = tree.getroot()
    except Exception as e:
        print(f"Error parsing XML file: {e}")
        return False

    # Register namespace
    ET.register_namespace('', 'urn:oasis:names:tc:xliff:document:1.2')
    ns = {'': 'urn:oasis:names:tc:xliff:document:1.2'}

    translations = get_italian_translations()
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
    print("TRANSLATION STATISTICS - ITALIAN")
    print("="*70)
    print(f"Total trans-units:              {stats['total']:>6}")
    print(f"Successfully translated:        {stats['translated']:>6}")
    print(f"Skipped (already has target):   {stats['skipped_has_target']:>6}")
    print(f"Skipped (empty source):         {stats['skipped_empty']:>6}")
    print(f"No translation available:       {stats['no_translation']:>6}")
    print("="*70)

    return True

if __name__ == "__main__":
    input_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.it.xlf"
    output_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.it.xlf"

    print("="*70)
    print("Italian Translation Script for messages.it.xlf")
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
