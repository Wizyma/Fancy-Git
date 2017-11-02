import axios, { AxiosPromise, AxiosRequestConfig } from 'axios'

interface Results {
  data : {
    search :{
      nodes: object[]|any,
    },
  }
}


class GitAPI {
  constructor() {
    
    this.getToken()
  }

  getToken = () => {
    console.log(localStorage.getItem('token'))
    if (!localStorage.getItem('token')) {
      return axios.get('http://localhost:1339/token') 
      .then((res: any) => {
        return res.json
      })
      .then((res: any) => {
        localStorage.setItem('token', res.data.token)
      })
    }
  }

  getPopularRepositories = (): Promise<any>  => {
    return fetch('https://api.github.com/graphql', {
      method:'POST',
      headers: { Authorization: localStorage.getItem('token'), 'Content-Type': 'application/json'  } as any,
      body: JSON.stringify({query: `{
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
          }`}),
    })
    .then((res: Response) => res.json())
    .then((res: Results) => res.data.search.nodes)
  }

  searchUserOrRepo = (type: string, value: string): Promise<any>  => {
    // ADD :stars>${value} to search by "popularity"
    const request = type === 'REPOSITORY' ? {query: `{
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
    }`} : {query: `{
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
    }`}

    return fetch('https://api.github.com/graphql', {
      method:'POST',
      headers: { Authorization: localStorage.getItem('token'), 'Content-Type': 'application/json'  } as any,
      body: JSON.stringify(request),
    })
    .then((res: Response) => res.json())
    .then((res: Results) => res.data.search.nodes)
  }
}

export const api = new GitAPI()
