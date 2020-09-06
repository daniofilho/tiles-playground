import styled, { keyframes } from "styled-components";

import tile from "./tile.png";

const levitate = (y: number, tall: number) => keyframes`
  0% {
    margin-top: ${y}px;
  }
  50% {
    margin-top: ${y - tall * 2.4}px;
  }
  100% {
    margin-top: ${y - tall * 2.2}px;
  }
`;

export const Tile = styled.div.attrs((props: IIsometricTile) => ({
  style: {
    width: props.size.width,
    height: props.size.height,
    marginLeft: props.x,
    marginTop: props.y,
  },
}))<IIsometricTile>`
  position: absolute;
  transition: 1s;

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
    animation: ${({ y, tall }) => levitate(y, tall)} 1s ease-in-out alternate
      infinite;

    &:before {
      filter: brightness(110%);
    }
  }
`;
