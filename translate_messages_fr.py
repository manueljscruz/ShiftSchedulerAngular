#!/usr/bin/env python3
"""
Comprehensive script to add French translations to messages.fr.xlf
Reads the entire file, extracts all source texts, and adds French translations
"""

import xml.etree.ElementTree as ET
import re
from typing import Dict, Set

def build_comprehensive_translation_dict() -> Dict[str, str]:
    """Build comprehensive French translation dictionary"""
    return {
        # Navigation & Menu
        "Members": "Membres",
        "Rules": "Règles",
        "Shifts": "Équipes",
        "Absences": "Absences",
        "Dashboard": "Tableau de bord",
        "Home": "Accueil",
        "Profile": "Profil",
        "Settings": "Paramètres",
        "Help": "Aide",
        "About": "À propos",
        "Contact": "Contact",
        "Privacy": "Confidentialité",
        "Terms": "Conditions",
        "Features": "Fonctionnalités",
        "Documentation": "Documentation",

        # Common UI Actions
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
        "Print": "Imprimer",
        "Download": "Télécharger",
        "Upload": "Téléverser",
        "Back": "Retour",
        "Next": "Suivant",
        "Previous": "Précédent",
        "Finish": "Terminer",
        "Continue": "Continuer",
        "Skip": "Ignorer",
        "Done": "Terminé",
        "OK": "OK",
        "Yes": "Oui",
        "No": "Non",
        "Confirm": "Confirmer",
        "Actions": "Actions",
        "Options": "Options",
        "Details": "Détails",
        "More": "Plus",
        "Less": "Moins",
        "Show": "Afficher",
        "Hide": "Masquer",
        "Expand": "Développer",
        "Collapse": "Réduire",
        "Select": "Sélectionner",
        "Selected": "Sélectionné",
        "Deselect": "Désélectionner",
        "Select All": "Tout sélectionner",
        "Deselect All": "Tout désélectionner",
        "Copy": "Copier",
        "Paste": "Coller",
        "Cut": "Couper",
        "Duplicate": "Dupliquer",
        "Move": "Déplacer",
        "Rename": "Renommer",
        "Archive": "Archiver",
        "Restore": "Restaurer",
        "Undo": "Annuler",
        "Redo": "Rétablir",

        # Absence Related
        "Add Absence": "Ajouter une absence",
        "Absence Type": "Type d'absence",
        "Absence Start Date": "Date de début d'absence",
        "Absence End Date": "Date de fin d'absence",
        " Full Day Absence ": " Absence toute la journée ",
        "Full Day Absence": "Absence toute la journée",
        "Observations": "Observations",
        "Pending": "En attente",
        "Approved": "Approuvé",
        "Rejected": "Rejeté",
        "Cancelled": "Annulé",

        # Date & Time
        "Start Date": "Date de début",
        "End Date": "Date de fin",
        "Start Time": "Heure de début",
        "End Time": "Heure de fin",
        "Date": "Date",
        "Time": "Heure",
        "DateTime": "Date et heure",
        "Duration": "Durée",
        "From": "De",
        "To": "À",
        "Between": "Entre",
        "Today": "Aujourd'hui",
        "Yesterday": "Hier",
        "Tomorrow": "Demain",
        "This Week": "Cette semaine",
        "Last Week": "Semaine dernière",
        "Next Week": "Semaine prochaine",
        "This Month": "Ce mois-ci",
        "Last Month": "Mois dernier",
        "Next Month": "Mois prochain",
        "This Year": "Cette année",
        "Last Year": "Année dernière",
        "Next Year": "Année prochaine",

        # Days of Week
        "Monday": "Lundi",
        "Tuesday": "Mardi",
        "Wednesday": "Mercredi",
        "Thursday": "Jeudi",
        "Friday": "Vendredi",
        "Saturday": "Samedi",
        "Sunday": "Dimanche",
        "Mon": "Lun",
        "Tue": "Mar",
        "Wed": "Mer",
        "Thu": "Jeu",
        "Fri": "Ven",
        "Sat": "Sam",
        "Sun": "Dim",

        # Months
        "January": "Janvier",
        "February": "Février",
        "March": "Mars",
        "April": "Avril",
        "May": "Mai",
        "June": "Juin",
        "July": "Juillet",
        "August": "Août",
        "September": "Septembre",
        "October": "Octobre",
        "November": "Novembre",
        "December": "Décembre",

        # Time Units
        "Day": "Jour",
        "Days": "Jours",
        "Week": "Semaine",
        "Weeks": "Semaines",
        "Month": "Mois",
        "Months": "Mois",
        "Year": "Année",
        "Years": "Années",
        "Hour": "Heure",
        "Hours": "Heures",
        "Minute": "Minute",
        "Minutes": "Minutes",
        "Second": "Seconde",
        "Seconds": "Secondes",

        # Form Fields
        "Name": "Nom",
        "Type": "Type",
        "Description": "Description",
        "Email": "E-mail",
        "Phone": "Téléphone",
        "Address": "Adresse",
        "City": "Ville",
        "Country": "Pays",
        "Postal Code": "Code postal",
        "Status": "Statut",
        "Notes": "Notes",
        "Comments": "Commentaires",
        "Message": "Message",
        "Subject": "Sujet",
        "Title": "Titre",
        "Category": "Catégorie",
        "Priority": "Priorité",
        "Tags": "Étiquettes",
        "Label": "Libellé",
        "Value": "Valeur",
        "Quantity": "Quantité",
        "Amount": "Montant",
        "Total": "Total",
        "Count": "Nombre",
        "Size": "Taille",
        "Format": "Format",
        "Version": "Version",
        "Language": "Langue",
        "First Name": "Prénom",
        "Last Name": "Nom de famille",
        "Full Name": "Nom complet",
        "Display Name": "Nom d'affichage",

        # Authentication
        "Login": "Connexion",
        "Logout": "Déconnexion",
        "Register": "S'inscrire",
        "Sign Up": "S'inscrire",
        "Sign In": "Se connecter",
        "Sign Out": "Se déconnecter",
        "Forgot Password": "Mot de passe oublié",
        "Forgot Password?": "Mot de passe oublié ?",
        "Password": "Mot de passe",
        "Username": "Nom d'utilisateur",
        "Confirm Password": "Confirmer le mot de passe",
        "New Password": "Nouveau mot de passe",
        "Old Password": "Ancien mot de passe",
        "Current Password": "Mot de passe actuel",
        "Remember Me": "Se souvenir de moi",
        "Keep me logged in": "Rester connecté",

        # Users & Roles
        "User": "Utilisateur",
        "Users": "Utilisateurs",
        "Account": "Compte",
        "My Account": "Mon compte",
        "Admin": "Administrateur",
        "Administrator": "Administrateur",
        "Role": "Rôle",
        "Roles": "Rôles",
        "Permission": "Permission",
        "Permissions": "Permissions",
        "Access": "Accès",
        "Full Access": "Accès complet",
        "Limited Access": "Accès limité",
        "No Access": "Aucun accès",
        "Read Only": "Lecture seule",
        "Owner": "Propriétaire",
        "Manager": "Gestionnaire",
        "Viewer": "Observateur",
        "Editor": "Éditeur",
        "Guest": "Invité",

        # Entity/Organization
        "Entity": "Entité",
        "Entities": "Entités",
        "Organization": "Organisation",
        "Organizations": "Organisations",
        "Department": "Département",
        "Business": "Entreprise",
        "Other": "Autre",
        "Team": "Équipe",
        "Teams": "Équipes",
        "Group": "Groupe",
        "Groups": "Groupes",

        # Workers
        "Worker": "Travailleur",
        "Workers": "Travailleurs",
        "Employee": "Employé",
        "Employees": "Employés",
        "Member": "Membre",
        "Add Member": "Ajouter un membre",
        "Edit Member": "Modifier le membre",
        "Remove Member": "Retirer le membre",

        # Schedule
        "Schedule": "Horaire",
        "Schedules": "Horaires",
        "Create Schedule": "Créer un horaire",
        "View Schedule": "Voir l'horaire",
        "Edit Schedule": "Modifier l'horaire",
        "Delete Schedule": "Supprimer l'horaire",
        "Calendar": "Calendrier",
        "Event": "Événement",
        "Events": "Événements",
        "Appointment": "Rendez-vous",
        "Appointments": "Rendez-vous",

        # Shifts
        "Shift": "Équipe",
        "Add Shift": "Ajouter une équipe",
        "Edit Shift": "Modifier l'équipe",
        "Delete Shift": "Supprimer l'équipe",
        "Shift Template": "Modèle d'équipe",
        "Shift Type": "Type d'équipe",
        "Morning Shift": "Équipe du matin",
        "Afternoon Shift": "Équipe de l'après-midi",
        "Evening Shift": "Équipe du soir",
        "Night Shift": "Équipe de nuit",
        "Rotation": "Rotation",
        "Rotations": "Rotations",
        "Break": "Pause",
        "Breaks": "Pauses",
        "Coverage": "Couverture",
        "Capacity": "Capacité",
        "Workload": "Charge de travail",

        # Skills
        "Skill": "Compétence",
        "Skills": "Compétences",
        "Skill Assignments:": "Affectations de compétences :",
        "Required Skills": "Compétences requises",
        "Optional Skills": "Compétences facultatives",
        "Qualification": "Qualification",
        "Qualifications": "Qualifications",
        "Certificate": "Certificat",
        "Certificates": "Certificats",
        "Training": "Formation",
        "Experience": "Expérience",
        "Level": "Niveau",
        "Beginner": "Débutant",
        "Intermediate": "Intermédiaire",
        "Advanced": "Avancé",
        "Expert": "Expert",

        # Status & State
        "Active": "Actif",
        "Inactive": "Inactif",
        "Enabled": "Activé",
        "Disabled": "Désactivé",
        "Available": "Disponible",
        "Unavailable": "Indisponible",
        "Online": "En ligne",
        "Offline": "Hors ligne",
        "Open": "Ouvert",
        "Closed": "Fermé",
        "Visible": "Visible",
        "Hidden": "Masqué",
        "Public": "Public",
        "Private": "Privé",
        "Draft": "Brouillon",
        "Published": "Publié",
        "Archived": "Archivé",
        "Complete": "Terminé",
        "Completed": "Terminé",
        "Incomplete": "Incomplet",
        "In Progress": "En cours",
        "Not Started": "Non commencé",
        "On Hold": "En attente",
        "Paused": "En pause",
        "Running": "En cours",
        "Stopped": "Arrêté",
        "Finished": "Terminé",
        "Failed": "Échoué",
        "Passed": "Réussi",
        "Success": "Succès",
        "Successful": "Réussi",
        "Error": "Erreur",
        "Warning": "Avertissement",
        "Info": "Info",
        "Information": "Information",

        # Messages & Notifications
        "Messages": "Messages",
        "Notification": "Notification",
        "Notifications": "Notifications",
        "Alert": "Alerte",
        "Alerts": "Alertes",
        "Reminder": "Rappel",
        "Reminders": "Rappels",
        "Loading": "Chargement",
        "Loading...": "Chargement...",
        "Please wait...": "Veuillez patienter...",
        "Processing": "Traitement en cours",
        "Saving": "Enregistrement",
        "Saved": "Enregistré",
        "Saving...": "Enregistrement...",
        "Sending": "Envoi",
        "Sent": "Envoyé",
        "Deleting": "Suppression",
        "Deleted": "Supprimé",
        "Creating": "Création",
        "Created": "Créé",
        "Updating": "Mise à jour",
        "Updated": "Mis à jour",

        # Validation
        "Required": "Obligatoire",
        "Optional": "Facultatif",
        "Invalid": "Invalide",
        "Valid": "Valide",
        "Verified": "Vérifié",
        "Unverified": "Non vérifié",
        "Confirmed": "Confirmé",
        "Unconfirmed": "Non confirmé",

        # Data Display
        "All": "Tous",
        "None": "Aucun",
        "Empty": "Vide",
        "No data": "Aucune donnée",
        "No results": "Aucun résultat",
        "No items": "Aucun élément",
        "Not found": "Introuvable",
        "Sort": "Trier",
        "Sorted": "Trié",
        "Ascending": "Croissant",
        "Descending": "Décroissant",
        "Page": "Page",
        "of": "de",
        "per page": "par page",
        "Items per page": "Éléments par page",
        "First": "Premier",
        "Last": "Dernier",
        "New": "Nouveau",
        "Recent": "Récent",
        "Latest": "Dernier",
        "Oldest": "Plus ancien",

        # File Operations
        "File": "Fichier",
        "Files": "Fichiers",
        "Folder": "Dossier",
        "Document": "Document",
        "Documents": "Documents",
        "Image": "Image",
        "Images": "Images",
        "Attachment": "Pièce jointe",
        "Attachments": "Pièces jointes",

        # Specific Messages
        "Are you sure you want to delete this entity? All data will be erased and everyone associated with this work entity will no longer have access.": "Êtes-vous sûr de vouloir supprimer cette entité ? Toutes les données seront effacées et toutes les personnes associées à cette entité de travail n'y auront plus accès.",
        "Welcome": "Bienvenue",
        "Welcome to": "Bienvenue à",
        "Get Started": "Commencer",
        "Learn More": "En savoir plus",

        # Boolean Values
        "True": "Vrai",
        "False": "Faux",
        "On": "Activé",
        "Off": "Désactivé",

        # Directions
        "Top": "Haut",
        "Bottom": "Bas",
        "Left": "Gauche",
        "Right": "Droite",
        "Center": "Centre",
        "North": "Nord",
        "South": "Sud",
        "East": "Est",
        "West": "Ouest",

        # Size/Quantity
        "Small": "Petit",
        "Medium": "Moyen",
        "Large": "Grand",
        "Extra Small": "Très petit",
        "Extra Large": "Très grand",
        "Low": "Bas",
        "High": "Élevé",
        "Min": "Min",
        "Max": "Max",
        "Average": "Moyenne",
        "Sum": "Somme",

        # Location
        "Location": "Emplacement",
        "Locations": "Emplacements",
        "Address": "Adresse",
        "Office": "Bureau",
        "Building": "Bâtiment",
        "Floor": "Étage",
        "Room": "Salle",
        "Site": "Site",
        "Branch": "Succursale",
        "Region": "Région",
        "Zone": "Zone",

        # Work Types
        "Full Time": "Temps plein",
        "Part Time": "Temps partiel",
        "Contract": "Contrat",
        "Temporary": "Temporaire",
        "Permanent": "Permanent",
        "Hourly": "Horaire",
        "Daily": "Quotidien",
        "Weekly": "Hebdomadaire",
        "Monthly": "Mensuel",
        "Yearly": "Annuel",
        "Annual": "Annuel",

        # Leave Types
        "Leave": "Congé",
        "Sick Leave": "Congé maladie",
        "Personal Leave": "Congé personnel",
        "Vacation": "Vacances",
        "Holiday": "Jour férié",
        "Holidays": "Jours fériés",
        "Maternity Leave": "Congé maternité",
        "Paternity Leave": "Congé paternité",

        # Timestamps
        "Created": "Créé",
        "Created By": "Créé par",
        "Created At": "Créé le",
        "Modified": "Modifié",
        "Modified By": "Modifié par",
        "Modified At": "Modifié le",
        "Updated At": "Mis à jour le",
        "Updated By": "Mis à jour par",
        "Deleted At": "Supprimé le",
        "Deleted By": "Supprimé par",
        "Last Modified": "Dernière modification",
        "Last Updated": "Dernière mise à jour",

        # Common Phrases
        "No changes": "Aucune modification",
        "Are you sure?": "Êtes-vous sûr ?",
        "This action cannot be undone": "Cette action ne peut pas être annulée",
        "Changes saved": "Modifications enregistrées",
        "Changes discarded": "Modifications annulées",
        "Operation successful": "Opération réussie",
        "Operation failed": "Opération échouée",

        # UI Elements
        "Button": "Bouton",
        "Link": "Lien",
        "Menu": "Menu",
        "Tab": "Onglet",
        "Tabs": "Onglets",
        "Panel": "Panneau",
        "Card": "Carte",
        "Table": "Tableau",
        "List": "Liste",
        "Grid": "Grille",
        "Form": "Formulaire",
        "Field": "Champ",
        "Input": "Saisie",
        "Checkbox": "Case à cocher",
        "Radio": "Bouton radio",
        "Dropdown": "Liste déroulante",
        "Modal": "Fenêtre modale",
        "Dialog": "Dialogue",
        "Popup": "Fenêtre contextuelle",
        "Tooltip": "Info-bulle",
        "Icon": "Icône",
        "Badge": "Badge",

        # Chart/Report
        "Chart": "Graphique",
        "Charts": "Graphiques",
        "Graph": "Graphique",
        "Report": "Rapport",
        "Reports": "Rapports",
        "Statistics": "Statistiques",
        "Analytics": "Analytiques",
        "Data": "Données",
        "Export Data": "Exporter les données",
        "Import Data": "Importer les données",

        # Preferences
        "Preferences": "Préférences",
        "Configuration": "Configuration",
        "Theme": "Thème",
        "Light": "Clair",
        "Dark": "Sombre",
        "Auto": "Auto",
        "Color": "Couleur",
        "Font": "Police",
        "Timezone": "Fuseau horaire",

        # Additional Common Terms
        "General": "Général",
        "Advanced": "Avancé",
        "Basic": "Basique",
        "Simple": "Simple",
        "Complex": "Complexe",
        "Custom": "Personnalisé",
        "Default": "Par défaut",
        "Standard": "Standard",
        "Normal": "Normal",
        "Urgent": "Urgent",
        "Important": "Important",
        "Critical": "Critique",
        "Major": "Majeur",
        "Minor": "Mineur",

        # Task Management
        "Task": "Tâche",
        "Tasks": "Tâches",
        "Project": "Projet",
        "Projects": "Projets",
        "Issue": "Problème",
        "Issues": "Problèmes",
        "Bug": "Bogue",
        "Bugs": "Bogues",
        "Feature": "Fonctionnalité",
        "Features": "Fonctionnalités",

        # Social
        "Share": "Partager",
        "Comment": "Commentaire",
        "Reply": "Répondre",
        "Like": "J'aime",
        "Follow": "Suivre",
        "Subscribe": "S'abonner",
        "Bookmark": "Marque-page",
        "Favorite": "Favori",
        "Favorites": "Favoris",

        # Operations
        "Lock": "Verrouiller",
        "Unlock": "Déverrouiller",
        "Pin": "Épingler",
        "Unpin": "Désépingler",
        "Block": "Bloquer",
        "Unblock": "Débloquer",
        "Enable": "Activer",
        "Disable": "Désactiver",
        "Activate": "Activer",
        "Deactivate": "Désactiver",

        # Media
        "Preview": "Aperçu",
        "Zoom In": "Agrandir",
        "Zoom Out": "Réduire",
        "Full Screen": "Plein écran",
        "Rotate": "Pivoter",
        "Crop": "Recadrer",
        "Resize": "Redimensionner",

        # Connectivity
        "Connect": "Connecter",
        "Disconnect": "Déconnecter",
        "Sync": "Synchroniser",
        "Refresh": "Actualiser",
        "Reload": "Recharger",

        # Quality
        "Quality": "Qualité",
        "Excellent": "Excellent",
        "Good": "Bon",
        "Fair": "Correct",
        "Poor": "Faible",

        # Numeric
        "Zero": "Zéro",
        "One": "Un",
        "Two": "Deux",
        "Three": "Trois",
        "Four": "Quatre",
        "Five": "Cinq",
        "Many": "Plusieurs",
        "Few": "Quelques",
        "Several": "Plusieurs",
        "Multiple": "Multiple",

        # Gender
        "Gender": "Genre",
        "Male": "Homme",
        "Female": "Femme",

        # Marital Status
        "Marital Status": "État civil",
        "Single": "Célibataire",
        "Married": "Marié",
        "Divorced": "Divorcé",

        # Relationships
        "Relationship": "Relation",
        "Spouse": "Conjoint",
        "Parent": "Parent",
        "Child": "Enfant",
        "Sibling": "Frère/Sœur",
        "Friend": "Ami",
        "Colleague": "Collègue",
        "Supervisor": "Superviseur",

        # Legal
        "Legal": "Légal",
        "Terms of Service": "Conditions d'utilisation",
        "Privacy Policy": "Politique de confidentialité",
        "Cookie Policy": "Politique relative aux cookies",
        "License": "Licence",
        "Copyright": "Droit d'auteur",

        # Contact
        "Contact Person": "Personne de contact",
        "Emergency Contact": "Contact d'urgence",
        "Phone Number": "Numéro de téléphone",
        "Mobile": "Mobile",
        "Fax": "Fax",
        "Website": "Site web",

        # Financial
        "Price": "Prix",
        "Cost": "Coût",
        "Amount": "Montant",
        "Total": "Total",
        "Subtotal": "Sous-total",
        "Tax": "Taxe",
        "Discount": "Remise",
        "Payment": "Paiement",
        "Invoice": "Facture",
        "Receipt": "Reçu",
        "Balance": "Solde",
        "Credit": "Crédit",
        "Debit": "Débit",
        "Salary": "Salaire",
        "Wage": "Salaire",
        "Bonus": "Prime",

        # Additional entities
        "Product": "Produit",
        "Products": "Produits",
        "Service": "Service",
        "Services": "Services",
        "Item": "Article",
        "Items": "Articles",
        "Order": "Commande",
        "Orders": "Commandes",
        "Customer": "Client",
        "Customers": "Clients",
        "Client": "Client",
        "Clients": "Clients",
        "Vendor": "Fournisseur",
        "Supplier": "Fournisseur",
        "Partner": "Partenaire",

        # Measurement
        "Unit": "Unité",
        "Units": "Unités",
        "Quantity": "Quantité",
        "Weight": "Poids",
        "Height": "Hauteur",
        "Width": "Largeur",
        "Length": "Longueur",
        "Distance": "Distance",
        "Speed": "Vitesse",
        "Temperature": "Température",
        "Volume": "Volume",

        # Technology
        "Software": "Logiciel",
        "Hardware": "Matériel",
        "Application": "Application",
        "System": "Système",
        "Database": "Base de données",
        "Server": "Serveur",
        "Network": "Réseau",
        "Internet": "Internet",
        "Web": "Web",
        "Mobile": "Mobile",
        "Desktop": "Bureau",
        "Cloud": "Cloud",

        # Security
        "Security": "Sécurité",
        "Secure": "Sécurisé",
        "Encrypt": "Chiffrer",
        "Decrypt": "Déchiffrer",
        "Protected": "Protégé",
        "Unprotected": "Non protégé",

        # Comparison
        "Compare": "Comparer",
        "Comparison": "Comparaison",
        "Same": "Identique",
        "Different": "Différent",
        "Similar": "Similaire",
        "Equal": "Égal",
        "Not Equal": "Différent",
        "Greater Than": "Supérieur à",
        "Less Than": "Inférieur à",

        # Workflow
        "Workflow": "Flux de travail",
        "Process": "Processus",
        "Step": "Étape",
        "Steps": "Étapes",
        "Stage": "Étape",
        "Stages": "Étapes",
        "Phase": "Phase",
        "Phases": "Phases",

        # Misc
        "Example": "Exemple",
        "Sample": "Exemple",
        "Test": "Test",
        "Demo": "Démo",
        "Trial": "Essai",
        "Beta": "Bêta",
        "Alpha": "Alpha",
        "Release": "Version",
        "Build": "Build",
        "Patch": "Correctif",
        "Hotfix": "Correctif urgent",
        "Maintenance": "Maintenance",
        "Upgrade": "Mise à niveau",
        "Downgrade": "Rétrogradation",
        "Migrate": "Migrer",
        "Migration": "Migration",
        "Backup": "Sauvegarde",
        "Restore": "Restaurer",
        "Recovery": "Récupération",

        # Feedback
        "Feedback": "Retour",
        "Rating": "Évaluation",
        "Review": "Avis",
        "Reviews": "Avis",
        "Testimonial": "Témoignage",
        "Survey": "Sondage",
        "Poll": "Sondage",
        "Vote": "Vote",
        "Voting": "Vote",

        # Invitation
        "Invite": "Inviter",
        "Invitation": "Invitation",
        "Join": "Rejoindre",
        "Leave": "Quitter",
        "Accept": "Accepter",
        "Decline": "Refuser",
        "Reject": "Rejeter",
    }


