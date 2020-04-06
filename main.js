const { BrowserWindow, app } = require('electron');
require('./server.js');

let mainWindow = null;

function main() {
  mainWindow = new BrowserWindow();
  mainWindow.loadURL(`http://localhost:3001`);
  mainWindow.on('close', event => {
    mainWindow = null
  });
}

app.on('ready', main)