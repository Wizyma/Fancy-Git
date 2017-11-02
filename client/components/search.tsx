import * as React from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { Input, Select, SpanSeach, SearchDiv } from '../styles/search_styles'
import { BackButton } from '../styles/globals'
import { BuildResultRepo } from './subcomponents/result_repo_search'
import { BuildResultUsers } from './subcomponents/result_user_search'

export interface State {
  input: string,
  selected: string,
  data: object[]|any
}
  
export interface Props extends React.Props<any> {
  options: object[]
}
  

export class Search extends React.Component<Props, State> {
  public state: State = {
    input: '',
    selected: '',
    data: null,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      input: '',
      selected: Object.keys(props.options[0])[0],
      data: null,
    }
  }

  searchItems = (value: string) => {
    console.log(this.state.selected)
    api.searchUserOrRepo(this.state.selected, value)
        .then((data: object[]) => {
          this.setState({ data })
        })
  }


  handleInput = (event: any) => {
    const input = event.target.value
    this.searchItems(input)
    this.setState({ input })
  }

  handleSelected = (event: any) => {
    const selected = event.target.value
    this.setState({ selected, input: '' })
  }

  handleFocus = (event: any) => {
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
                {this.props.options.map((elem: any, i) => {
                  const key = Object.keys(elem)[0]
                  return <option key={i} value={key}>{elem[key]}</option>
                })}
                </Select> 
            </SearchDiv>
            {this.state.input !== '' && !this.state.data ? <Loading speed={500} text={'Loading'}/> : 
            <div style={{ marginTop: '22px' }}>
                {this.state.input !== '' && this.state.selected === 'REPOSITORY' && this.state.data ? <BuildResultRepo props={ this.state.data } />
                : <BuildResultUsers  props={this.state.data} />}
            </div>} 
        </div>
    )
  }
}
