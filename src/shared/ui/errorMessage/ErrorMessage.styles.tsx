import styled from "styled-components";
import { vars } from "../../styles";

export const ErrorMessage = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: ${vars.errorClr};
`;

export const ErrorIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
`;

export const ErrorText = styled.p`
  text-align: center;
  font-size: 2rem;
`