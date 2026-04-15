<div align="center">

# Eco-Bliss-Bath - Campagne de Tests Automatisés

Ce dépôt contient la suite de tests automatisés réalisée avec Cypress pour l'application e-commerce Eco Bliss Bath. L'objectif est de garantir la stabilité des fonctionnalités critiques (API, Smoke tests, Sécurité et Parcours fonctionnels).
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

---
## Prérequis

Avant de démarrer, assurez-vous d'avoir installé :

- **Docker**
- **Node.js** 

## Installation et démarrage

Pour mettre en place le projet localement, suivez ces étapes :

Cloner le projet
```bash
git clone [https://github.com/votre-username/Eco-Bliss-Bath-V2.git](https://github.com/votre-username/Eco-Bliss-Bath-V2.git)
cd Eco-Bliss-Bath-V2
```

Démarrer le Backend via Docker
```bash
docker compose up -d
```
Installer les dépendances du Frontend
```bash
cd frontend
npm install
```
## Procédure de lancement des tests 

Vous devez d'abord vous placer dans le dossier frontend 
```bash
cd ./frontend
```

Ensuite il faudra installer Cypress dans le projet : 
```bash
npm install cypress --save-dev
```

Vous pouvez ensuite exécuter la suite de tests de deux manières différentes :

1. Avec l'interface Cypress :
```bash
npx cypress open
```
et choisir "E2E Testing"

2. Avec le terminal de votre éditeur de code : 
```bash
npx cypress run
```
## Génération du rapport de tests 
```

