1 - Installer Node.js (https://nodejs.org/en/download/)

2 - npm install -g npm@latest

3 - npm install -g @angular/cli

4 - Dans le repertoire projet: npm install (installer les packages de package.json)

5 - ng serve (lancer l'application)

Erreurs rencontrées:
- Derrière un proxy
  - npm config set strict-ssl false
  - npm config set registry "http://registry.npmjs.org/"
  - npm --proxy http://username:password@cacheaddress.com.br:80 install packagename

- Erreur "ECONNRESET" (timeout): Relancer la commande pour télécharger les package manquants.
