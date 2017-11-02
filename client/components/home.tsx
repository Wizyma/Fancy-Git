import * as React from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { BuildPopular } from './subcomponents/popular_grid'
import { SearchButton } from '../styles/globals'
import { Search } from './search'

export interface State {
  data?: object[],
  search: boolean,
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
      .then((res: object[]) => {
        this.setState({ data: res })
      })
  }

  activateSearch = () => {
    this.setState({ search: true, data: [] })
  }

  searchItems = (event: any) => {

  }

  render() {
    return (
      this.state.data ? 
        <div style={{ width: '100%' }}>
          {!this.state.search ? 
            <div>
              <SearchButton onClick={this.activateSearch}>Search</SearchButton>
              <BuildPopular data={this.state.data} url={ this.props.url }/> 
            </div>
            : <Search options={this.props.options}/>}
        </div> :  
        <Loading speed={500} text={'Loading'}/>
    )
  }
}
