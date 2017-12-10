import React, { Component } from 'react'
import { api } from '../utils/api'
import { Loading } from './loading'
import { BuildResultUsersInfo, Owned, Contributed } from './subcomponents/user_info'
import { RepoDiv } from '../styles/repo_styles'



export class User extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: props.location.state.name,
            datas: null,
            switchrepos: false
          }
    }

    componentDidMount() {
        api.getInfoUser(this.state.name)
            .then(datas => {
                this.setState({ datas: datas.data.user })
              })

              
    }

    switchRepos = () => {
        this.setState((prevState) => ({switchrepos: !prevState.switchrepos}))
    }

    render(){ 
        const { datas, switchrepos } = this.state
        console.log(datas)
        return(
            <RepoDiv>
                {datas  && <BuildResultUsersInfo user={datas} />} 
                {!datas && <Loading speed={500} text='Loading' />}
                {datas && datas.repositories.nodes.length >= 1 && 
                    <div style={{width: '100%'}}>
                        <button onClick={this.switchRepos}>Switch</button>
                        {!switchrepos && <Owned repos={datas.repositories.nodes} login={datas.login} />}
                        {switchrepos && <Contributed repos={datas.starredRepositories.nodes} login={datas.login}/>}
                       
                    </div> }
            </RepoDiv>
        )
    }
}
        
