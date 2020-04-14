const { BrowserWindow, app } = require('electron');
server = require('./server/server.js');

let mainWindow = null;

function main() {
  if(app.isPackaged) {
    server('resources/client/build');
  }
  else {
    server('client/build');
  }
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`http://localhost:3001`);
  mainWindow.on('close', event => {
    mainWindow = null
  });
}

app.on('ready', main)