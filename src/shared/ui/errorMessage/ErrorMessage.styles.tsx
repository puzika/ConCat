import styled from "styled-components";
import { vars } from "../../styles";

type ErrorMessageProps = {
  $size: number,
}

export const ErrorMessage = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: ${vars.errorClr};
`;

export const ErrorIcon = styled.div<ErrorMessageProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({$size}) => $size * 2.5}rem;
`;

export const ErrorText = styled.p<ErrorMessageProps>`
  text-align: center;
  font-size: ${({$size}) => $size}rem;
`