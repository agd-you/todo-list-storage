##  Nom de l'application 

todo-list-pinia

## Version

1.0.0

##  Description 

Création d'une application Todo List pour permettre aux utilisateurs 
d’ajouter, modifier, supprimer et valider des tâches à faire.

##  Technos utilisées : 

* Vue 3 (Composition API) : 3.5.13
* Typescript : 5.8.3
* Vite :  6.2.5
* Pinia : 3.0.1
* sass-embedded : 1.86.3
* pinia-plugin-persistedstate : 4.2.0
* pinia/testing : 1.0.0
* Vitest : 3.1.1
* localStorage

## Fonctionnalités

* Ajouter une tâche
* Supprimer une tâche
* Marquer une tâche comme terminée
* Mettre à jour une tâche
* Persistance dans le LocalStorage

## Persistance

Utilisationn de localStorage pour persister les données de store Pinia, 
pour garder les données même après un refresh de la page.

## Tests

Test unitaires avec vitest et pinia/testing

## Roadmap

* Authentification
* Backend spring avec une base de données
* Filtrer les tâches.

## Project Setup

```sh
git clone https://github.com/agd-you/todo-list-storage
cd todo-list-storage
npm install
```

## Démarrer et lancer un serveur en local 

```sh
npm run dev
```

## Lancer les tests unitaires avec [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
## Compilation et minification pour la production

```sh
npm run build
```