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
      headers: { Authorization: localStorage.getItem('token'), 'Content-Type': 'application/json'  },
    })
  }

  getToken = () => {
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

  getClickedRepository = (owner: string, repoName: string): Promise<any> => {
    const request = `
    query{
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

    return this.instance.post('https://api.github.com/graphql', {
      query: request,
    })
    .then((res: AxiosResponse) => res.data)
  }
}

export const api = new GitAPI()
