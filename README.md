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

Pour mettre en place le projet localement, suivez ces étapes 

Ouvrez votre terminal et : 

1.Clonez le projet
```bash
git clone https://github.com/fm35-ux/Eco-Bliss-Bath-P10.git
```

2.Démarrez le Backend via Docker
```bash
docker compose up -d
```
3.Installez les dépendances du Frontend
```bash
cd frontend
npm install
```
4.Démarrez le frontend 
```bash
npm start
```
## Accédez à l'application : 

[EcoBlissBath](http://localhost:4200/#/)

## Accédez à la documentation de l'API : 

[Documentation API](http://localhost:8081/api/doc)

## Données de test

1.Pour la connexion d'un utilisateur : 
- Email : test2@test.fr 
- Mot de passe : testtest

2.Génération de données aléatoires : 

Vous pouvez installer Faker avec cette ligne de commande :
```bash
npm install @faker-js/faker --save-dev
```
Il conviendra ensuite d'intégrer cette ligne de code : 
```javascript 
import { fakerFR } from '@faker-js/faker';
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

1.Avec l'interface Cypress :
```bash
npx cypress open
```
et choisir "E2E Testing"

2.Avec le terminal de votre éditeur de code : 
```bash
npx cypress run
```
## Génération du rapport de tests 

Soit en utilisant la commande : 
```bash
npx cypress run
```

Soit en utilisant le rapporteur de test Mochawesome : 
[Documentation et configuration de Mochawesome](https://docs.cypress.io/app/tooling/reporters)

Commande à exécuter : 
```bash
npm run report
```
Les rapports seront générés dans le dossier cypress/reports.