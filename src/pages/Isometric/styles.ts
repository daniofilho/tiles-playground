import styled from "styled-components";

export const Container = styled.main`
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Instructions = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px;
  font-size: 11px;
  z-index: 100;
`;

export const Minimap = styled.div`
  position: relative;
  overflow: hidden !important;
  width: 100vw;
  height: 100vh;
`;
