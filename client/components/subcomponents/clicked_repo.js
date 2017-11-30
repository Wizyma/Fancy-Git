import React, { Component } from 'react'
import { Img } from '../../styles/popular_styles'
import { Container } from '../../styles/clicked_repo'

export const SingleRepo = ({ repo }) => console.log(repo) || (
    <Container>
        <div>
            <span><strong>Project : {repo.name}</strong></span>
            <br />
            <span><strong>By @{repo.owner.login}</strong></span>
        </div>
        <div>
            <Img src={repo.owner.avatarUrl}/>
        </div>
    </Container>
)
