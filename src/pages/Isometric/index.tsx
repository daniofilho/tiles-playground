/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo, useEffect, useRef } from "react";

import { gsap } from "gsap";
import Draggable from "gsap/Draggable";

import IsometricTile from "components/IsometricTile";

import { tilesType, IRenderedTiles, CoordinateType } from "./types";

import { Container, Minimap } from "./styles";

const Isometric: React.FC = () => {
  gsap.registerPlugin(Draggable);

  const [tiles, setTiles] = useState<tilesType>({
    onX: 30,
    onY: 30,
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

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // #  Allow to move the screen with mouse click
  const minimap = useRef(null);

  useEffect(() => {
    Draggable.create(minimap.current, {
      type: "scroll",
      dragClickables: true,
      throwProps: true,
    });

    // Scroll to some position example
    /*
      const minimapDIV = document.getElementById("Minimap");
      minimapDIV?.scrollTo(300, 300);
    */
  }, []);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  const renderedTiles = useMemo((): Array<IRenderedTiles | null> => {
    const aux: Array<IRenderedTiles | null> = [];

    let tileY = 0;

    new Array(tiles.onY).fill("").map((_, y) => {
      new Array(tiles.onX).fill("").map((_, x) => {
        return aux.push({
          key: `${x}x${y}`,
          x:
            y % 2
              ? x * tiles.size.width
              : x * tiles.size.width + tiles.size.width / 2,
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
      <Minimap id="Minimap" ref={minimap}>
        {renderedTiles &&
          renderedTiles.map((tile: IRenderedTiles | null) => {
            if (tile) return <IsometricTile {...tile} />;
            return <></>;
          })}
      </Minimap>
    </Container>
  );
};

export default Isometric;
