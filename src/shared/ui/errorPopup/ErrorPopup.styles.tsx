import styled from "styled-components";
import { vars } from "../../styles";

export const ErrorPopup = styled.div<{ $closed: boolean }>`
  position: fixed;
  top: 2rem;
  left: 50%;
  translate: -50% 0;
  max-width: 30rem;
  background-color: ${vars.primaryClr};
  text-align: center;
  padding: 2rem 3.5rem;
  border: .1rem solid ${vars.errorClr};
  border-radius: .5rem;
  box-shadow: 0 0 .8rem 0 ${vars.primaryClrDk};
  transition: all .3s;

  ${({$closed}) => $closed ? `
    visibility: hidden;
    opacity: 0;
  ` : `
    visibility: visible;
    opacity: 1;
  `}
`;

export const ErrorPopupBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 1.5rem;
  color: inherit;
  background-color: transparent;
  padding: .5rem;
  cursor: pointer;
`