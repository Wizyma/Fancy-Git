import * as React from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { BuildPopular } from './subcomponents/popular_grid'
import { SearchButton } from '../styles/globals'

export interface State {
  data?: object[],
  search: boolean,
}

export interface Props extends React.Props<any> {
  defaultData?: object[]|null,
  url?: string
}




export class Popular extends React.Component <Props[], State> {
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
      .then((res: object[]) => {
        this.setState({ data: res })
      })
  }

  searchItems = (event: any) => {

  }

  render() {
    return (
      this.state.data ? 
        <div style={{ width: '100%' }}>
              <BuildPopular data={this.state.data} url={ this.props.url }/> 
        </div> :  
        <Loading speed={500} text={'Loading'}/>
    )
  }
}
