import React, { Component } from 'react'
import { api } from '../utils/api'

export class User extends Component{
    constructor(props){
        super(props)

        console.log(props)
    }

    componentDidMount() {
        api.getInfoUser('jsparanoguy')
            .then(datas => console.log(datas))
    }

    render(){
        return(
            <h1>Hello World</h1>
        )
    }
}
