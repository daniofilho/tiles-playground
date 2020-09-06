/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from "react";

import IsometricTile from "components/IsometricTile";

import { tilesType, IRenderedTiles } from "./types";

import { Container, MiniMap } from "./styles";

const Isometric: React.FC = () => {
  const [tiles, setTiles] = useState<tilesType>({
    onX: 6,
    onY: 11,
    size: {
      width: 32 * 5,
      height: 30 * 5,
    },
    tall: 16,
  });

  /*const quantity = useMemo((): number => {
    return tiles.onX * tiles.onY;
  }, [tiles.onX, tiles.onY]);

  const distance = useMemo((): number => {
    return tiles.size * Math.sqrt(2);
  }, [tiles]);*/

  const renderedTiles = useMemo((): Array<IRenderedTiles | null> => {
    const aux: Array<IRenderedTiles | null> = [];

    let tileY = 0;

    new Array(tiles.onY).fill("").map((_, y) => {
      new Array(tiles.onX).fill("").map((_, x) => {
        return aux.push({
          key: `${x}x${y}`,
          x:
            y % 2
              ? x * tiles.size.width - tiles.size.width / 2
              : x * tiles.size.width,
          y: tileY,
          size: tiles.size,
          tall: tiles.tall,
        });
      });
      tileY += tiles.size.height / 2 - tiles.tall;
      return true;
    });

    return aux;
  }, [tiles.onX, tiles.onY, tiles.size, tiles.tall]);

  return (
    <Container>
      <MiniMap>
        {renderedTiles &&
          renderedTiles.map((tile: IRenderedTiles | null) => {
            if (tile) return <IsometricTile {...tile} />;
            return <></>;
          })}
      </MiniMap>
    </Container>
  );
};

export default Isometric;
