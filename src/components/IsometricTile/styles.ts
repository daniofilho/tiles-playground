import styled from "styled-components";

import tile from "./tile.png";
import tileInactive from "./inactive.png";

type getTileType = {
  active: boolean;
  discovered: boolean;
};
const getTile = ({ active, discovered }: getTileType) => {
  if (active) return tile;
  if (discovered) return tile;

  return tileInactive;
};

const getOpacity = (
  isActive: boolean,
  isAdjacent: boolean,
  isDiscovered: boolean
) => {
  if (isActive || isDiscovered) return 1;
  if (isAdjacent) return 0.7;

  return 0.1;
};

const getOpacityHover = (
  isActive: boolean,
  isAdjacent: boolean,
  isDiscovered: boolean
) => {
  if (isAdjacent || isActive || isDiscovered) return 1;

  return 0.6;
};

type TileType = {
  x: number;
  y: number;
  tall: number;
  size: {
    width: number;
    height: number;
  };
  active: boolean;
  adjacent: boolean;
  discovered: boolean;
};

export const Tile = styled.div.attrs((props: TileType) => ({
  style: {
    width: props.size.width,
    height: props.size.height,
    marginLeft: props.x,
    marginTop: props.y,
  },
}))<TileType>`
  position: absolute;
  transition: 0.5s;
  transition-timing-function: ease;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

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
    background-image: url(${(props) => getTile(props)});
    background-size: cover;
    background-repeat: no-repeat;

    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: pixelated;

    opacity: ${({ active, adjacent, discovered }) =>
      getOpacity(active, adjacent, discovered)};
  }

  img {
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: pixelated;

    position: absolute;
    width: 100%;
    height: 100%;

    pointer-events: none;
  }

  @media (min-width: 991px) {
    &:hover {
      margin-top: ${({ y, tall }) => y - tall * 1.2}px !important;

      &:before {
        filter: brightness(110%);
        opacity: ${({ active, adjacent, discovered }) =>
          getOpacityHover(active, adjacent, discovered)};
      }
    }
  }
`;
