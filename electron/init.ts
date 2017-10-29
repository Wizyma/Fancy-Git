import * as electron from 'electron'
import * as path from 'path'
import * as url from 'url'
import { App } from './start-electron'

const init = electron.app

let window: App|null

init.on('ready', () => {
  window = new App({ width: 1200, height: 1200 }, { path: 'http://localhost:8080' }, { show: false })
})

init.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    init.quit()
  }
})

init.on('activate',  () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
  if (!window) {
    window = new App({ width: 1200, height: 1200 }, { path: 'http://localhost:3000' }, { show: false })
  }
})
