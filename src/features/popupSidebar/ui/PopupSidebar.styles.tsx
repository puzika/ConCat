import styled from "styled-components";
import { vars } from "../../../shared/styles";
import { Link } from "react-router-dom";

type PopupState = {
  $isOpen: boolean,
}

export const PopupSidebar = styled.div<PopupState>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: min(100%, 30rem);
  box-shadow: .2rem 0 .8rem 0 ${vars.primaryClrDk};
  background-color: ${vars.primaryClr};
  z-index: 100;
  transition: all .3s;

  ${({$isOpen}) => !$isOpen && `
    translate: calc(-100% - 2rem) 0;
  `}

  & > *:not(:last-child) {
    border-bottom: .1rem solid ${vars.primaryClrDk};
  }
`;

export const PopupSidebarUserData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  padding: 1.8rem ${vars.secondaryPadding} 1.5rem;
`;

export const PopupSidebarList = styled.ul`
  list-style: none;
`;

export const PopupSidebarItem = styled.li`
  display: block;
  transition: background-color .2s;
  cursor: pointer;

  &:hover {
    background-color: ${vars.primaryClrLt};
  }
`;

export const PopupSidebarItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem ${vars.secondaryPadding};
`;

export const PopupSidebarLogoutWrapper = styled.div`
  color: ${vars.errorClr};
`;

export const PopupSidebarLink = styled(Link)`
  display: block;
`;

export const PopupSidebarIconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

export const PopupSidebarLogoutIconContainer = styled.span`
  rotate: y 180deg;
`;

