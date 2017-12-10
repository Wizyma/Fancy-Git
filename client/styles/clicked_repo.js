import styled from 'styled-components'

export const Container = styled.div`
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

export const ContainerMedium = styled.div`
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
    -webkit-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
}
`

export const PostContainer = styled.ul`
margin-right: 70px;
}
`
export const PostLine = styled.li`
margin-bottom: 30px;
margin-right: 30px;
list-style: none;
padding: 20px;
border: 1px solid lightgray;
width: 100%
}
`


export const RepoContainer = styled.ul`
display: inline-flex;
listStyle: none;
width: 100%
}
`


export const RepoInfos = styled.li`
border-right: 1px solid lightgray;
padding-right: 50px;
marginRight: 20px
}
`