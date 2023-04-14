
# Test technique 


Développeur back end - Node.js / Nest.js & MongoDB

## Développeur back end - Node.js / Nest.js & MongoDB
## Projet de développement

Vous êtes chargé(e) de développer une API de réservation de billets de train en utilisant Node.js et/ou Nest.js et MongoDB comme base de données. Les fonctionnalités de l'API comprennent :
## I. Authentification des utilisateurs


- Les utilisateurs doivent pouvoir s'inscrire et se connecter à l'API pour effectuer des réservations
- Les informations de l'utilisateur doivent être stockées dans la base de données MongoDB

## II. Réservation de billets de train
- Les utilisateurs peuvent annuler leur réservation
- Les informations de la réservation annulée doivent être mises à jour dans la base de données MongoDB
## III. Recherche de billets disponibles
- Les utilisateurs peuvent rechercher des billets disponibles pour un trajet donné
## V. Gestion des sièges
- L'API doit maintenir une liste des sièges disponibles pour chaque trajet
## VI. Envoi de courriers électroniques de confirmation
- Lorsqu'un utilisateur réserve un billet ou annule une réservation, un e-mail de confirmation doit être envoyé à l'utilisateur.
### Tâches
1. Créez une application Node.js et/ou Nest.js.
2. Publiez le repo dans un hébergeur de dépôts Git de votre choix (Github, Gitlab, Bitbucket, …)
3. Mettez en place l'authentification des utilisateurs en utilisant Passport.js et JWT (JSON Web Tokens)
4. Créez un modèle pour les réservations de billets et mettez en place les opérations CRUD (create, read, update, delete) pour les réservations
5. Créez un modèle pour les sièges et mettez en place les opérations CRUD pour les sièges
6. Créez des endpoints pour les fonctionnalités de l'API :

6.1. Endpoint pour l'authentification des utilisateurs 
######
6.2. Endpoint pour la réservation de billets
######
6.3. Endpoint pour l'annulation de réservation
######
6.4. Endpoint pour la recherche de billets disponibles
######
6.5. Endpoint pour la liste des sièges avec le nombre de trajets disponibles
######

7. Utilisez Nodemailer pour envoyer des e-mails de confirmation aux utilisateurs
8. Testez l'API en utilisant Jest et Supertest
9. Si vous utilisez Postman pour tester les API, veuillez exporter les collections postman en json et le mettre dans le projet
### Critères d'évaluation
Vous serez évalué(e) en fonction de votre capacité à : 
- Mettre en place une application Node.js / Nest.js et MongoDB
- Utiliser Git et un hébergeur de dépôts
- Implémenter l'authentification des utilisateurs en utilisant Passport.js et JWT
- Créer des modèles pour les réservations et les sièges et mettre en place les opérations CRUD
- Créer des endpoints pour les fonctionnalités de l'API
- Utiliser Nodemailer pour envoyer des e-mails de confirmation aux utilisateurs
- Tester l'API en utilisant Jest et Supertest
- Écrire un code propre, lisible et bien structuré
- Respecter les meilleures pratiques de développement et de sécurité

Bonne chance!
