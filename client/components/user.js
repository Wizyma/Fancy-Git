import React, { Component } from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { BuildResultUsersInfo } from './subcomponents/user_info'

export class User extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: props.location.state.name,
            datas: null,
          }
    }

    componentDidMount() {
        api.getInfoUser(this.state.name)
            .then(datas => {
                this.setState({ datas })
              })

              
    }

    render(){

        console.log(this.state.datas)

  
        return(
            <div>
            <h1>Hello World</h1>
           {this.state.datas  && <BuildResultUsersInfo props={this.state.datas} />} 
            </div>
        )
    }
}
