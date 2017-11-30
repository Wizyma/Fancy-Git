import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip' 
import { PopularDiv, PopularStars, PopularP, PopularElem, PopularContainer, ImgProfil, Img, PopularButton, PopularName } from '../../styles/popular_styles'
const emoji = require('node-emoji')

export const BuildResultUsersInfo = (data) => {
    const user = data.props.data.user

    console.log(user)



  return(
    <PopularDiv style={{ marginLeft: '290px'}}>
        <div id="topBar" style={{ width: '80%', textAlign: 'center'}}>
        <h2>Profil de : {user.login}</h2>
        <ImgProfil src={user.avatarUrl}/>
        
        <h2> Stared repository count : {user.starredRepositories.totalCount}</h2>
        </div>
        <h2 style={{width: '100%'}}> Repositories : </h2> 
        {Object.keys(user).map((elem, i) => {
            const languages =  user.repositories.nodes[i].languages.nodes.map(lang => lang)
            console.log(languages)

        return(

            <PopularElem key={i} style={{ marginTop: '40px', height:"120px", marginBottom:'60px'}}>
            
           
            <PopularContainer style={{height:"120px"}}>
         

            
         
                        <PopularStars>
                          <span data-tip="Stars"><span style={{ color: '#3f51b5' }}>{user.repositories.nodes[i].stargazers.totalCount}</span> {emoji.emojify(':star:')}</span>
                      </PopularStars>

                
                    
                    <PopularName>
                          <span>
                              
                              <strong>{user.repositories.nodes[i].name}</strong></span><br/> <br/>
                          
                                {/* bug language <span>{user.repositories.nodes[i].languages.nodes[0].name}</span>*/}
                            
                                
                            
                        
                    </PopularName>
                    <PopularP style={{ height: 'auto' }}><br/>{emoji.emojify(user.repositories.nodes[i].description)}</PopularP>
                   

            
            </PopularContainer>

         
            

           


            <PopularContainer style={{marginTop:"600px"}}>
           

            
         
                        <PopularStars>
                          <span data-tip="Stars"><span style={{ color: '#3f51b5' }}>{user.contributedRepositories.nodes[i].stargazers.totalCount}</span> {emoji.emojify(':star:')}</span>
                      </PopularStars>

                
         

                    <PopularName>
                          <span>
                              
                              <strong>{user.contributedRepositories.nodes[i].name}</strong></span><br/> <br/>
                              <ImgProfil src={user.contributedRepositories.nodes[i].owner.avatarUrl} />
                                
                            
                                
                            
                        
                    </PopularName>
                    <PopularP style={{ height: 'auto', marginTop: '130px' }}><br/>{emoji.emojify(user.contributedRepositories.nodes[i].description)}</PopularP>
                   

            
            </PopularContainer>
            
            
            
            </PopularElem>
        )
        })}
    </PopularDiv>
  )
}
