import styled from "styled-components";

type RedirectBtnStyleProps = {
  $size: number,
}

export const RedirectBtn = styled.button<RedirectBtnStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  outline: none;
  padding: .2rem;
  font-size: ${({$size}) => $size}rem;
  cursor: pointer;
`;