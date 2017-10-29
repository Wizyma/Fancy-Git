import * as electron from 'electron'

export interface configWindow {
  width: number,
  height: number
}

export interface dirLoad {
  path: string
}

export interface tools {
  show: boolean
}

/**
 * Create a BrowserWindow (app need to be ready first)
 * 
 * @export
 * @class App
 */
export class App {
  config: configWindow
  mainWindow: electron.BrowserWindow|null
  path: string

  constructor(config: configWindow, dir: dirLoad, showTools: tools) {
    this.config = config
    this.path = dir.path

    this.mainWindow = new electron.BrowserWindow({ ...this.config })
    this.mainWindow.loadURL(this.path)

    if (showTools.show) {
      this.mainWindow.webContents.openDevTools()
    }

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
  }

  getWindow() {
    return this.mainWindow
  }
}
