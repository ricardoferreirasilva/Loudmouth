
# LoudMouth v1

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

# LoudMouth v2

## Prerequisites

* (Optional) [IntelliJ](https://www.jetbrains.com/idea/) - The IDE used

## Run it

Open the /v2 folder in IntelliJ.

### Client side

In the intelliJ: go to the src/client/gui/MainWindow.java file and press the green button next to the beginning of the class definition.

In terminal: ```java -jar ./jar_files/loudmouthClientV2.jar <server_host>```, where server_host is ```http://localhost:8000``` by default.

### Server side

In the intelliJ: go to the src/server/Server.java file and press the green button next to the beginning of the class definition.

In terminal: ```java -jar ./jar_files/loudmouthServerV2.jar```

**Note**: All commands assume that the current directory is /v2.
