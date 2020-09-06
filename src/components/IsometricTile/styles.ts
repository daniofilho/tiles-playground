import styled from "styled-components";

import { animated } from "react-spring";

import tile from "./tile.png";

export const Tile = styled(animated.div).attrs((props: IIsometricTile) => ({
  style: {
    width: props.size.width,
    height: props.size.height,
    marginLeft: props.x,
    marginTop: props.y,
  },
}))<IIsometricTile>`
  position: absolute;
  transition: 0.5s;
  transition-timing-function: ease;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  /* Shape of tile */
  clip-path: polygon(
    45% 0,
    55% 0,
    100% 36%,
    100% 64%,
    56% 100%,
    45% 100%,
    0 63%,
    0 36%
  );

  &:before {
    content: " ";
    width: ${({ size }) => size.width}px;
    height: ${({ size }) => size.height}px;
    background-image: url(${tile});
    background-size: cover;
    background-repeat: no-repeat;

    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: pixelated;
  }

  &:hover {
    margin-top: ${({ y, tall }) => y - tall * 2.2}px !important;

    &:before {
      filter: brightness(110%);
    }
  }
`;
