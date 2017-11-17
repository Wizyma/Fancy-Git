import styled from 'styled-components'

export const Container = styled.div `
width: 90%;
margin-top: 30px;
transition:all 1s ease;
padding: 36px;
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
