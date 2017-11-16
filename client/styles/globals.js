import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Ul = styled.ul `
    list-style: none;
    min-width: 190px;
    position: fixed;
    top: 75px;
    font-weight: 700;
    margin: 0 auto;
    border: 1px solid;
    margin-bottom: 10px;
    border-radius: 10px;
    border-color: white;
    padding: 36px;
    box-shadow: 4px -2px #f7f7f7;
`
export const Li = styled.li `
    padding: 15px;
    &:hover {
        border: 1px transparent;
        border-radius: 10px;
        a {
            color: red;
        }
    }
`

export const Nav = styled(NavLink) `
    text-decoration: none;
    color: black;
    &:hover {
        text-decoration: none;
    }
    &:active {
        text-decoration: none;
    }
    &:focus {
        text-decoration: none;
    }
    &.active {
       color red
    }
`

export const BackButton = styled.button `
width: 90px;
height: 32px;
background-color: #fbfbfb;
border: 1px solid;
border-radius: 15px;
font-weight: 700;
position: absolute;
right: 105px;
    &:hover {
        background-color: #f9f3f3;
        cursor: pointer;
    }
`

export const LoadingDiv = styled.div `
    width: 100%;    
    text-align: center;
    font-size: 35px;
`

export const MainDiv = styled.div `
    display: flex;
    font-family: 'Roboto', Tahoma, sans-serif;
` 

export const SearchButton = styled.button `
    position: absolute;
    right: 70px;
    top: 30px;
    border: 1px solid;
    width: 125px;
    text-align: center;
    padding: 7px;
    background-color: white;
    border-radius: 25px;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
`
