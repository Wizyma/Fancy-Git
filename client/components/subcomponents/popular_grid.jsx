import  React from 'react'
import { PopularDiv, PopularElem, Img, PopularTitle, PopularName, PopularP, PopularStars , PopularButton, PopularRank } from '../../styles/popular_styles'
import ReactTooltip from 'react-tooltip' 
const emoji = require('node-emoji')



export const BuildPopular = (fetched) => {
  const data = fetched.data
  return(
      <PopularDiv>
          <PopularTitle>Most popular repos on GitHub</PopularTitle>
          {data.map((elem, i) => {
            return(
                  <PopularElem key={i}>
                      <PopularRank>{emoji.emojify(':medal:')} {i + 1}</PopularRank>
                      <PopularStars>
                          <span data-tip="Forks"><span style={{ color: '#3f51b5' }}>{elem.forks_count}</span> {emoji.emojify(':open_book:')}</span>
                          <span data-tip="Watchers"><span style={{ color: '#3f51b5' }}>{elem.watchers_count}</span> {emoji.emojify(':eyes:')}</span>
                          <span data-tip="Stars"><span style={{ color: '#3f51b5' }}>{elem.stargazers_count}</span> {emoji.emojify(':star:')}</span>
                      </PopularStars>
                      <Img className="image-popular" src={elem.owner.avatar_url} />
                      <PopularName>
                          <span><strong>{elem.name}</strong></span><span>{elem.language ? ` - ${elem.language}` : null}</span>
                      </PopularName>
                      <PopularP>{emoji.emojify(elem.description)}</PopularP>
                      <div style={{ color: '#777', float: 'right', textAlign: 'right' }}>
                          <span>STATUS</span>
                          <div style={{ display: 'grid' }}>
                              {elem.open_issues_count ? <span style={{ color : '#777' }}>
                              Issues : <strong style={{ color: '#ea3a3a' }}>{elem.open_issues_count}</strong></span> : null}
                              <span>Type : {elem.owner.type}</span>
                          </div>
                      </div>
                      <PopularButton to={{ exact: true, pathname: `${fetched.url}repo`, state:  elem }}> 
                        More ...
                    </PopularButton>
                  </PopularElem>
            )
          })}
          <ReactTooltip />
      </PopularDiv>
  )
}
