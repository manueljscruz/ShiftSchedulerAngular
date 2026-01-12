#!/usr/bin/env python3
"""
Complete French translation script for messages.fr.xlf
Processes the entire file and adds French translations for all source entries
"""

import xml.etree.ElementTree as ET
import re

# Comprehensive French translations
FRENCH_TRANSLATIONS = {
    # Basic Actions
    "Save": "Enregistrer",
    "Create": "Créer",
    "Edit": "Modifier",
    "Delete": "Supprimer",
    "Cancel": "Annuler",
    "Close": "Fermer",
    "Submit": "Soumettre",
    "Apply": "Appliquer",
    "Reset": "Réinitialiser",
    "Clear": "Effacer",
    "Refresh": "Actualiser",
    "Update": "Mettre à jour",
    "Add": "Ajouter",
    "Remove": "Retirer",
    "View": "Voir",
    "Search": "Rechercher",
    "Filter": "Filtrer",
    "Export": "Exporter",
    "Import": "Importer",
    "Actions": "Actions",
    " Actions ": " Actions ",
    "Set": "Définir",
    "Continue": "Continuer",

    # Navigation
    "Members": "Membres",
    "Rules": "Règles",
    "Shifts": "Équipes",
    "Absences": "Absences",
    "Schedules": "Horaires",
    "Dashboard": "Tableau de bord",
    "Home": "Accueil",
    "Profile": "Profil",
    "Help": "Aide",

    # Absences
    "Add Absence": "Ajouter une absence",
    "Absence Type": "Type d'absence",
    "Absence Start Date": "Date de début d'absence",
    "Absence End Date": "Date de fin d'absence",
    " Full Day Absence ": " Absence toute la journée ",
    "Full Day Absence": "Absence toute la journée",
    "Absence Types": "Types d'absence",

    # Observations & Status
    "Observations": "Observations",
    "Status": "Statut",
    "Pending": "En attente",
    "Approved": "Approuvé",
    "Rejected": "Rejeté",
    "Cancelled": "Annulé",

    # Date & Time
    "Start Date": "Date de début",
    "End Date": "Date de fin",
    "Start Time": "Heure de début",
    " Start Time ": " Heure de début ",
    "End Time": "Heure de fin",
    "Date": "Date",
    "Time": "Heure",
    "Duration": "Durée",
    " Duration ": " Durée ",

    # Form Fields
    "Name": "Nom",
    "Type": "Type",
    "Description": "Description",
    "Email": "E-mail",

    # Entity/Organization
    "Business": "Entreprise",
    "Department": "Département",
    "Other": "Autre",

    # Shift Related
    "Shift Description": "Description de l'équipe",
    "Add Break": "Ajouter une pause",
    " Shift Break Type ": " Type de pause d'équipe ",
    "Shift Break Type": "Type de pause d'équipe",
    "Break Start Time": "Heure de début de pause",
    "Break Duration": "Durée de la pause",
    "Included in the Shift": "Inclus dans l'équipe",
    " Included in Shift ": " Inclus dans l'équipe ",
    "Is Time Flexible": "Heure flexible",
    " Time Flexible ": " Heure flexible ",
    "Shift Rotation": "Rotation d'équipe",
    "Is Leave": "Est un congé",
    "Create from Scratch": "Créer à partir de zéro",
    "Based on Templates": "Basé sur des modèles",

    # Members/Workers
    "Add Member": "Ajouter un membre",
    "Edit Member": "Modifier le membre",
    "Part of Rotation": "Fait partie de la rotation",
    "Multiple Shifts Assignments": "Affectations d'équipes multiples",
    "Multiple Shift": "Équipe multiple",
    "Works on Weekdays": "Travaille en semaine",
    "Works on Weekends": "Travaille le week-end",
    "Works Week Days": "Travaille en semaine",
    "Works Week Ends": "Travaille le week-end",
    "In Rotation": "En rotation",
    "Order Options": "Options de tri",
    "Select Skill": "Sélectionner une compétence",
    "Specific Assignments": "Affectations spécifiques",

    # Skills
    "Skill Assignments:": "Affectations de compétences :",

    # Help Documentation
    "Introduction": "Introduction",
    "Getting Started": "Démarrage",
    "Features Overview": "Aperçu des fonctionnalités",
    "Tutorials / How-To Guides": "Tutoriels / Guides pratiques",
    "FAQ": "FAQ",
    "Profile Management": "Gestion du profil",
    "Privacy & Security": "Confidentialité et sécurité",
    "Notifications": "Notifications",
    "Billing & Subscriptions": "Facturation et abonnements",
    "Contact Support": "Contacter le support",
    "Release Notes / Updates": "Notes de version / Mises à jour",
    "Legal / Policies": "Légal / Politiques",

    # Long help texts
    "This section provides information about employee absences, including types of absences, policies, and procedures for reporting and managing time off.": "Cette section fournit des informations sur les absences des employés, y compris les types d'absences, les politiques et les procédures pour signaler et gérer les congés.",
    'First step to adding an absence is to click the "Add Absence" button present on the top part of the view.': 'La première étape pour ajouter une absence consiste à cliquer sur le bouton "Ajouter une absence" présent en haut de la vue.',
    "After clicking the button, a form will appear where you can enter the details of the absence, such as the type of absence, start and end dates, and any additional notes.": "Après avoir cliqué sur le bouton, un formulaire apparaîtra où vous pourrez saisir les détails de l'absence, tels que le type d'absence, les dates de début et de fin, ainsi que des notes supplémentaires.",
    "Absences can be of type full day or partial. In a partial absence scenario, the user must specify the time intervals to which he will be absent.": "Les absences peuvent être de type journée complète ou partielle. Dans un scénario d'absence partielle, l'utilisateur doit spécifier les intervalles de temps pendant lesquels il sera absent.",
    'Once all the necessary information has been filled out, click the "Create" button to add the absence to the system.': 'Une fois que toutes les informations nécessaires ont été remplies, cliquez sur le bouton "Créer" pour ajouter l\'absence au système.',
    "After saving, the new absence will appear in the absences grid.": "Après l'enregistrement, la nouvelle absence apparaîtra dans la grille des absences.",
    "Update and Delete": "Mettre à jour et supprimer",
    "To update or delete absences, it is done by accessing the edit or delete buttons present on each row of their respective grids.": "Pour mettre à jour ou supprimer des absences, cela se fait en accédant aux boutons de modification ou de suppression présents sur chaque ligne de leurs grilles respectives.",
    "Pressing the edit button will open the same form as when creating an absence, but populated with the existing data.": "Appuyer sur le bouton de modification ouvrira le même formulaire que lors de la création d'une absence, mais rempli avec les données existantes.",
    "When filling out the form, a mandatory absence type is required to be selected, so that it provides full context to the reason why. Here's a list of all available absence types:": "Lors du remplissage du formulaire, un type d'absence obligatoire doit être sélectionné, afin de fournir le contexte complet de la raison. Voici une liste de tous les types d'absence disponibles :",

    # Delete confirmation
    "Are you sure you want to delete this entity? All data will be erased and everyone associated with this work entity will no longer have access.": "Êtes-vous sûr de vouloir supprimer cette entité ? Toutes les données seront effacées et toutes les personnes associées à cette entité de travail n'y auront plus accès.",
}


