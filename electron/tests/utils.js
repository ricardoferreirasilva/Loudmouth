
var appPath
if (process.platform === 'win32') {
  appPath = 'node_modules/.bin/electron.cmd'
} else {
  appPath =
    'node_modules/.bin/electron'

}

module.exports = appPath
