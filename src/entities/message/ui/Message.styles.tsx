import styled, { css } from "styled-components";
import { vars } from "../../../shared/styles";
import { responsive } from "../../../shared/styles/breakpoints";

export const Message = styled.article<{ $messageType: 'sent' | 'received'}>`
  position: relative;
  max-width: 35rem;
  padding: 1rem 1rem .5rem;
  border-radius: 1rem;
  box-shadow: 0 0 .8rem 0 #080f17;
  ${ props => props.$messageType === 'sent' ? 
      css`
        background-color: ${vars.primaryClrLtr};
        ${ responsive.tb`align-self: flex-end;` }
      ` : 
      css`
        background-color: ${vars.primaryClr};
      `
  };

  ${ responsive.tbmin`
    max-width: 30rem;
  `}

  &::after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    translate: -50% 0;
    border-style: solid;
    border-color: transparent;
    border-color: transparent;
    ${ props => props.$messageType === 'sent' ? 
        css`
          border-bottom-color: ${vars.primaryClrLtr};
          ${ responsive.tb`
              right: 0;
              left: auto;
              translate: 50% 0;
            `
          };
        ` : 
        css`
          border-bottom-color: ${vars.primaryClr};
        `
    };
    border-bottom-width: 1.1rem;
    border-left-width: 1rem;
    border-right-width: 1rem;
  }

  &::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    translate: -100% 0;
    width: 2rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: ${vars.baseClr};
    z-index: 10;

    ${ props => props.$messageType === 'sent' && css`
        ${responsive.tb`
          left: auto;
          right: 0;
          translate: 100% 0;
        `}
      `
    };
  }
`;

export const MessageTimestamp = styled.span`
  display: flex;
  gap: .5rem;
  justify-content: flex-end;
  font-size: 1.3rem;
  color: ${vars.fontClrLt};
  margin-top: .5rem;
`;

export const MessageParent = styled.a<{ $messageType: 'sent' | 'received' }>`
  display: block;
  position: relative;
  background-color: ${({$messageType}) => $messageType === 'sent' ? vars.primaryClrLt : vars.primaryClrDk };
  width: 100%;
  padding: .5rem 1.5rem;
  margin-bottom: .8rem;
  border-radius: .8rem;
  overflow: hidden;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: .5rem;
    background-color: ${({$messageType}) => $messageType === 'sent' ? vars.secondaryClrDk : vars.secondaryClr };
  }
`;

export const MessageParentSender = styled.span`
  font-weight: 600;
  color: ${vars.secondaryClr};
`;

export const MessageParentContent = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;