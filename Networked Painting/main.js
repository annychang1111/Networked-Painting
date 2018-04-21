const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

function createWindow() {
  let window = new BrowserWindow({width: 800, height: 600, titleBarStyle: 'hidden-inset'});
  window.loadURL(`file:///${__dirname}/index.html`);
}

app.on('ready', createWindow);