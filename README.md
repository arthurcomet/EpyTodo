# 🌟 Projet Web Epitech (EPYTODO) - Première Année 🌟


## 🚀 Description du Projet
Ce projet est une application web développée avec **Node.js** et **Express.js**, dans le cadre de la première année à **Epitech**. L'objectif est d'apprendre les bases du développement backend.  
L'application permet de gérer des utilisateurs et des tâches (**todos**), tout en intégrant des fonctionnalités d'authentification et d'autorisation.

---

## 📂 Structure du Projet

```bash
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
```

## 🛠️ Fonctionnalités

- **Authentification JWT** : Les utilisateurs peuvent s'enregistrer et se connecter pour obtenir un token JWT.
- **Gestion des Utilisateurs** : CRUD (Create, Read, Update, Delete) pour les utilisateurs.
- **Gestion des Todos** : CRUD pour les tâches (todos).
- **Middleware d'Authentification** : Protège les routes sensibles en vérifiant le token JWT.

## 📦 Installation

**1. Clonez le repo:**

```bash
git clone https://github.com/arthurcomet/EpyTodo.git
cd nom-repo
```

**2. Installez les dépendances**

```bash
npm install
```

**3. Configurez les variables d'environnement dans un fichier .env (au même niveau que index.js)**

```bash
PORT=(ex: 3000) 
MYSQL_DATABASE=(ex: epytodo) 
MYSQL_HOST=(ex: localhost) 
MYSQL_ROOT_PASSWORD=(ex: motdepasse1234) 
SECRET=(ex: monsupersecrettrèssécurisé1234!)
```

**4. Démarrez le serveur:**

```bash
node index.js (dans le dossier src)
```

## 🧪 Tests

Utilisez **Postman** ou un autre outil similaire pour tester les
différentes routes de l'application.

## 📧 Contact

Pour toute question ou suggestion, n'hésitez pas à me contacter à :
**arthur.comet@epitech.eu**



















