import styled from "styled-components";
import { vars } from "../../../shared/styles";
import { responsive } from "../../../shared/styles/breakpoints";

export const NotFound = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 ${vars.secondaryPadding};
`;

export const NotFoundMessage = styled.p`
  font-size: 8rem;
  color: ${vars.errorClr};
  text-align: center;

  ${responsive.tb`
    font-size: 6rem;
  `}
`