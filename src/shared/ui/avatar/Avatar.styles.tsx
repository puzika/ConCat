import styled from "styled-components";
import { vars } from "../../styles";

export const Avatar = styled.div<{ $size: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({$size}) => `${$size}rem`};
  aspect-ratio: 1;
  font-weight: 500;
  font-size: ${({$size}) => `${$size / 2}rem`};
  text-transform: capitalize;
  background-color: ${vars.secondaryClr};
  border-radius: 50%;
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;