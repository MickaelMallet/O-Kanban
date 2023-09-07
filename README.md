# Okanban

Okanban est une application de gestion de tâches de style Trello. Elle permet aux utilisateurs de créer, gérer et suivre leurs tâches dans un format de tableau Kanban.

![Capture d'écran d'Okanban](lien-vers-une-capture-d'écran-si-vous-en-avez-une)

## Fonctionnalités

- Création de tableaux Kanban.
- Ajout, modification et suppression de cartes.
- Drag & Drop pour le réordonnancement des cartes.
- Interface utilisateur intuitive.

## Technologies utilisées

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](https://sequelize.org/)
- [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express) pour la documentation API.

## Installation

1. **Clonez le dépôt** :

   ```bash
   git clone https://github.com/MickaelMallet/O-Kanban.git
   cd Okanban
   ```

2. **Installez les dépendances** :

   ```bash
   npm install
   ```

3. **Initialisez la base de données** :

   ```bash
   npm run db:reset
   ```

4. **Démarrez l'application** :

   - En mode développement :
     
     ```bash
     npm run dev
     ```

   - En mode production :

     ```bash
     npm start
     ```

Naviguez vers l'URL fournie dans la console pour accéder à l'application.

## Tests

Pour exécuter les tests, utilisez la commande :

```bash
npm run test
```
