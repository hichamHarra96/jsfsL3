# harra_py_jsfs

# Membre du groupe :

- HARRA Hicham 
- PY Alexandre 

## Clonage du projet :

Pour copier le projet entrer la commande suivante dans votre console :

``` git clone https://gitlab-etu.fil.univ-lille1.fr/harra/harra_py_jsfs.git ```

## Installation des fichiers nécessaires au projet :

Dans la console aller à dans le dossier "server" du projet que vous venez de cloner et entrer la commande :

``` npm install ```

## Production du build et lancement du projet ##

Pour produire le build du projet il faut entrer la commande suivante dans la console dans le dossier "client" :

``` npm run build  ```

A la suite de cette commande, vous pouvez lancer le projet en allant dans le dossier "server" et entrer la commande :

``` nodemon ```

Après avoir entrée cette commande, il faudra entrer l'adresse suivante dans votre navigateur (Firefox de préférence) :

``` http://localhost:8080/public/index.html ```

# v1

Mise en place du webpack 

# v2

- Création du premier paddle qui joue contre le mur.
- Gestion des mouvements du paddle avec les flèches dans les fonctions "keyDownActionHandler" et "keyUpActionHandler" présent dans la classe "Game".
- Suppression de la collision avec le mur de gauche qui termine le jeu. (Le jeu est relancé automatiquement à partir de la v3).
- Gestion de la collision dans la classe "Ball" avec la fonction "collisionWith" et dans la classe "Game" avec la fonction "directionCollision".
La fonction "directionCollision" est appelé dans la fonction "moveAndDraw" de  la classe Game.   

Problème avec le départ avec la barre espace. La barre espace sert à replacer la balle au centre du canvas.  

# v3

- Ajout de la seconde raquette à la droite du canvas
- Gestion des mouvements avec les flèches dans les mêmes fonctions que la première raquette. Les déplacements de la première raquette sont maintenant fait à avec les touches "z" et "s" ce qui est plus logique car la première raquette est à gauche et la deuxième est à droite.
- Gestion de la collision avec la deuxième raquette avec la mise en place d'un booléen (isPaddle2) qui est à "true" si c'est la deuxième raquette qui entre en collisionavec la balle. Les calculs sont donc différents si "isPaddle2" est à true. 
- La balle est relancé directement lorsque la balle sort du canvas.
- Gestion et affichage du score lorsque la balle sort du canvas. Gestion dans les fonctions "displayScore" et "start" dans Game.
Comme indiquer précédemment, la balle est replacé et relancé automatiquement lorsqu'elle sort du canvas et qu'un joueur marque un point.

# v4

Nous avons du retard et donc nous n'avons pas pu encore commencer la v4. 

# Problèmes 
- Il y a des problèmes avec le bouton "jouer" qui par moment indique la mauvaise valeur.
- Il n'est pas possible de lancer le jeu avec la barre espace, il est seulement possible de replacer la balle au centre avce la barre pour le moment.



#   j s f s L 3  
 