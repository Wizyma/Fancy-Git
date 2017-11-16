import styled from 'styled-components'
const Link = require('react-router-dom').Link

export const PopularDiv = styled.div `
    display: flex;
    flex-wrap: wrap;
    margin-left: 250px;
`

export const PopularElem = styled.div `
    width: 280px;
    height: 365px;
    margin: 0 auto;
    margin-bottom: 10px;
`
    
export const PopularContainer = styled.div `
    width: 208px;
    height: 263px;
    position: absolute;
    transition:all 1s ease;
    padding: 36px;
    text-align: center;
    border-radius: 10px;
    border-color: white;
    box-shadow: 4px -2px #f7f7f7;
    &:hover{
        margin-top: 10px;
        margin-left: 20;
        margin-bottom: 30px;
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
    }
`

export const Img = styled.img `
    max-width: 150px;
    border-radius: 50%;
`

export const PopularTitle = styled.h2 `
    width: 100%;
    text-align: center;
`

export const PopularName = styled.div `
    padding: 10px;
    height: 20px;
`
export const PopularP = styled.p `
    text-align: justify;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 250px;
`

export const PopularStars = styled.div `
    position: absolute;
    margin-left: 190px;
    margin-top: -25px;
    display: grid;
    text-align: right;
    font-weight: 600;
    font-size: 15px;
`

export const PopularButton = styled(Link) `
    width: 90px;
    padding: 6px;
    position: absolute;
    margin-left: -110px;
    margin-top: 28px;
    background-color: #fbfbfb;
    border: 1px solid;
    border-radius: 15px;
    font-weight: 700;
    text-decoration: none;
    border-color: black;
    color: black;
    font-size: 15px;
    &:hover {
        background-color: #f9f3f3;
        cursor: pointer;
    }
`

export const PopularRank = styled.span `
    position: absolute;
    margin-left: -80px;
    margin-top: -25px;
    font-weight: 700;
`
