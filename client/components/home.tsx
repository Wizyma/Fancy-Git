import * as React from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { Repo } from './subcomponents/repo'
import { BuildPopular } from './subcomponents/popular_grid'


export interface State {
  data?: object[]
}

export interface Props extends React.Props<any> {
  defaultData?: object[]|null,
  url?: string
}




export class Home extends React.Component <Props[], State> {
  public state: State[]|any = {
    data: null,
  }

  public props: Props[]|any 
  
  constructor(props: Props[]) {
    super(props)

    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    api.getPopularRepositories()
      .then((res) => {
        this.setState({ data: res })
      })
  }



  render() {
    return this.state.data ? <BuildPopular data={this.state.data} url={ this.props.match.url }/> : <Loading speed={500} text={'Loading'}/>
  }
}
