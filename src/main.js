const {app, BrowserWindow, globalShortcut, clipboard, Menu, Tray} = require('electron')
const path = require('path')
const url = require('url')

// Don't show the app in the doc
app.dock.hide()

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

let tray = null
app.on('ready', () => {
  // Registering shortcuts
  globalShortcut.register('CommandOrControl+F11', () => {
    console.log('0 is copied to clipboard')
    clipboard.writeText('0');
  })
  globalShortcut.register('CommandOrControl+F10', () => {
    console.log(') is copied to clipboard')
    clipboard.writeText(')');
  })

  // Registering tray icon
  tray = new Tray('IconTemplate.png')
  const contextMenu = Menu.buildFromTemplate([
    {label: '⌘ + F10 — Copy ")"', type: 'normal', 'click': () => {
      console.log(') is copied to clipboard')
      clipboard.writeText(')');
    }},
    {label: '⌘ + F11 — Copy "0"', type: 'normal', 'click': () => {
      console.log('0 is copied to clipboard')
      clipboard.writeText('0');
    }},
    {type: 'separator'},
    {label: 'Quit', type: 'normal', 'click': () => {
      app.quit()
    }}
  ])
  tray.setToolTip('Copy symbols to clipboard.')
  tray.setContextMenu(contextMenu)
})

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})