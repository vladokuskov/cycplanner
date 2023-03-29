// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
    margin: 0;
    padding: 0;

  }

  *:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }
  *:focus-visible {
    outline: 3px solid #a3d168;
    outline-offset: .2rem;
    box-shadow: none;
    border-radius: 4px;
  }

  body,
  html {
    line-height: 1.5;
    background-color: #f5f5f5;
    margin: 0;
    padding: 0;
    font-size: 16px;
    height: 100%;
    width: 100%;
    *::-moz-selection { /* Code for Firefox */
      background: #9e9e9e50;
    }

    *::selection {
      background: #9e9e9e50;
    }
  }

  h1,
  h2,
  h3,
  h4,
  p,
  a,
  li {
    -webkit-tap-highlight-color: transparent;
    margin: 0;
    text-decoration: none;
    font-family: 'Lato', sans-serif;
    transition: 0.2s;
  }

  a, button {
    cursor: pointer;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    text-decoration: none;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    font-family: 'Open Sans', sans-serif;
  }

  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }
  li {
    list-style-type: none;
  }

  html:focus-within {
  scroll-behavior: smooth;
  }

  input,
  button,
  textarea,
  select {
  font: inherit;
  }
`;

export default GlobalStyle;
