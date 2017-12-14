import styled, { keyframes } from 'styled-components'

const animationDiv = keyframes `
    from { opacity:0; } to { opacity:1; }
`

export const RepoDiv = styled.div `
    display: flex;
    flex-wrap: wrap;
    margin-left: 280px;
    width: 100%;
    min-height: 700px;
    margin-bottom: 10px;
    padding: 36px;

`
