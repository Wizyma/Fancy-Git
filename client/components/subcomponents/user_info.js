import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip' 
import moment from 'moment'
import { Container } from '../../styles/clicked_repo'
import { Img, PopularButtonMargin } from '../../styles/popular_styles'
const emoji = require('node-emoji')

export const BuildResultUsersInfo = ({ user }) => {
    const { avatarUrl, login, name, repositories, starredRepositories } = user
  return(
   <Container>
        <div style={{width: '350px'}}>
            <div style={{ position: 'relative', top: '-20px' }}>
                <span><strong>@ : {login}</strong></span>
            </div>
            <Img src={avatarUrl} />
            {starredRepositories.totalCount >= 1 && <div style={{ position: 'relative', marginTop: '20px' }}>
                 <span>Starred { starredRepositories.totalCount } repos</span> 
            </div>}
        </div>
   </Container>
  )
}

export const Owned = ({repos, login}) => (
    <Container style={{position: 'relative', maxHeight: '400px', overflowY: 'scroll'}}>
        <h2 style={{textAlign: 'center'}}>Owned Repositories</h2>
        <div style={{position: 'relative'}}>
        {repos.map((elem, i) => (
            <div key={i} style={{marginBottom: '50px'}}>  
                <div style={{display: 'flex'}}>
                    <div>
                        <h3 style={{width: '250px'}}>{elem.name}</h3>
                    </div>
                    <div style={{padding: '20px', width: '100%'}}>
                        <span style={{float: 'right'}}>Created : {moment(elem.createdAt).format('DD-MM-YYYY')}</span>
                    </div>
                </div> 
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    <img style={{borderRadius: '50%', height: '170px', width: '170px'}} src='client/styles/dio.gif'/>
                </div>
                {elem.description && <div style={{maxWidth: '350px'}}>
                    <span>{elem.description}</span>    
                </div>}
                <div>
                    {elem.languages.nodes.length >= 1 && <span>Lang : {elem.languages.nodes[0].name}</span>}
                    <PopularButtonMargin to={{  exact: true, pathname: '/repo', state:  { login: login, name: elem.name } }}>More...</PopularButtonMargin>
                </div>
            </div>
        ))}
        </div>
    </Container>
)

export const Contributed = ({ repos, login }) => (
    <Container style={{position: 'relative', maxHeight: '400px', overflowY: 'scroll'}}>
        <h2 style={{textAlign: 'center'}}>Starred Repositories</h2>
        <div style={{position: 'relative'}}>
        {repos.map((elem, i) => (
            <div key={i} style={{marginBottom: '50px'}}>  
                <div style={{display: 'flex'}}>
                    <div>
                        <h3 style={{width: '250px'}}>{elem.name}</h3>
                    </div>
                </div> 
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    {login !== elem.owner.login ? <Img src={elem.owner.avatarUrl} />: <img style={{borderRadius: '50%', height: '170px', width: '170px'}} src='client/styles/dio.gif'/>}
                </div>
                {elem.description && <div style={{maxWidth: '350px'}}>
                    <span>{elem.description}</span>    
                </div>}
                <div>
                    <PopularButtonMargin to={{  exact: true, pathname: '/repo', state:  { login: login, name: elem.name } }}>More...</PopularButtonMargin>
                </div>
            </div>
        ))}
        </div>
    </Container>
)
