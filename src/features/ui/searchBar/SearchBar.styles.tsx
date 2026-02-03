import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const SearchForm = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  background-color: ${vars.primaryClrLt};
  border-radius: 10rem;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 1rem 1.8rem;
  background-color: transparent;

  &::placeholder {
    color: ${vars.fontClrLt}
  }
`;

export const SearchClearBtn = styled.button`
  display: flex;
  padding: .5rem 1rem;
  background-color: transparent;
  cursor: pointer;
`;