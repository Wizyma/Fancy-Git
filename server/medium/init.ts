import * as path from 'path'
const medium = require('medium-sdk') 

class Medium {
  private config: Object

  constructor() {
    const config_path = path.join(process.cwd(), 'config.json')
    this.config = require(config_path)
  }

  initClient = () => {
    console.log(medium)
  }
}
