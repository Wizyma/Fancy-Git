import * as React from 'react'
import { PopularDiv, PopularElem, Img, PopularButton, PopularName } from '../../styles/popular_styles'

interface Results {
  data: object[],
  map: Function
}

interface arrayElem {
  name: string,
  avatarUrl: string,
  location: string|null,
  login: string|null,
}

export const BuildResultUsers = (data: object[]|any) => {
  const datas: any = data.props
  console.log(datas)
  return(
    <PopularDiv>
    {datas.map((elem: arrayElem, i: number) => {
      return(
          <PopularElem key={i}>
              <Img src={elem.avatarUrl}/>
              <PopularName>
                          {elem.name ? <span><strong>{elem.name}</strong> - </span> : null}<span> {elem.login} </span>
                      </PopularName>
              <PopularButton style={{ marginTop: '0px' }} to={{ exact: true, pathname: `/user`, state:  { name: elem.name } }}> 
                  More ...
              </PopularButton>
          </PopularElem>
      )
    })}
</PopularDiv>
  )
}
