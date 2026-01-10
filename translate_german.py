#!/usr/bin/env python3
"""
Comprehensive German translation for messages.de.xlf
This script processes the XLIFF file and adds German translations.
"""

import xml.etree.ElementTree as ET
import sys

def get_german_translations():
    """Returns a comprehensive dictionary of English to German translations"""

    translations = {
        # Core Navigation & Menu
        "Members": "Mitglieder",
        "Rules": "Regeln",
        "Shifts": "Schichten",
        "Absences": "Abwesenheiten",
        "Schedules": "Zeitpläne",
        "Dashboard": "Dashboard",
        "Home": "Startseite",
        "Profile": "Profil",
        "Help": "Hilfe",
        "Features": "Funktionen",
        "Settings": "Einstellungen",

        # Basic Actions
        "Save": "Speichern",
        "Create": "Erstellen",
        "Edit": "Bearbeiten",
        "Delete": "Löschen",
        "Cancel": "Abbrechen",
        "Close": "Schließen",
        "Submit": "Absenden",
        "Apply": "Anwenden",
        "Reset": "Zurücksetzen",
        "Update": "Aktualisieren",
        "Add": "Hinzufügen",
        "Remove": "Entfernen",
        "Actions": "Aktionen",
        " Actions ": " Aktionen ",
        "Set": "Festlegen",
        "View": "Ansehen",
        "Search": "Suchen",
        "Filter": "Filtern",
        "Export": "Exportieren",
        "Import": "Importieren",

        # Absence Related
        "Add Absence": "Abwesenheit hinzufügen",
        "Absence Type": "Abwesenheitsart",
        "Absence Start Date": "Beginn der Abwesenheit",
        "Absence End Date": "Ende der Abwesenheit",
        " Full Day Absence ": " Ganztägige Abwesenheit ",
        "Absence Types": "Abwesenheitsarten",

        # Status & States
        "Status": "Status",
        "Pending": "Ausstehend",
        "Approved": "Genehmigt",
        "Rejected": "Abgelehnt",
        "Cancelled": "Abgebrochen",
        "Observations": "Bemerkungen",
        "Active": "Aktiv",
        "Inactive": "Inaktiv",

        # Date & Time
        "Start Date": "Startdatum",
        "End Date": "Enddatum",
        "Start Time": "Startzeit",
        " Start Time ": " Startzeit ",
        "End Time": "Endzeit",
        "Duration": "Dauer",
        " Duration ": " Dauer ",
        "Date": "Datum",
        "Time": "Zeit",

        # Form Fields
        "Name": "Name",
        "Type": "Typ",
        "Description": "Beschreibung",
        "Email": "E-Mail",
        "Phone": "Telefon",
        "Address": "Adresse",

        # Entity Types
        "Business": "Unternehmen",
        "Department": "Abteilung",
        "Other": "Andere",

        # Shift & Breaks
        "Shift Description": "Schichtbeschreibung",
        "Add Break": "Pause hinzufügen",
        " Shift Break Type ": " Pausenart Schicht ",
        "Shift Break Type": "Pausenart Schicht",
        "Break Start Time": "Pausenbeginn",
        "Break Duration": "Pausendauer",
        "Included in the Shift": "In der Schicht enthalten",
        " Included in Shift ": " In Schicht enthalten ",
        "Is Time Flexible": "Zeit flexibel",
        " Time Flexible ": " Zeit flexibel ",
        "Shift Rotation": "Schichtrotation",
        "Is Leave": "Ist Urlaub",
        "Create from Scratch": "Von Grund auf erstellen",
        "Based on Templates": "Basierend auf Vorlagen",

        # Members & Workers
        "Add Member": "Mitglied hinzufügen",
        "Edit Member": "Mitglied bearbeiten",
        "Part of Rotation": "Teil der Rotation",
        "Multiple Shifts Assignments": "Mehrfache Schichtzuweisungen",
        "Multiple Shift": "Mehrfachschicht",
        "Works on Weekdays": "Arbeitet an Wochentagen",
        "Works on Weekends": "Arbeitet am Wochenende",
        "Works Week Days": "Arbeitet Wochentage",
        "Works Week Ends": "Arbeitet Wochenenden",
        "In Rotation": "In Rotation",
        "Order Options": "Sortieroptionen",
        "Select Skill": "Fähigkeit auswählen",
        "Specific Assignments": "Spezifische Zuweisungen",

        # Skills
        "Skill Assignments:": "Fähigkeitszuweisungen:",
        "Skills": "Fähigkeiten",
        "Skill": "Fähigkeit",

        # Help Documentation Sections
        "Introduction": "Einführung",
        "Getting Started": "Erste Schritte",
        "Features Overview": "Funktionsübersicht",
        "Tutorials / How-To Guides": "Tutorials / Anleitungen",
        "FAQ": "Häufig gestellte Fragen",
        "Profile Management": "Profilverwaltung",
        "Privacy & Security": "Datenschutz & Sicherheit",
        "Notifications": "Benachrichtigungen",
        "Billing & Subscriptions": "Abrechnung & Abonnements",
        "Contact Support": "Support kontaktieren",
        "Release Notes / Updates": "Versionshinweise / Updates",
        "Legal / Policies": "Rechtliches / Richtlinien",

        # Common UI Terms
        "Yes": "Ja",
        "No": "Nein",
        "OK": "OK",
        "Confirm": "Bestätigen",
        "Continue": "Fortsetzen",
        "Back": "Zurück",
        "Next": "Weiter",
        "Previous": "Vorherige",
        "Finish": "Beenden",
        "Done": "Fertig",
        "Loading": "Laden",
        "Loading...": "Laden...",
        "Please wait...": "Bitte warten...",
        "Success": "Erfolg",
        "Error": "Fehler",
        "Warning": "Warnung",
        "Info": "Info",

        # Days of Week
        "Monday": "Montag",
        "Tuesday": "Dienstag",
        "Wednesday": "Mittwoch",
        "Thursday": "Donnerstag",
        "Friday": "Freitag",
        "Saturday": "Samstag",
        "Sunday": "Sonntag",

        # Months
        "January": "Januar",
        "February": "Februar",
        "March": "März",
        "April": "April",
        "May": "Mai",
        "June": "Juni",
        "July": "Juli",
        "August": "August",
        "September": "September",
        "October": "Oktober",
        "November": "November",
        "December": "Dezember",

        # Time Units
        "Day": "Tag",
        "Days": "Tage",
        "Week": "Woche",
        "Weeks": "Wochen",
        "Month": "Monat",
        "Months": "Monate",
        "Year": "Jahr",
        "Years": "Jahre",
        "Hour": "Stunde",
        "Hours": "Stunden",
        "Minute": "Minute",
        "Minutes": "Minuten",

        # Help Text - Absences
        "This section provides information about employee absences, including types of absences, policies, and procedures for reporting and managing time off.": "Dieser Abschnitt bietet Informationen über Mitarbeiterabwesenheiten, einschließlich Abwesenheitsarten, Richtlinien und Verfahren zur Meldung und Verwaltung von Freizeit.",
        'First step to adding an absence is to click the "Add Absence" button present on the top part of the view.': 'Der erste Schritt zum Hinzufügen einer Abwesenheit besteht darin, auf die Schaltfläche "Abwesenheit hinzufügen" im oberen Teil der Ansicht zu klicken.',
        "After clicking the button, a form will appear where you can enter the details of the absence, such as the type of absence, start and end dates, and any additional notes.": "Nach dem Klicken auf die Schaltfläche erscheint ein Formular, in dem Sie die Details der Abwesenheit eingeben können, wie z.B. die Art der Abwesenheit, Start- und Enddatum sowie zusätzliche Anmerkungen.",
        "Absences can be of type full day or partial. In a partial absence scenario, the user must specify the time intervals to which he will be absent.": "Abwesenheiten können ganztägig oder teilweise sein. Bei einer teilweisen Abwesenheit muss der Benutzer die Zeitintervalle angeben, in denen er abwesend sein wird.",
        'Once all the necessary information has been filled out, click the "Create" button to add the absence to the system.': 'Sobald alle erforderlichen Informationen ausgefüllt sind, klicken Sie auf die Schaltfläche "Erstellen", um die Abwesenheit dem System hinzuzufügen.',
        "After saving, the new absence will appear in the absences grid.": "Nach dem Speichern wird die neue Abwesenheit im Abwesenheitsraster angezeigt.",
        "Update and Delete": "Aktualisieren und löschen",
        "To update or delete absences, it is done by accessing the edit or delete buttons present on each row of their respective grids.": "Um Abwesenheiten zu aktualisieren oder zu löschen, verwenden Sie die Schaltflächen zum Bearbeiten oder Löschen, die in jeder Zeile der jeweiligen Raster vorhanden sind.",
        "Pressing the edit button will open the same form as when creating an absence, but populated with the existing data.": "Durch Klicken auf die Schaltfläche zum Bearbeiten wird dasselbe Formular wie beim Erstellen einer Abwesenheit geöffnet, jedoch mit den vorhandenen Daten ausgefüllt.",
        "When filling out the form, a mandatory absence type is required to be selected, so that it provides full context to the reason why. Here's a list of all available absence types:": "Beim Ausfüllen des Formulars muss eine Abwesenheitsart ausgewählt werden, um den vollständigen Kontext für den Grund anzugeben. Hier ist eine Liste aller verfügbaren Abwesenheitsarten:",

        # Delete confirmation
        "Are you sure you want to delete this entity? All data will be erased and everyone associated with this work entity will no longer have access.": "Sind Sie sicher, dass Sie diese Entität löschen möchten? Alle Daten werden gelöscht und alle mit dieser Arbeitsentität verbundenen Personen haben keinen Zugriff mehr.",

        # Additional common terms
        "Welcome": "Willkommen",
        "User": "Benutzer",
        "Password": "Passwort",
        "Login": "Anmelden",
        "Logout": "Abmelden",
        "Register": "Registrieren",
        "Account": "Konto",
        "Organization": "Organisation",
        "Team": "Team",
        "Manager": "Manager",
        "Worker": "Arbeiter",
        "Employee": "Mitarbeiter",
        "Schedule": "Zeitplan",
        "Calendar": "Kalender",
        "Event": "Ereignis",
        "Required": "Erforderlich",
        "Optional": "Optional",
        "All": "Alle",
        "None": "Keine",
        "Select": "Auswählen",
        "Selected": "Ausgewählt",
        "Total": "Gesamt",
        "Count": "Anzahl",
        "From": "Von",
        "To": "Bis",
        "Today": "Heute",
        "Yesterday": "Gestern",
        "Tomorrow": "Morgen",
        "This Week": "Diese Woche",
        "Last Week": "Letzte Woche",
        "Next Week": "Nächste Woche",
        "This Month": "Dieser Monat",
        "Last Month": "Letzter Monat",
        "Next Month": "Nächster Monat",
    }

    return translations

def process_xliff_file(input_path, output_path):
    """Process the XLIFF file and add German translations where available"""

    try:
        tree = ET.parse(input_path)
        root = tree.getroot()
    except Exception as e:
        print(f"Error parsing XML file: {e}")
        return False

    # Register namespace
    ET.register_namespace('', 'urn:oasis:names:tc:xliff:document:1.2')
    ns = {'': 'urn:oasis:names:tc:xliff:document:1.2'}

    translations = get_german_translations()
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
    print("TRANSLATION STATISTICS - GERMAN")
    print("="*70)
    print(f"Total trans-units:              {stats['total']:>6}")
    print(f"Successfully translated:        {stats['translated']:>6}")
    print(f"Skipped (already has target):   {stats['skipped_has_target']:>6}")
    print(f"Skipped (empty source):         {stats['skipped_empty']:>6}")
    print(f"No translation available:       {stats['no_translation']:>6}")
    print("="*70)

    return True

if __name__ == "__main__":
    input_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.de.xlf"
    output_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.de.xlf"

    print("="*70)
    print("German Translation Script for messages.de.xlf")
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
