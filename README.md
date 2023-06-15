# Meteo Flash

Meteo Flash permet à l'utilisateur d'afficher la température d'une ville qu'il aura soit cherchée, soit en se géolocalisant.

## Table des Matières
1. [Installation](#installation)
2. [Utilisation](#utilisation)
3. [Contribution](#contribution)
4. [Contact](#contact)
5. [Changelog](#changelog)
6. [Bugs](#bugs)

## Installation

Node.js doit être installé sur votre machine.

Gestionnaire de paquets : NPM

Dépendances :  
@testing-library/jest-dom@5.16.5  
@testing-library/react@13.4.0  
@testing-library/user-event@13.5.0  
axios@1.4.0  
eslint-config-react-app@7.0.1  
eslint-plugin-react@7.32.2  
eslint@8.41.0  
fuse.js@6.6.2  
fuse@0.4.0  
react-dom@18.2.0  
react-scripts@5.0.1  
react@18.2.0  
semantic-ui-css@2.5.0  
semantic-ui-react@2.1.4  
semantic@0.0.1  
web-vitals@2.1.4  

## Utilisation

La recherche de la ville se fait via la barre de recherche ou en utilisant la géolocalisation.

Pour les suggestions, j'utilise un fichier texte (transformé au format json dans l'app) fourni par le site [Geonames](https://www.geonames.org/). Ce fichier contient toutes les villes dans le monde de plus de 15000 habitants.

Une fois la ville sélectionnée, deux requêtes sont envoyées :  
- une vers [Weatherbit](https://www.weatherbit.io/) qui récupère la température, les précipitations et l'icone qui remplace le logo,  
- l'autre vers [Unsplash](https://unsplash.com/) qui récupère les 10 premières photos les plus pertinentes par rapport au nom de la ville et en affiche une de façon aléatoire.

Ces APIs sont gratuites et par conséquent, ne retournent pas exactement les données dont j'avais besoin.  

Il a fallu ruser pour obtenir un résultat le plus cohérent possible entre les données que je peux récupérer et celles qui s'affichent.

## Contribution

N'hésitez pas à m'envoyer vos idées pour améliorer l'application, mon code, une fonction, etc !

## Contact

[LinkedIn](https://www.linkedin.com/in/marlenedfr/)  
d.marlene@gmail.com  
+33615756465

## Changelog

15/06/2023 : V1

## Bugs

- Le responsive a été checké sur la plupart des résolutions, cependant, n'hésitez pas à me contacter si vous voyez la moindre anomalie.
