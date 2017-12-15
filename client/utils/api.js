require('isomorphic-fetch') // injects globals: fetch, Headers, Request, Response

var assert = require('assert')
var defaults = require('101/defaults')

/**
 * create a graphql-fetch bound to a specific graphql url
 * @param  {String} graphqlUrl
 * @return {Function} graphqlFetch
 */
const factory = (graphqlUrl) => {
  /**
   * graphql fetch - fetch w/ smart defaults for graphql requests
   * @param  {Query} query graphql query
   * @param  {Object} vars  graphql query args
   * @param  {Object} opts  fetch options
   * @return {FetchPromise} fetch promise
   */
  const graphqlFetch = (query, vars, opts) => {
    assert(query, 'query is required')
    vars = vars || {}
    opts = opts || {}
    opts.body = JSON.stringify({
      query: query,
      variables: vars
    })
 
    let check = typeof(opts.get) === 'undefined' ? true : false
 
    if(check){
      // default opts
      defaults(opts, {
        method: 'POST',
        headers: new Headers()
      })
      // default headers
      if (!opts.headers.get('content-type')) {
        opts.headers.append('content-type', 'application/json') 
      }
    } 

    return fetch(graphqlUrl, !check ? {
      method: 'Post',
      headers: {
        "Content-type": opts.get('Content-type'),
        "Authorization": opts.get('Authorization'),
      },
      body: opts.body
    }: opts).then(function (res) {
      return res.json()
    })
  }

  return graphqlFetch
}

const medium = factory('http://localhost:1339/graphql')
const github = factory('https://api.github.com/graphql')

class GitAPI {
  constructor() {
    this.getToken()
  }

  createHeaders = () => {
    const headers = new Headers()
    headers.append('Authorization', localStorage.getItem('token'))
    headers.append('Content-Type', 'application/json')

    return headers
  }

  getToken = () => {
    if (!localStorage.getItem('token')) {
      return fetch('http://localhost:1339/token')
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem('token', data.token)
        })
    }
  }

  getPopularRepositories = () => {
    const query = `{
      search(first: 50, type: REPOSITORY, query: "stars:>15000") {
        nodes {
          ... on Repository {
            name,
            forks {
              totalCount
            },
            watchers {
              totalCount
            },
            stargazers {
              totalCount
            },
            languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
              }
            },
            description,
            owner {
              avatarUrl,
              __typename,
              login
            }
            hasIssuesEnabled,
            issues {
              totalCount
            }
          }
        }
      }
    }`

    return github(query, {}, this.createHeaders())
  }

  searchUserOrRepo = (type, value) => {
    // ADD :stars>${value} to search by "popularity"
    const query = type === 'REPOSITORY' ? `{
      search(type: REPOSITORY, query: "${value}", first: 50){
        nodes {
          ... on Repository {
            name,
            owner {
              avatarUrl,
              login
            },
            stargazers {
              totalCount
            },
            description,
           languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
              }
            }
          } 
        }
      }
    }` : `{
      search(type: USER, query: "${value}", first: 50){
        nodes {
          ... on User {
            name,
            avatarUrl,
            location,
            login
          }
        }
      }
    }`

    return github(query, {}, this.createHeaders())
  }

  getClickedRepository = (owner, repoName) => {
    const query = `
    {
    repository(owner: "${owner}", name: "${repoName}"){
      createdAt,
      name,
      owner{
        avatarUrl, 
        login,
      },
      stargazers(first: 1){
        totalCount,
      },
      hasIssuesEnabled,
      description,
      defaultBranchRef{
        name,
      },
      collaborators(first: 50){
        nodes{
          login, avatarUrl,
        },
      },
      isFork,
      projects(first: 10){
        totalCount, 
        nodes{
          name,
          state,
          creator{
            login,
          },
        },
      },
      viewerCanSubscribe,
      viewerHasStarred,
      id,
      repositoryTopics(first: 50){
        nodes{
          topic{
            name,
          }, 
          url,
        },
      },
      licenseInfo{
        name,
      },
      hasWikiEnabled,
      primaryLanguage{
        name,
        color,
      },
      issues(first: 50, states: OPEN){
        nodes{
          author{
            avatarUrl, 
            login,
          }, 
          createdAt, 
          id, 
          assignees(first: 10){
            nodes{
              login
            },
          },
        },
      },
    }
  }
    `

    return github(query, {}, this.createHeaders())
  }

  getInfoUser = (login) => {
    const query = `{
      user(login: "${login}"){
       avatarUrl,
       name,
       login,
       repositories(first: 50){
         nodes{
           name,
           createdAt,
           stargazers{
             totalCount
           }
           description
           languages(first: 3){
             nodes{
               name
             }
           }
         }
       }
       contributedRepositories(first: 50){
         nodes{
           name,
           description,
           owner{
             avatarUrl, 
             login
           }
           stargazers(first: 1){
             totalCount
           }
           description
         }
       }
       starredRepositories(first: 50){
        totalCount
       nodes{
          name,
          description,
          owner{
            avatarUrl, 
            login
          }
          stargazers(first: 1){
            totalCount
          }
          description
       }
      }
     }
   }
    `

    return github(query, {}, this.createHeaders())
  }

  getMediumPosts = (tag) => {
    const query = `
      query Post($tag: String!, $limit: Int){
        allPosts(tag: $tag, limit: $limit){
          id,
          url,
          title,
          content{
            subtitle
          },
          virtuals{
            previewImage{
              imageId
            }
          }
        }
      }
    `
    const queryVars = {
      "tag": tag,
      "limit": 20
    }

      return medium(query, queryVars)
    }

    getUserFav = ({ userid }) => {
      return fetch('http://localhost:1339/getuser', {
        body: {
          id: userid
        }
      })
    }

    manageFavs = ({ userid, repo, login }) => {
      return fetch('http://localhost:1339/managefav', {
        body: {
          id: userid,
          repo,
          login
        }
      })
    }
}

  export const api = new GitAPI()
