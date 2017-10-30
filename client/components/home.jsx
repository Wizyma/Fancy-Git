import  React, { Component } from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { Repo } from './subcomponents/repo'
import { BuildPopular } from './subcomponents/popular_grid'


export class Home extends React.Component  {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    api.getRepositories(null)
      .then((items) => {
        this.setState({ data: items })
      })
  }



  render() {
    return this.state.data ? <BuildPopular data={this.state.data} url={ this.props.match.url }/> : <Loading speed={500} text={'Loading'}/>
  }
}
