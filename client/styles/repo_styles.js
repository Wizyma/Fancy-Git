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
	opacity:0;  /* make things invisible upon start */
	-webkit-animation:${animationDiv} ease-in 1;  /* call our keyframe named fadeIn, use animattion ease-in and repeat it only 1 time */
	-moz-animation:${animationDiv}  ease-in 1;
	animation:${animationDiv}  ease-in 1;

	-webkit-animation-fill-mode:forwards;  /* this makes sure that after animation is done we remain at the last keyframe value (opacity: 1)*/
	-moz-animation-fill-mode:forwards;
	animation-fill-mode:forwards;

	-webkit-animation-duration:1s;
	-moz-animation-duration:1s;
	animation-duration:1s;
`
