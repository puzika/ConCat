import styled from "styled-components";
import { vars } from "../../styles";

export const Avatar = styled.div`
  width: 4.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${vars.secondaryClr};
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;