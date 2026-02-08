import styled from "styled-components";
import { vars } from "../../../shared/styles";

export const SearchForm = styled.form`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: ${vars.primaryClrLt};
  border-radius: 10rem;
`;

export const SearchBar = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1rem 1.8rem;
  background-color: transparent;

  &::placeholder {
    color: ${vars.fontClrLt}
  }
`;

export const SearchClearBtn = styled.button`
  display: flex;
  align-items: center;
  height: 100%;
  background-color: transparent;
  padding: 0 1rem;
  cursor: pointer;
`;