import React, { Component } from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { BuildPopular } from './subcomponents/popular_grid'
import { SearchButton } from '../styles/globals'

export class Popular extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    api.getPopularRepositories()
      .then((res) => {
        console.log(res)
        this.setState({ data: res.data.search.nodes })
      })
  }

  searchItems = (event) => {

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
