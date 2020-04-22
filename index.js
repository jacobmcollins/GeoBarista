const { BrowserWindow, app } = require('electron');
server = require('./server/server.js');

let mainWindow = null;
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {

  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Create myWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    let url = (app.isPackaged ? 'resources/app/client/build' : 'client/build')
    server(url);
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(`http://localhost:3001`);
    mainWindow.on('close', event => {
      mainWindow = null
    });
  })
}