🌟 Projet Web Epitech - Première Année 🌟



🚀 Description du Projet

Ce projet est une application web développée avec Node.js et Express.js. Il s'agit d'un projet de première année à Epitech, visant à 
enseigner les bases du développement web backend. L'application permet de gérer des utilisateurs et des tâches (todos) avec des fonctionnalités 
d'authentification et d'autorisation.

📂 Structure du Projet

.
├── middleware
│   └── auth.js
├── routes
│   ├── auth
│   │   └── auth.js
│   ├── user
│   │   └── user.js
│   └── todos
│       └── todos.js
├── config
│   └── db.js
├── .env
├── index.js
└── package.json


🛠️ Fonctionnalités

Authentification JWT : Les utilisateurs peuvent s'enregistrer et se connecter pour obtenir un token JWT.
Gestion des Utilisateurs : CRUD (Create, Read, Update, Delete) pour les utilisateurs.
Gestion des Todos : CRUD pour les tâches (todos).
Middleware d'Authentification : Protège les routes sensibles en vérifiant le token JWT.

Explication

Initialisation : Le serveur Express est initialisé et configuré pour utiliser les variables d'environnement.
Middleware : Le middleware express.json() est utilisé pour parser les requêtes JSON.
Routes : Les routes pour l'authentification, les utilisateurs et les todos sont définies et protégées par le middleware d'authentification JWT.
Démarrage du Serveur : Le serveur écoute sur le port défini dans les variables d'environnement ou sur le port 3000 par défaut.

📦 Installation

1.Clonez le dépôt :
git clone https://github.com/arthurcomet/EpyTodo.git
cd votre-repo

2.Installez les dépendances
npm install

3.Configurez les variables d'environnement dans un fichier .env :
PORT=(ex: 3000)
MYSQL_DATABASE=(ex: epytodo)
MYSQL_HOST=(ex: localhost)
MYSQL_ROOT_PASSWORD=(ex: motdepasse1234)
SECRET=(ex: monsupersecrettrèssécurisé1234!)

4.Démarrez le serveur (dans le dossier /src):
node index.js

🧪 Tests

Utilisez Postman ou un autre outil similaire pour tester les différentes routes de l'application.

📧 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter à
arthur.comet@epitech.eu
