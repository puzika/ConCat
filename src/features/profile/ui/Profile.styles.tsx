import styled from "styled-components";
import { responsive } from "../../../shared/styles/breakpoints";
import { vars } from "../../../shared/styles";

export const Profile = styled.form<{$isShown: boolean}>`
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: min(100%, 40rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  background-color: ${vars.primaryClr};
  padding: 3rem 4rem;
  border-radius: 1rem;
  box-shadow: 0 0 .8rem .3rem ${vars.primaryClrDk};
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all .3s;

  ${responsive.mbmin`
    width: 90%;
  `}

  ${({$isShown}) => $isShown && `
    opacity: 1;
    visibility: visible;
  `};
`;

export const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
  align-self: flex-end;
`;

export const ProfileAction = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  padding: .5rem;
  font-size: 2rem;
  font-weight: 600;
  color: ${vars.secondaryClr};
  transition: color .2s;
  cursor: pointer;

  &:hover {
    color: ${vars.fontClrLt};
  }
`;

