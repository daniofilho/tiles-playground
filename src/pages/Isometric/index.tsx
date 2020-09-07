import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { gsap } from "gsap";
import Draggable from "gsap/Draggable";

import { getTileID, getTileProps } from "lib/common";

import IsometricTile from "components/IsometricTile";

import { tilesType, IRenderedTiles } from "./types";

import { Container, Minimap } from "./styles";

const Isometric: React.FC = () => {
  gsap.registerPlugin(Draggable);

  const tiles = useMemo<tilesType>(() => {
    return {
      onX: 5,
      onY: 5,
      size: {
        width: 32 * 7,
        height: 30 * 7,
      },
      tall: 16,
    };
  }, []);

  const [activeTile, setActiveTile] = useState({
    id: getTileID(Math.floor(tiles.onX / 2), Math.floor(tiles.onY / 2)),
    x: Math.floor(tiles.onX / 2),
    y: Math.floor(tiles.onY / 2),
  });

  const adjacentTiles = useMemo(() => {
    let top, bot, left, right;
    console.log(activeTile);
    if (activeTile.y % 2) {
      top = getTileID(activeTile.x, activeTile.y - 1);
      bot = getTileID(activeTile.x - 1, activeTile.y + 1);
      left = getTileID(activeTile.x - 1, activeTile.y - 1);
      right = getTileID(activeTile.x, activeTile.y + 1);
    } else {
      top = getTileID(activeTile.x + 1, activeTile.y - 1);
      bot = getTileID(activeTile.x, activeTile.y + 1);
      left = getTileID(activeTile.x, activeTile.y - 1);
      right = getTileID(activeTile.x + 1, activeTile.y + 1);
    }

    return [top, bot, left, right];
  }, [activeTile]);

  /*const quantity = useMemo((): number => {
    return tiles.onX * tiles.onY;
  }, [tiles.onX, tiles.onY]);*/

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // #  Allow to move the screen with mouse click
  const minimap = useRef(null);

  useEffect(() => {
    Draggable.create(minimap.current, {
      type: "scroll",
      dragClickables: true,
      throwProps: true,
    });
  }, []); // Start drag and update

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  const centerScreenOnActiveTile = useCallback(() => {
    // Center screen on center tile
    const minimapDIV = document.getElementById("Minimap");

    // Get the XY central of a chunk
    let halfWidth = tiles.size.width / 2;
    let halfHeight = tiles.size.height / 2;

    // How many tiles fit on screen?
    let tilesOnX = Math.floor(
      document.documentElement.clientWidth / tiles.size.width
    );
    let tilesOnY = Math.floor(
      document.documentElement.clientHeight / tiles.size.height
    );

    // Get coordinates of the tile on center of screen
    const centerOfScreenX = Math.floor(tilesOnX / 2);
    const centerOfScreenY = Math.floor(tilesOnY / 2);

    let scrollToX = activeTile.x - centerOfScreenX;
    let scrollToY = activeTile.y - centerOfScreenY;

    scrollToX *= tiles.size.width;
    scrollToX += halfWidth;

    scrollToY *= halfHeight;
    scrollToY -= tiles.size.height * 1.5;

    minimapDIV?.scrollTo({
      left: scrollToX,
      top: scrollToY,
      behavior: "smooth",
    });
  }, [activeTile.x, activeTile.y, tiles.size.height, tiles.size.width]);

  useEffect(() => {
    centerScreenOnActiveTile();
  }, [centerScreenOnActiveTile]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
  const [renderedTiles, setRenderedTiles] = useState<
    Array<IRenderedTiles | null>
  >([]);

  const initialRenderTiles = useCallback((): void => {
    const aux: Array<IRenderedTiles | null> = [];

    let tileY = 0;

    new Array(tiles.onY).fill("").map((_, y) => {
      new Array(tiles.onX).fill("").map((_, x) => {
        const tileId = getTileID(x, y);

        const isAdjacent = adjacentTiles.includes(tileId);
        const isActive = activeTile.id === tileId;

        const posX =
          y % 2
            ? x * tiles.size.width
            : x * tiles.size.width + tiles.size.width / 2;

        return aux.push({
          key: tileId,
          id: tileId,
          x: posX,
          y: tileY,
          size: tiles.size,
          tall: tiles.tall,
          active: isActive,
          adjacent: isAdjacent,
          discovered: false,
        });
      });
      tileY += tiles.size.height / 2 - tiles.tall;
      return true;
    });

    setRenderedTiles(aux);
  }, [
    activeTile.id,
    adjacentTiles,
    setRenderedTiles,
    tiles.onX,
    tiles.onY,
    tiles.size,
    tiles.tall,
  ]);

  useEffect(() => {
    initialRenderTiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  const discoverTile = (id: string) => {
    if (!renderedTiles) return;

    // Change prop on renderedTiles
    const aux: Array<IRenderedTiles | null> = [];
    renderedTiles.map((tile) => {
      if (tile && tile.id === id) {
        return aux.push({ ...tile, discovered: true });
      }

      return aux.push(tile);
    });
    setRenderedTiles(aux);

    // make this new tile active
    setActiveTile(getTileProps(id));
  };

  return (
    <Container>
      <Minimap id="Minimap" ref={minimap}>
        {renderedTiles &&
          renderedTiles.map((tile: IRenderedTiles | null) => {
            if (tile?.discovered) {
              console.log(tile);
            }
            if (tile)
              return <IsometricTile {...tile} discoverTile={discoverTile} />;
            return <></>;
          })}
      </Minimap>
    </Container>
  );
};

export default Isometric;
