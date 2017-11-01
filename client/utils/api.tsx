import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'


class GitAPI {
  constructor() {
    
    this.getToken()
  }

  getToken = () => {
    if (!localStorage.getItem('token')) {
      return axios.get('http://localhost:1339/token') // fix it later
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data.token)
      })
    }
  }

  getPopularRepositories = (): Promise<any> => {
    return fetch('https://api.github.com/graphql', {
      method:'POST',
      headers: { Authorization: localStorage.getItem('token'), 'Content-Type': 'application/json'  },
      body: JSON.stringify({query: `{
            search(last: 30, type: REPOSITORY, query: "stars:>15000") {
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
          }`}),
    })
    .then(res => res.json())
    .then(res => res.data.search.nodes)
  }

  searchUserOrRepo = (type: string, value: string): Promise<any> => {
    // ADD :stars>${value} to search by "popularity"
    const request = type === 'REPOSITORY' ? {query: `{
      search(type: REPOSITORY, query: "${value}:stars:>1000", first: 50){
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
    }`} : {query: `{
      search(type: USER, query: "${value}", first: 50){
        nodes {
          ... on User {
            name,
            avatarUrl,
            location
          }
        }
      }
    }`}

    return fetch('https://api.github.com/graphql', {
      method:'POST',
      headers: { Authorization: localStorage.getItem('token'), 'Content-Type': 'application/json'  },
      body: JSON.stringify(request),
    })
    .then(res => res.json())
    .then(res => res.data.search.nodes)
  }
}

export const api = new GitAPI()
