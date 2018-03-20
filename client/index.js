import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './components/main'
import { api } from './utils/api'

// required dependecies for apolloClient
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-client-preset'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'


// create the connection of the graphql server that will get connected to apollo client
const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

// middleware to manage authentification
const middlewareAuthLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token')
    const authorizationHeader = token ? `${token}` : null

    operation.setContext({
        headers: {
            authorization: authorizationHeader
        }
    })

    return forward(operation)
})


const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

// Instatiate the apollo client with the link created to the graphql server and a new instance of InMemoryCache
const client = new ApolloClient({
    link: httpLinkWithAuthToken,
    cache: new InMemoryCache()
});

console.log(client)
ReactDOM.render(    
    <Router>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Router>, 
    document.getElementById('root'))
