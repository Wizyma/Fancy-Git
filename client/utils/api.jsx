import axios from 'axios'

class GitAPI {
  getRepositories(language = null) {
    let uri = encodeURI(`https://api.github.com/search/repositories?q=stars:>=15000&sort=stars&order=desc&types=Repositories`)
    if (language) {
      uri = encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&types=Repositories`) 
    }
    return axios.get(uri)
        .then((response) => {
          return response.data.items
        })
  }
}

export const api = new GitAPI()
