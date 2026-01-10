#!/usr/bin/env python3
"""
Comprehensive French translation for messages.fr.xlf
This script processes the XLIFF file and adds French translations for as many entries as possible.
For entries without predefined translations, it will skip them.
"""

import xml.etree.ElementTree as ET
import sys

def get_comprehensive_translations():
    """Returns a comprehensive dictionary of English to French translations"""

    # This dictionary contains all translations I could identify from reading the file
    translations = {
        # Core Navigation & Menu
        "Members": "Membres",
        "Rules": "Règles",
        "Shifts": "Équipes",
        "Absences": "Absences",
        "Schedules": "Horaires",
        "Dashboard": "Tableau de bord",
        "Home": "Accueil",
        "Profile": "Profil",
        "Help": "Aide",
        "Features": "Fonctionnalités",

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
        "Update": "Mettre à jour",
        "Add": "Ajouter",
        "Remove": "Retirer",
        "Actions": "Actions",
        " Actions ": " Actions ",
        "Set": "Définir",
        "View": "Voir",

        # Absence Related
        "Add Absence": "Ajouter une absence",
        "Absence Type": "Type d'absence",
        "Absence Start Date": "Date de début d'absence",
        "Absence End Date": "Date de fin d'absence",
        " Full Day Absence ": " Absence toute la journée ",
        "Absence Types": "Types d'absence",

        # Status & States
        "Status": "Statut",
        "Pending": "En attente",
        "Approved": "Approuvé",
        "Rejected": "Rejeté",
        "Cancelled": "Annulé",
        "Observations": "Observations",

        # Date & Time
        "Start Date": "Date de début",
        "End Date": "Date de fin",
        "Start Time": "Heure de début",
        " Start Time ": " Heure de début ",
        "End Time": "Heure de fin",
        "Duration": "Durée",
        " Duration ": " Durée ",

        # Form Fields
        "Name": "Nom",
        "Type": "Type",
        "Description": "Description",
        "Email": "E-mail",

        # Entity Types
        "Business": "Entreprise",
        "Department": "Département",
        "Other": "Autre",

        # Shift & Breaks
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

        # Members & Workers
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

        # Help Documentation Sections
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

        # Help Text - Absences
        "This section provides information about employee absences, including types of absences, policies, and procedures for reporting and managing time off.": "Cette section fournit des informations sur les absences des employés, y compris les types d'absences, les politiques et les procédures pour signaler et gérer les congés.",
        'First step to adding an absence is to click the "Add Absence" button present on the top part of the view.': 'La première étape pour ajouter une absence consiste à cliquer sur le bouton "Ajouter une absence" présent en haut de la vue.',
        "After clicking the button, a form will appear where you can enter the details of the absence, such as the type of absence, start and end dates, and any additional notes.": "Après avoir cliqué sur le bouton, un formulaire apparaîtra où vous pourrez saisir les détails de l'absence, tels que le type d'absence, les dates de début et de fin, ainsi que des notes supplémentaires.",
        "Absences can be of type full day or partial. In a partial absence scenario, the user must specify the time intervals to which he will be absent.": "Les absences peuvent être de type journée complète ou partielle. Dans un scénario d'absence partielle, l'utilisateur doit spécifier les intervalles de temps pendant lesquels il sera absent.",
        'Once all the necessary information has been filled out, click the "Create" button to add the absence to the system.': 'Une fois que toutes les informations nécessaires ont été remplies, cliquez sur le bouton "Créer" pour ajouter l\'absence au système.',
        "After saving, the new absence will appear in the absences grid.": "Après l'enregistrement, la nouvelle absence apparaîtra dans la grille des absences.",
        "Update and Delete": "Mettre à jour et supprimer",
        "To update or delete absences, it is done by accessing the edit or delete buttons present on each row of their respective grids.": "Pour mettre à jour ou supprimer des absences, cela se fait en accédant aux boutons de modification ou de suppression présents sur chaque ligne de leurs grilles respectives.",
        "Pressing the edit button will open the same form as when creating an absence, but populated with the existing data.": "Appuyer sur le bouton de modification ouvrira le même formulaire que lors de la création d'absence, mais rempli avec les données existantes.",
        "When filling out the form, a mandatory absence type is required to be selected, so that it provides full context to the reason why. Here's a list of all available absence types:": "Lors du remplissage du formulaire, un type d'absence obligatoire doit être sélectionné, afin de fournir le contexte complet de la raison. Voici une liste de tous les types d'absence disponibles :",

        # Help Text - Members
        "This is where you'll see and manage the members of the organization.": "C'est ici que vous verrez et gérerez les membres de l'organisation.",
        "List or Grid?": "Liste ou grille ?",
        "From this page, you can see all members and can choose in what you": "Depuis cette page, vous pouvez voir tous les membres et choisir dans quel",
        "Filter what you want to see": "Filtrer ce que vous voulez voir",
        "You can filter members by their roles, availability, or other criteria to quickly find specific individuals or groups within your organization.": "Vous pouvez filtrer les membres par leurs rôles, leur disponibilité ou d'autres critères pour trouver rapidement des personnes ou des groupes spécifiques au sein de votre organisation.",
        "By clicking on the filters button, a popup will appear with following options:": "En cliquant sur le bouton de filtres, une fenêtre contextuelle apparaîtra avec les options suivantes :",
        "Adding New Members": "Ajout de nouveaux membres",
        'To add a new member to the organization, click on the "Add Member" button. A popup will appear to which you have the following options:': 'Pour ajouter un nouveau membre à l\'organisation, cliquez sur le bouton "Ajouter un membre". Une fenêtre contextuelle apparaîtra avec les options suivantes :',
        "When a member is invited by email, it will send a notification to the user to join your work organization, to which it will be up to decision. On the other hand, creating a profile will create an impersonator/standin that the manager can use for either simulation purposes or to take the place of someone who hasn't joined the work organization yet. This profile will be exclusive to the organization, so it will not be showned anywhere else.": "Lorsqu'un membre est invité par e-mail, cela enverra une notification à l'utilisateur pour rejoindre votre organisation de travail, ce qui sera à sa décision. D'autre part, la création d'un profil créera un remplaçant/doublure que le gestionnaire peut utiliser à des fins de simulation ou pour prendre la place de quelqu'un qui n'a pas encore rejoint l'organisation de travail. Ce profil sera exclusif à l'organisation, il ne sera donc affiché nulle part ailleurs.",
        "You can make these operations for when you wish to invite someone, or creating someone, to the exception of assigning specific shifts. Once the person has joined the work entity, you can then assign specific shifts if required.": "Vous pouvez effectuer ces opérations lorsque vous souhaitez inviter quelqu'un ou créer quelqu'un, à l'exception de l'affectation d'équipes spécifiques. Une fois que la personne a rejoint l'entité de travail, vous pouvez ensuite attribuer des équipes spécifiques si nécessaire.",
        "Editing Members": "Modification des membres",
        'As a manager, you can update these at any time, by pressing the edit button visible for each worker, in the "Actions" column. You can also remove them from the organization, using the remove button also present in the same column.': 'En tant que gestionnaire, vous pouvez les mettre à jour à tout moment en appuyant sur le bouton de modification visible pour chaque travailleur, dans la colonne "Actions". Vous pouvez également les retirer de l\'organisation en utilisant le bouton de suppression également présent dans la même colonne.',

        # Help Text - Rules
        "In order for schedules to tailor into the needs of the managers, each work entity must have a set of rules that the application will then interpret to generate a schedule.": "Pour que les horaires soient adaptés aux besoins des gestionnaires, chaque entité de travail doit disposer d'un ensemble de règles que l'application interprétera ensuite pour générer un horaire.",
        'First step to adding a rule is to click the "Add Rule" button present on the top part of the view.': 'La première étape pour ajouter une règle consiste à cliquer sur le bouton "Ajouter une règle" présent en haut de la vue.',
        "After clicking the button, the first form will appear with the following fields:": "Après avoir cliqué sur le bouton, le premier formulaire apparaîtra avec les champs suivants :",
        "When a rule is selected, a secondary form will appear based on the rule type, for different kind of fields may be required to create the specifications that complement the rule.": "Lorsqu'une règle est sélectionnée, un formulaire secondaire apparaîtra en fonction du type de règle, car différents types de champs peuvent être nécessaires pour créer les spécifications qui complètent la règle.",
        'After filling the specifications form, pressing the "+" button will to save the rule specification. Some rules will allow for multiple specifications to be added to the same rule type, like the example below:': 'Après avoir rempli le formulaire de spécifications, appuyer sur le bouton "+" permettra d\'enregistrer la spécification de la règle. Certaines règles permettront d\'ajouter plusieurs spécifications au même type de règle, comme dans l\'exemple ci-dessous :',
        'Finally, pressing the "Save" button, will save the rule to the work entity.': 'Enfin, appuyer sur le bouton "Enregistrer" enregistrera la règle dans l\'entité de travail.',
        "To update or delete rules and their specifications, it is done by accessing the edit or delete buttons present on each row of their respective grids.": "Pour mettre à jour ou supprimer des règles et leurs spécifications, cela se fait en accédant aux boutons de modification ou de suppression présents sur chaque ligne de leurs grilles respectives.",
        "Pressing the edit button will open the same forms as when creating a rule, but populated with the existing data.": "Appuyer sur le bouton de modification ouvrira les mêmes formulaires que lors de la création d'une règle, mais remplis avec les données existantes.",
        "Know the Rules Types": "Connaître les types de règles",
        "Rule types dictate the behaviour of schedule generating operations. They can be of single instance, meaning only one rule of that specific type can exist at any given time, multiple instances, single or multiple specifications, with different type of references that can be associated.": "Les types de règles dictent le comportement des opérations de génération d'horaires. Ils peuvent être à instance unique, ce qui signifie qu'une seule règle de ce type spécifique peut exister à un moment donné, à instances multiples, à spécifications uniques ou multiples, avec différents types de références pouvant être associés.",
        "Here's a list of all available rule types and their descriptions:": "Voici une liste de tous les types de règles disponibles et leurs descriptions :",
        "Max. Hours by Day": "Heures max. par jour",
        "Min. Hours per Week": "Heures min. par semaine",

        # Help Text - More general
        "Once you're familiar with the basics, explore our:": "Une fois que vous êtes familiarisé avec les bases, explorez nos :",

        # Delete confirmation
        "Are you sure you want to delete this entity? All data will be erased and everyone associated with this work entity will no longer have access.": "Êtes-vous sûr de vouloir supprimer cette entité ? Toutes les données seront effacées et toutes les personnes associées à cette entité de travail n'y auront plus accès.",
    }

    return translations


