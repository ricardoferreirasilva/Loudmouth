
# LoudMouth

## Electron
### React - a javascript  library for building user interfaces
https://facebook.github.io/react/docs/installation.html

### Webpack - module bundler for modern JS applications
https://webpack.js.org/configuration/

## Run it

### Client side (electron app)

Inside electron/
```bash
npm install
npm run watch
npm start
```

npm install - install all the packages required.

npm run watch - compiles ES6 and react to bundle.js file that is included in index.html

npm start - launches electron app

### Server side

Inside server/
```bash
npm install
npm start
```
npm install - install all the packages required.

npm start - launches express server, the objective is to have a REST API to interact with the mysql database.