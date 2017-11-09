import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

interface Results {
  data : {
    search :{
      nodes: object[]|any,
    },
  }
}


class GitAPI {
  private instance: AxiosInstance

  constructor() {
    this.getToken()
    this.instance = axios.create({
      timeout: 20000,
      headers: { Authorization: localStorage.getItem('token'), 'Content-Type': 'application/json'  },
    })
  }

  getToken = () => {
    console.log(localStorage.getItem('token'))
    if (!localStorage.getItem('token')) {
      return axios.get('http://localhost:1339/token') 
      .then((res: AxiosResponse) => {
        localStorage.setItem('token', res.data.token)
      })
    }
  }

  getPopularRepositories = (): Promise<any>  => {
    return this.instance.post('https://api.github.com/graphql', {
      query: `{
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
          }`,
    })
    .then((res: AxiosResponse) => res.data.data.search.nodes)
  }

  searchUserOrRepo = (type: string, value: string): Promise<any>  => {
    // ADD :stars>${value} to search by "popularity"
    const request = type === 'REPOSITORY' ? `{
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
    }` :  `{
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

    return this.instance.post('https://api.github.com/graphql', {
      query: request,
    })
    .then((res: AxiosResponse) => res.data.data.search.nodes)
  }
}

export const api = new GitAPI()
