import * as React from 'react'
import * as ReactTooltip from 'react-tooltip' 
import { PopularDiv, PopularElem, Img, PopularName, PopularStars, PopularP, PopularButton } from '../../styles/popular_styles'
const emoji = require('node-emoji')

interface Results {
  data: object[]
}

export const BuildResultRepo = (data: object[]|any) => {
  const results = data.data
  console.log(results)
  return(
      <PopularDiv>
          {results.map((elem: any, i: number) => {
            return(
                <PopularElem key={i}>
                        <PopularStars>
                          <span data-tip="Stars"><span style={{ color: '#3f51b5' }}>{elem.stargazers.totalCount}</span> {emoji.emojify(':star:')}</span>
                      </PopularStars>
                    <Img src={elem.owner.avatarUrl}/>
                    <PopularName>
                          <span><strong>{elem.name}</strong></span><span>{elem.languages.nodes.length === 1 ? ` - ${elem.languages.nodes[0].name}` : null}</span>
                    </PopularName>
                    <PopularP data-tip={elem.description}>{emoji.emojify(elem.description)}</PopularP>
                    <PopularButton style={{ marginTop: '0px' }} to={{ exact: true, pathname: `/repo`, state:  { login: elem.owner.login, name: elem.name } }}> 
                        More ...
                    </PopularButton>
                </PopularElem>
            )
          })}
          <ReactTooltip />
      </PopularDiv>
  )
}
