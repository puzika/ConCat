import styled from "styled-components";
import { vars } from "../../styles";

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: ${vars.primaryClrLtr};
`

export const LogoImg = styled.div`
  display: flex;
  color: currentColor;
  font-size: 12rem;
`;

export const LogoText = styled.h1`
  font-size: 5rem;
  font-family: "Great Vibes", cursive;
  color: currentColor;
`