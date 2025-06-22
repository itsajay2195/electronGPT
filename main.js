const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true, // okay for internal use
    },
  });

  win.loadURL("http://localhost:5173"); // served by Vite
  win.hide();

  globalShortcut.register("Control+Shift+G", () => {
    win.isVisible() ? win.hide() : win.show();
  });
}

app.whenReady().then(createWindow);

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
