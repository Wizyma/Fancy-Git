import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip' 
import { PopularDiv, PopularElem, PopularContainer, Img, PopularName, PopularStars, PopularP, PopularButton } from '../../styles/popular_styles'
const emoji = require('node-emoji')

export const BuildResultRepo = (data) => {
  const results = data.props
  return(
      <PopularDiv>
          {results.map((elem, i) => {
            return(
                <PopularElem key={i}>
                  <PopularContainer>
                        <PopularStars>
                          <span data-tip="Stars"><span style={{ color: '#3f51b5' }}>{elem.stargazers.totalCount}</span> {emoji.emojify(':star:')}</span>
                      </PopularStars>
                    <Img src={elem.owner.avatarUrl}/>
                    <PopularName>
                          <span><strong>{elem.name}</strong></span><span>{elem.languages.nodes.length === 1 ? ` - ${elem.languages.nodes[0].name}` : null}</span>
                    </PopularName>
                    <PopularP style={{ height: 'auto' }}>{emoji.emojify(elem.description)}</PopularP>
                    <PopularButton style={{ marginTop: '0px' }} to={{ exact: true, pathname: `/repo`, state:  { login: elem.owner.login, name: elem.name } }}> 
                        More ...
                    </PopularButton>
                  </PopularContainer>
                </PopularElem>
            )
          })}
          <ReactTooltip effect="solid"/>
      </PopularDiv>
  )
}
