import React, { Component } from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { BuildResultUsersInfo, Owned } from './subcomponents/user_info'
import { RepoDiv } from '../styles/repo_styles'

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
                this.setState({ datas: datas.data.user })
              })

              
    }

    render(){ 
        const { datas } = this.state
        return(
            <RepoDiv>
                {datas  && <BuildResultUsersInfo user={datas} />} 
                {datas && datas.repositories.nodes.length >= 1 && 
                    <div style={{width: '100%'}}>
                        <Owned repos={datas.repositories.nodes} login={datas.login}/>
                    </div> }
            </RepoDiv>
        )
    }
}
        
