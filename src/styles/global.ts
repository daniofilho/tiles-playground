import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
   
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box; 
  }

  html, body {
    height: 100%;
    scroll-behavior: smooth;
  }

  body {
    -webkit-font-smoothing: antialised;
    background: #21222c;
    font-family: 'Press Start 2P', cursive;
    color: #FFF;
  }

  img {
    max-width: 100%;
  }
 
  #root {
    margin: 0 auto;
    min-height: 100%;

    display: flex;
    flex-direction: column;
  }
 
`;
