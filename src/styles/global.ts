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
  }

  body {
    -webkit-font-smoothing: antialised;
    background: #21222c;
    font-family: 'Press Start 2P', cursive;
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
