# Hockey Champions League

Bienvenue sur Hockey Champions League !

Vous pouvez gérer l'équipe de Hockey des Canadiens de Montréal.

[![Web App](https://github.com/Glognus/hockey-champions-league/actions/workflows/azure-static-web-apps-brave-cliff-048664610.yml/badge.svg)](https://github.com/Glognus/hockey-champions-league/actions/workflows/azure-static-web-apps-brave-cliff-048664610.yml)

[![API REST](https://github.com/Glognus/hockey-champions-league/actions/workflows/master_hockey-dev-api.yml/badge.svg)](https://github.com/Glognus/hockey-champions-league/actions/workflows/master_hockey-dev-api.yml)

[Application Web] - https://brave-cliff-048664610.1.azurestaticapps.net/

[Api] - https://hockey-dev-api.azurewebsites.net/

[Swagger] - https://hockey-dev-api.azurewebsites.net/api/swagger/ui

### Fonctionnalités :

- Lister la composition de l’équipe en fonction de l'année dans la base de données.
- Ajouter un nouveau joueur de l'équipe d'une année définie dans la base de données.
- Mettre à jour le capitaine de l'équipe d'une année définie en sélectionnant un joueur de la table.

**(Cliquez sur le joueur de la table pour l'assigner comme nouveau capitaine !)**

### Fonctionnalités complémentaire :

- Mise en place des routes : Page principe / Page 404 - [Voir un exemple](https://brave-cliff-048664610.1.azurestaticapps.net/404)
- Snackbar lors d'une bonne création de joueur ou d'une assignation d'un capitaine.
- Opération pour remplir la base de données
- Swagger UI pour l'interaction graphique avec l'API
- Dark mode

### Développement local

Configurez une connection string pour se connecter à une base PostgreSQL dans (./hockey-api/api/_local.settings.json => ./hockey-api/api/local.settings.json)

Pour démarrer l'application web + api + swagger :

```sh
cd hockey-webapp
yarn
yarn start-dev
```

(Un démarrage concurrentiel est fait entre l'application web et l'api)

L’url de l'application locale est :

[Web] - http://localhost:4280/

[Api] - http://localhost:4280/api/

[Swagger] - http://localhost:4280/api/swagger/ui

Pour lancer l'api REST seulement + swagger (debug disponible sur vscode):

```sh
cd hockey-api/api
dotnet restore
func start
```

[Api] - http://localhost:7071/api/

[Swagger] - http://localhost:7071/api/swagger/ui

# Spécifications

L'application est disponible en Saas ou en local.
Elle est entièrement hébergée sur Azure et utilise toutes les briques Saas nécessaires.

### API REST

L'api est entièrement serverless et certifié compatible OpenAPI 3.0.

API disponible ici : [https://hockey-dev-api.azurewebsites.net/]

Playground Swagger: [https://hockey-dev-api.azurewebsites.net/api/swagger/ui/]

La partie api => base de données est mappée pour supporter plusieurs équipes pour plusieurs joueurs.
(Many to Many)

La partie front => api est mappé pour supporter pour l'instant une seule équipe (équipe de Hockey des Canadiens de Montréal) pour plusieurs joueurs en fonctions de l'année.
(One to Many)

## Stack techniques

### Cloud

    - Azure Static web apps
    - Azure PostgreSQL Database
    - Azure Functions

### Backend

    - .NET Core Full Serverless
    - API Rest valide Swagger 3.0
    - PostgreSQL
    - EF Core 6.0 (ORM)

La décision de choisir un ORM était pour être plus rapide sur l'implémentation du reste des fonctionnalités, ce n’est pas une solution adaptée sur des plus gros projets car il peut y avoir un réel impacte sur les performances lorsqu’il y a plusieurs entités en jeu.

### Frontend

    - ReactJS + Typescript (CRA) (Frontend)
    - Zustand (State Management)
    - React Router (Routing)
    - Material UI (UI)
    - Giphy API (Gifs)

J'ai préféré utiliser Zustand a Redux + RxJs, pour éviter de complexifier la partie frontend.
Zustand apporte une implémentation beaucoup plus simple et rapide que Redux, on gère tous comme un hooks.

### Todo

- [ ] Découper le store zustand en plusieurs scopes (common/team)
- [ ] Unit tests
  - [x] backend API
  - [ ] front react
- [ ] Variable d'environnement Giphy

Pour toutes questions ou suggestions, n'hésitez pas à me contacter. 🦖

## License

MIT
