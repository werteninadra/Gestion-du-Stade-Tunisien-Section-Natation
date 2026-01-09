# 🏊‍♂️ Système de Gestion du Stade Tunisien – Section Natation

## 📌 Contexte du projet
Ce projet s’inscrit dans le cadre d’un **Projet de Fin d’Études (PFE)** et vise à concevoir et développer un **système informatique intégré** pour la gestion de la section natation du Stade Tunisien.

Le système permet de centraliser la gestion des membres, des adhésions, du planning, des finances, des compétitions ainsi que la génération de rapports et statistiques, tout en offrant un **portail membre sécurisé**.

---

## 🎯 Objectifs du système
- Digitaliser la gestion des adhésions et cotisations
- Optimiser la planification des créneaux piscine et des entraîneurs
- Assurer un suivi financier complet (recettes, dépenses, subventions)
- Gérer les compétitions et les inscriptions des nageurs
- Fournir un espace personnel aux membres
- Générer des rapports financiers et statistiques
- Intégrer des fonctionnalités intelligentes basées sur l’IA

---

## 🧩 Modules fonctionnels

### 👥 Gestion des membres
- Inscription et création des profils nageurs
- Gestion des informations personnelles
- Classification par catégorie d’âge
- Affectation aux groupes d’entraînement
- Gestion des documents (certificat médical, autorisation parentale)
- Historique des adhésions

### 💰 Suivi financier
- Définition des tarifs par catégorie et saison
- Gestion des paiements (espèces, chèque, virement)
- Paiements échelonnés
- Suivi des retards et relances
- Historique des transactions
- Gestion des remises et cas particuliers

### 🗓️ Planning & créneaux
- Définition des créneaux horaires de la piscine
- Affectation des créneaux aux groupes
- Gestion des entraîneurs et disponibilités
- Calendrier interactif
- Gestion des absences et remplacements
- Notifications de changement de planning

### 🏆 Compétitions
- Gestion du calendrier des compétitions
- Inscription des nageurs aux épreuves
- Suivi des performances
- Génération des listes d’engagement
- Historique des résultats et classements

### 👤 Portail membre
- Authentification sécurisée
- Consultation du planning personnel
- Suivi de la situation financière
- Historique des paiements
- Téléchargement des reçus
- Inscription aux compétitions
- Messagerie avec le club

### 📊 Rapports & statistiques
- Tableau de bord global
- Rapports financiers (recettes, prévisions, impayés)
- Statistiques des adhésions
- Taux de recouvrement
- Export PDF / Excel
- Graphiques interactifs

### ⚙️ Administration
- Gestion des utilisateurs et des rôles
- Paramétrage des saisons sportives
- Configuration des tarifs
- Gestion des catégories et groupes
- Sauvegarde et restauration des données
- Journal d’audit des actions

---

## 🤖 Partie Intelligence Artificielle (IA)
- Analyse des données financières historiques
- Prédiction des recettes mensuelles
- Détection automatique des risques de retard de paiement
- Aide à la prise de décision pour la planification

---

## 🎨 UI / UX
- Interfaces modernes et intuitives
- Responsive Design (Mobile First)
- Wireframes et maquettes (Figma)
- Expérience utilisateur optimisée pour administrateurs et membres

---

## ⚙️ Architecture & Technologies

### Frontend
- Angular
- TypeScript
- Angular Material / Tailwind CSS
- Chart.js / Recharts

### Backend
- Spring Boot
- Spring Security
- REST API
- JPA / Hibernate

### Base de données
- MySQL

### IA
- Python
- Flask
- Pandas / Scikit-learn

### DevOps
- Git & GitHub
- Docker & Docker Compose
- CI/CD
- Tests automatisés

---

## 🏗️ Architecture globale
- Architecture en couches (Controller, Service, Repository)
- API REST sécurisée
- Séparation Frontend / Backend
- Microservice IA indépendant

---

## 🚀 Lancement du projet



### Démarrage
```bash
# Backend
cd backend
mvn spring-boot:run

# Frontend
cd frontend
npm install
ng serve
