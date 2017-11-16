import React, { Component } from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { Input, Select, SpanSeach, SearchDiv } from '../styles/search_styles'
import { BackButton } from '../styles/globals'
import { BuildResultRepo } from './subcomponents/result_repo_search'
import { BuildResultUsers } from './subcomponents/result_user_search'

  

export class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      selected: Object.keys(props.options[0])[0],
      data: null,
    }
  }

  searchItems = (value) => {
    this.timeOutSearch = window.setTimeout(() => {
      api.searchUserOrRepo(this.state.selected, value)
      .then((data) => {
        this.setState({ data })
      })
    },                                     500) 
  }


  handleInput = (event) => {
    const input = event.target.value
    window.clearTimeout(this.timeOutSearch)
    this.searchItems(input)
    this.setState({ input })
  }

  handleSelected = (event) => {
    const selected = event.target.value
    this.setState({ selected, input: '', data: null })
  }

  handleFocus = (event) => {
    event.target.setSelectionRange(0, event.target.value.length)
  }

  render() {
    return(
        <div style={{ width: '100%' }}>
            <SearchDiv>
                <BackButton onClick={() => { window.location.href = '/' }}>Home</BackButton>
                <SpanSeach>{this.state.selected === 'REPOSITORY' ? 'Search a repository' : 'Search a user'}</SpanSeach>
                <Input placeholder="Search..." value={this.state.input} onChange={this.handleInput} onFocus={this.handleFocus}/>
                <Select value={this.state.selected} onChange={this.handleSelected}>
                {this.props.options.map((elem, i) => {
                  const key = Object.keys(elem)[0]
                  return <option key={i} value={key}>{elem[key]}</option>
                })}
                </Select> 
            </SearchDiv>
            {this.state.input !== '' && !this.state.data ? <Loading speed={500} text={'Loading'}/> : 
            <div style={{ marginTop: '22px' }}>
                {this.state.input !== '' && this.state.selected === 'REPOSITORY' && this.state.data ? <BuildResultRepo props={ this.state.data } />
                : null}
                {this.state.input !== '' && this.state.selected === 'USER' && this.state.data ? <BuildResultUsers props={ this.state.data } />
                : null}
            </div>} 
        </div>
    )
  }
}
