import styled, { keyframes } from "styled-components";

const spinAnimation = keyframes`
  from {
    rotate: 0;
  }

  to {
    rotate: 360deg;
  }
`

export const Spinner = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: currentColor;
  animation: ${spinAnimation} 1s linear infinite; 
`