def extract_text_content(element):
    """
    Extract text content from an XML element, including text from the element
    and all its children, but preserve the structure for interpolations.
    """
    if element.text:
        return element.text.strip()
    return ""


def has_only_interpolation(source_elem):
    """Check if source element contains only interpolation placeholder"""
    if source_elem.text is None or not source_elem.text.strip():
        return True
    text = source_elem.text.strip()
    # Check if it starts with <x id= (interpolation marker)
    if text.startswith('<x id='):
        return True
    return False


def process_xliff_file(input_path: str, output_path: str):
    """Process XLIFF file and add French translations"""

    # Read file content
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Parse XML
    tree = ET.parse(input_path)
    root = tree.getroot()

    # Define namespace
    ns = {'xliff': 'urn:oasis:names:tc:xliff:document:1.2'}

    # Register namespace to preserve it in output
    ET.register_namespace('', 'urn:oasis:names:tc:xliff:document:1.2')

    # Get translation dictionary
    translations = build_comprehensive_translation_dict()

    # Find all trans-units
    trans_units = root.findall('.//xliff:trans-unit', ns)

    translated_count = 0
    skipped_count = 0
    skipped_items = []

    print(f"Processing {len(trans_units)} trans-units...")

    for unit in trans_units:
        source = unit.find('xliff:source', ns)
        target = unit.find('xliff:target', ns)

        # Skip if no source
        if source is None:
            skipped_count += 1
            continue

        # Skip if source has only interpolation
        if has_only_interpolation(source):
            skipped_count += 1
            continue

        # Skip if target already exists
        if target is not None:
            continue

        # Extract source text
        source_text = extract_text_content(source)

        if not source_text:
            skipped_count += 1
            continue

        # Get translation
        translation = None

        # Try exact match
        if source_text in translations:
            translation = translations[source_text]
        else:
            # Try with stripped whitespace
            stripped = source_text.strip()
            if stripped in translations:
                # Preserve original whitespace
                if source_text.startswith(' ') and source_text.endswith(' '):
                    translation = ' ' + translations[stripped] + ' '
                elif source_text.startswith(' '):
                    translation = ' ' + translations[stripped]
                elif source_text.endswith(' '):
                    translation = translations[stripped] + ' '
                else:
                    translation = translations[stripped]

        if translation:
            # Create target element
            target = ET.Element('{urn:oasis:names:tc:xliff:document:1.2}target')
            target.text = translation

            # Insert target after source
            source_index = list(unit).index(source)
            unit.insert(source_index + 1, target)

            translated_count += 1
        else:
            skipped_count += 1
            if source_text not in skipped_items:
                skipped_items.append(source_text)

    # Write output
    tree.write(output_path, encoding='UTF-8', xml_declaration=True)

    print(f"\n{'='*60}")
    print(f"Translation Complete!")
    print(f"{'='*60}")
    print(f"Total trans-units: {len(trans_units)}")
    print(f"Translated: {translated_count} entries")
    print(f"Skipped: {skipped_count} entries")
    print(f"{'='*60}")

    if skipped_items:
        print(f"\nFirst 50 skipped items (no translation found):")
        for item in skipped_items[:50]:
            print(f"  - {item}")
        if len(skipped_items) > 50:
            print(f"  ... and {len(skipped_items) - 50} more")


if __name__ == "__main__":
    input_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.fr.xlf"
    output_file = r"E:\Repositories\ShiftSchedulerAngular\src\locale\messages.fr.xlf.new"

    print("Starting French translation process...")
    process_xliff_file(input_file, output_file)
    print(f"\nNew file created: {output_file}")
    print("Please review the file and then replace the original if satisfied.")
