
# LoudMouth

## Electron
### React - a javascript  library for building user interfaces
https://facebook.github.io/react/docs/installation.html

### Webpack - module bundler for modern JS applications
https://webpack.js.org/configuration/

### Redux - predictable state container for JavaScript apps
http://redux.js.org/docs/basics/UsageWithReact.html

### Jest - Painless JavaScript Testing
https://facebook.github.io/jest/docs/tutorial-react.html#content

### Guides and tutorials

React structure based on: https://github.com/bradwestfall/CSS-Tricks-React-Series/tree/master/guide-3-redux

Guide on react routing:
https://scotch.io/tutorials/routing-react-apps-the-complete-guide

Tutorial about react-router + react + redux:
https://css-tricks.com/learning-react-router/

## Server REST API Backend
### Express
https://expressjs.com/en/starter/hello-world.html
### RethinkDb orm thinky
https://thinky.io/

## Run it

### Client side (electron app)

Inside electron/
```bash
npm install
npm run watch
npm start
```

npm install - install all the packages required.

npm run watch - runs webpack server, compiles ES6 and react to bundle.js file that is included in index.html

npm start - launches electron app

### Server side

Inside server/
```bash
npm install
npm start
```
npm install - install all the packages required.

npm start - launches express server, the objective is to have a REST API to interact with the rethinkdb database.

## Build windows executable

These tasks need some window app development libraries.

```bash
npm build
npm setup
```
