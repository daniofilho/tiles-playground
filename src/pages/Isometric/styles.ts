import styled from "styled-components";
import { animated } from "react-spring";

export const Container = styled.main`
  flex: 1;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Minimap = styled(animated.div)`
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  & > div {
    position: absolute;
  }

  /* background: #282a36; */
`;
