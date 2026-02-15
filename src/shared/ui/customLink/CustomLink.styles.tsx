import styled from "styled-components";
import { Link } from "react-router-dom";
import { vars } from "../../styles";

export const CustomLink = styled(Link)`
  &:link,
  &:visited {
    color: ${vars.primaryClrLtr};
  }

  display: block;
  padding: .3rem .2rem;
  border-bottom: .1rem solid currentColor;
  transition: all .2s;

  &:hover {
    &:link,
    &:visited {
      color: ${vars.fontClrLt};
    }
  }
`;