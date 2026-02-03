import { createGlobalStyle } from "styled-components";
import { vars } from "../../shared/styles";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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