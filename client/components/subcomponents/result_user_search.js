import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip' 
import { PopularDiv, PopularElem, PopularContainer, Img, PopularButton, PopularName } from '../../styles/popular_styles'

export const BuildResultUsers = (data) => {
    
  const datas = data.props
  return(
    <PopularDiv>
        {datas.map((elem, i) => {
        return(
            <PopularElem key={i}>
            <PopularContainer>
                <Img src={elem.avatarUrl}/>
                <PopularName>
                            {elem.name ? <span><strong>{elem.name}</strong> - </span> : null}<span> {elem.login} </span>
                        </PopularName>
                <PopularButton style={{ marginTop: '25px' }} to={{ exact: true, pathname: `/user`, state:  { name: elem.login } }}> 
                    More ...
                </PopularButton>
                </PopularContainer>
            </PopularElem>
        )
        })}
    </PopularDiv>
  )
}
