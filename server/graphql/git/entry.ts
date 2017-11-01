import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import * as path from 'path'


const config_path = path.join(process.cwd(), 'config.json')
const config = require(config_path)