def process_xliff(input_file, output_file):
    """Process XLIFF file and add French translations"""

    # Parse the XML file
    tree = ET.parse(input_file)
    root = tree.getroot()

    # Register namespace
    ET.register_namespace('', 'urn:oasis:names:tc:xliff:document:1.2')
    ns = {'': 'urn:oasis:names:tc:xliff:document:1.2'}

    # Find all trans-units
    trans_units = root.findall('.//trans-unit', ns)

    translated_count = 0
    skipped_count = 0
    no_translation_count = 0

    for unit in trans_units:
        source = unit.find('source', ns)
        target = unit.find('target', ns)

        # Skip if no source or target already exists
        if source is None or target is not None:
            continue

        source_text = source.text
        if not source_text or not source_text.strip():
            skipped_count += 1
            continue

        # Check if translation exists
        if source_text in FRENCH_TRANSLATIONS:
            # Create target element
            target = ET.Element('target')
            target.text = FRENCH_TRANSLATIONS[source_text]

            # Insert target after source
            source_index = list(unit).index(source)
            unit.insert(source_index + 1, target)

            translated_count += 1
        else:
            no_translation_count += 1

    # Write the modified XML to output file
    tree.write(output_file, encoding='UTF-8', xml_declaration=True)

    print(f"Translation complete!")
    print(f"Translated: {translated_count} entries")
    print(f"Skipped (empty or has target): {skipped_count} entries")
    print(f"No translation found: {no_translation_count} entries")
    print(f"Total trans-units: {len(trans_units)}")


if __name__ == "__main__":
    input_path = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.fr.xlf"
    output_path = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.fr.xlf.translated"

    process_xliff(input_path, output_path)
    print(f"\nTranslated file saved to: {output_path}")
