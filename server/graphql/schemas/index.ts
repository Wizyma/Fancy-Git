const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
    type Link {
        id: ID!
        url: String!
        description: String!
    }

    type Query {
        allLinks: [Link]!
    }

    type Mutation {
        createLink(url: String!, description: String!): Link
    }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
