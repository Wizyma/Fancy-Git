import React, { Component } from 'react'
import { Loading } from './loading'
import { BuildPopular } from './subcomponents/popular_grid'
import { SearchButton } from '../styles/globals'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const Popular = ({ SEARCH_QUERY, url }) => (
    SEARCH_QUERY.search ? 
    <div style={{ width: '100%' }}>
          <BuildPopular data={ SEARCH_QUERY.search.nodes } url={ url }/> 
    </div> :  
    <Loading speed={500} text={'Loading'}/>
)


const POPULAR_REPO_QUERY = gql`{
search(first: 12, type: REPOSITORY, query: "stars:>15000") {
  nodes {
      ... on Repository {
        name
        forks {
          totalCount
        }
        watchers {
          totalCount
        }
        stargazers {
          totalCount
        }
        languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
          nodes {
            name
          }
        }
        description
        owner {
          avatarUrl
          __typename
          login
        }
        hasIssuesEnabled
        issues {
          totalCount
        }
      }
    }
  }
}
    
`

export default graphql(POPULAR_REPO_QUERY, {
  name: 'SEARCH_QUERY',
})(Popular)
