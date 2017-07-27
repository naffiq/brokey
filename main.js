'use strict';

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    globalShortcut = _require.globalShortcut,
    clipboard = _require.clipboard,
    Menu = _require.Menu,
    Tray = _require.Tray;

var path = require('path');
var url = require('url');

// Don't show the app in the doc
app.dock.hide();

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

var tray = null;
app.on('ready', function () {
  // Registering shortcuts
  globalShortcut.register('CommandOrControl+F11', function () {
    console.log('0 is copied to clipboard');
    clipboard.writeText('0');
  });
  globalShortcut.register('CommandOrControl+F10', function () {
    console.log(') is copied to clipboard');
    clipboard.writeText(')');
  });

  // Registering tray icon
  tray = new Tray('IconTemplate.png');
  var contextMenu = Menu.buildFromTemplate([{ label: '⌘ + F10 — Copy ")"', type: 'normal', 'click': function click() {
      console.log(') is copied to clipboard');
      clipboard.writeText(')');
    } }, { label: '⌘ + F11 — Copy "0"', type: 'normal', 'click': function click() {
      console.log('0 is copied to clipboard');
      clipboard.writeText('0');
    } }, { type: 'separator' }, { label: 'Quit', type: 'normal', 'click': function click() {
      app.quit();
    } }]);
  tray.setToolTip('Copy symbols to clipboard.');
  tray.setContextMenu(contextMenu);
});

app.on('will-quit', function () {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});