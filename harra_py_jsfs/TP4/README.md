# TP4 Vendez le vôtre

## Membre du groupe

PY Alexandre
HARRA Hicham

## Clonage du projet 

Pour cloner le projet, utiliser la commande suivante :

`git clone https://gitlab-etu.fil.univ-lille1.fr/harra/harra_py_jsfs.git`

## Installation des fichiers nécessaires au projet 

Pour la création du dossier node_modules : `npm install` dans le dossier vendez_les_votre_harra_py dans la console.
Pour la mise en place de la base de données :
- création d'un dossier dbData à la racine 
- `mongod --dbpath dbData` dans la console.

## Lancement du projet

Pour lancer le serveur :
`nodemon`
dans la console, dans le dossier vendez_les_votre_harra_py.

## Description du projet 

La page d'accueil présente l'ensemble des projets mis en vente ainsi que leur prix.
Cette page possède deux liens sui permettent de se connecter ou bien de créer un compte.

Pour la création d'un compte, il suffit d'entrer un login et un mot de passe. 
Cette page contient également un lien menant à la page de connexion, si l'utilisateur possède déjà un compte.

Pour la connexion, il faut entrer son login ainsi que son mot de passe. 
Cette page possède également un lien menant à la page de création d'un compte. 

Ensuite, nous sommes dirigés vers la page de l'utilisateur.
Depuis cette page, nous pouvons retournés vers la page d'accueil. 
Il est aussi possible de créer un objet en cliquant sur le lien "Create an object".

Pour la création d'un objet, il est nécessaire d'entrer une description et un prix pour cette objet.
Une fois l'objet créer, un message est affiché confirmant la création de l'objet.
Il est aussi possible de voir que l'objet a été créer en se allant sur la page d'accueil et voir que l'objet apparaît. 
  
