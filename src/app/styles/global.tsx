import { createGlobalStyle } from "styled-components";
import { vars } from "../../shared/styles";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @supports not selector(::-webkit-scrollbar) {
    * {
      scrollbar-color: ${vars.primaryClrLtr} ${vars.primaryClrLt};
      scrollbar-width: thin;
      scrollbar-gutter: stable;
    }
  }

  ::-webkit-scrollbar {
    width: .4rem;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: ${vars.primaryClrLtr};
    border-radius: 10rem;
  }

  ::-webkit-scrollbar-track {
    background-color: ${vars.primaryClrLt};
    border-radius: 10rem;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: "Roboto", sans-serif;
    background-color: ${vars.baseClr};
    color: ${vars.fontClr};
  }

  ul {
    list-style: none;
  }

  a:link,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  input,
  textarea,
  button {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border: none;
    outline: none;
  }
`