import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip' 
import { PopularDiv, PopularElem, PopularContainer, Img, PopularTitle, PopularName, PopularP, PopularStars , PopularButton, PopularRank } from '../../styles/popular_styles'
const emoji = require('node-emoji')

/**
 * construct the view for the github data fetched
 * 
 * @param {Build['fetched']} fetched array of object containing github info
 * @returns JSX element
 */
export const BuildPopular = (fetched) => {
  const data = fetched.data
  return(
      <PopularDiv>
          <PopularTitle>Most popular repos on GitHub</PopularTitle>
          {data.map((elem, i) => {
            return(
                  <PopularElem key={i} style={{ width: '380px', height: '385px' }}>
                    <PopularContainer style={{ width: '290px', height: '285px' }}>
                      <PopularRank>{emoji.emojify(':medal:')} {i + 1}</PopularRank>
                      <PopularStars style={{ marginLeft: '240px' }}>
                          <span data-tip="Forks"><span style={{ color: '#3f51b5' }}>{elem.forks.totalCount}</span> {emoji.emojify(':open_book:')}</span>
                          <span data-tip="Watchers"><span style={{ color: '#3f51b5' }}>{elem.watchers.totalCount}</span> {emoji.emojify(':eyes:')}</span>
                          <span data-tip="Stars"><span style={{ color: '#3f51b5' }}>{elem.stargazers.totalCount}</span> {emoji.emojify(':star:')}</span>
                      </PopularStars>
                      <Img className="image-popular" src={elem.owner.avatarUrl} />
                      <PopularName>
                          <span><strong>{elem.name}</strong></span><span>{elem.languages.nodes.length === 1 ? ` - ${elem.languages.nodes[0].name}` : null}</span>
                      </PopularName>
                      <PopularP>{emoji.emojify(elem.description)}</PopularP>
                      <div style={{ color: '#777', float: 'right', textAlign: 'right', marginRight: '-20px' }}>
                          <span>STATUS</span>
                          <div style={{ display: 'grid' }}>
                              {elem.hasIssuesEnabled ? <span style={{ color : '#777' }}>
                              Issues : <strong style={{ color: '#ea3a3a' }}>{elem.issues.totalCount}</strong></span> : null}
                              <span>Type : {elem.owner.__typename}</span>
                          </div>
                      </div>
                      <PopularButton style={{ marginLeft: '-150px' }} to={{ exact: true, pathname: `${fetched.url}repo`, state:  { login: elem.owner.login, name: elem.name } }}> 
                        More ...
                      </PopularButton>
                    </PopularContainer>
                  </PopularElem>
            )
          })}
          <ReactTooltip />
      </PopularDiv>
  )
}