def process_xliff_file(input_path, output_path):
    """
    Process the XLIFF file and add French translations where available
    """

    # Parse XML
    try:
        tree = ET.parse(input_path)
        root = tree.getroot()
    except Exception as e:
        print(f"Error parsing XML file: {e}")
        return False

    # Register namespace to preserve it
    ET.register_namespace('', 'urn:oasis:names:tc:xliff:document:1.2')
    ns = {'': 'urn:oasis:names:tc:xliff:document:1.2'}

    # Get translations
    translations = get_comprehensive_translations()

    # Find all trans-units
    trans_units = root.findall('.//trans-unit', ns)

    stats = {
        'total': len(trans_units),
        'translated': 0,
        'skipped_empty': 0,
        'skipped_has_target': 0,
        'no_translation': 0
    }

    no_translation_samples = []

    print(f"Processing {stats['total']} trans-units...")

    for unit in trans_units:
        source = unit.find('source', ns)
        target = unit.find('target', ns)

        # Skip if target already exists
        if target is not None:
            stats['skipped_has_target'] += 1
            continue

        # Skip if no source
        if source is None:
            stats['skipped_empty'] += 1
            continue

        # Get source text
        source_text = source.text
        if not source_text or not source_text.strip():
            stats['skipped_empty'] += 1
            continue

        # Check if we have a translation
        if source_text in translations:
            # Create target element
            target = ET.Element('target')
            target.text = translations[source_text]

            # Insert target after source
            source_index = list(unit).index(source)
            unit.insert(source_index + 1, target)

            stats['translated'] += 1
        else:
            stats['no_translation'] += 1
            if len(no_translation_samples) < 20:
                no_translation_samples.append(source_text[:80])

    # Write output
    try:
        tree.write(output_path, encoding='UTF-8', xml_declaration=True)
        print(f"\nSuccessfully wrote translated file to: {output_path}")
    except Exception as e:
        print(f"Error writing output file: {e}")
        return False

    # Print statistics
    print("\n" + "="*70)
    print("TRANSLATION STATISTICS")
    print("="*70)
    print(f"Total trans-units:              {stats['total']:>6}")
    print(f"Successfully translated:        {stats['translated']:>6}")
    print(f"Skipped (already has target):   {stats['skipped_has_target']:>6}")
    print(f"Skipped (empty source):         {stats['skipped_empty']:>6}")
    print(f"No translation available:       {stats['no_translation']:>6}")
    print("="*70)

    if no_translation_samples:
        print("\nSample of entries without translation (first 20):")
        for i, sample in enumerate(no_translation_samples, 1):
            print(f"{i:2}. {sample}...")

    print("\nNOTE: Entries without translations were left without <target> elements.")
    print("These may be interpolation placeholders or complex formatted text.")

    return True


if __name__ == "__main__":
    input_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.fr.xlf"
    output_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.fr.xlf"

    print("="*70)
    print("French Translation Script for messages.fr.xlf")
    print("="*70)
    print(f"Input:  {input_file}")
    print(f"Output: {output_file}")
    print("="*70)
    print()

    success = process_xliff_file(input_file, output_file)

    if success:
        print("\n" + "="*70)
        print("Translation process completed successfully!")
        print("="*70)
        sys.exit(0)
    else:
        print("\n" + "="*70)
        print("Translation process failed!")
        print("="*70)
        sys.exit(1)
