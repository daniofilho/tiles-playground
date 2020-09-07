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

import { Container, Minimap, Instructions } from "./styles";

const Isometric: React.FC = () => {
  gsap.registerPlugin(Draggable);

  const windowSizeMultiplier = 7;

  const tiles = useMemo<tilesType>(() => {
    return {
      onX: 10,
      onY: 20,
      size: {
        width: 32 * windowSizeMultiplier,
        height: 30 * windowSizeMultiplier,
      },
      tall: 16,
    };
  }, [windowSizeMultiplier]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  const getAdjacentTiles = useCallback((activeTile): Array<string> => {
    let top, bot, left, right;

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
  }, []);

  const getActiveTileProps = useCallback(
    (id: string) => {
      const props = getTileProps(id);
      return {
        ...props,
        adjacents: getAdjacentTiles(props),
      };
    },
    [getAdjacentTiles]
  );

  const INITIAL_ACTIVE_X = Math.floor(tiles.onX / 2);
  const INITIAL_ACTIVE_Y = Math.floor(tiles.onY / 2);
  const INITIAL_ACTIVE_TILE = getActiveTileProps(
    getTileID(INITIAL_ACTIVE_X, INITIAL_ACTIVE_Y)
  );

  const [activeTile, setActiveTile] = useState(INITIAL_ACTIVE_TILE);
  const [discoveredTiles, setDiscoveredTiles] = useState([
    INITIAL_ACTIVE_TILE.id,
  ]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // #  Allow to move the screen with mouse click
  const minimap = useRef(null);

  useEffect(() => {
    Draggable.create(minimap.current, {
      type: "scroll",
      dragClickables: true,
      throwProps: true,
      minimumMovement: 20,
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
  const getInitialRenderTiles = useCallback(
    (param_activeTile): Array<IRenderedTiles | null> => {
      const aux: Array<IRenderedTiles | null> = [];

      let tileY = 0;

      new Array(tiles.onY).fill("").map((_, y) => {
        new Array(tiles.onX).fill("").map((_, x) => {
          const tileId = getTileID(x, y);

          const isDiscovered = discoveredTiles.includes(tileId);
          const isAdjacent = param_activeTile.adjacents.includes(tileId);
          const isActive = param_activeTile.id === tileId;

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
            discovered: isDiscovered,
          });
        });
        tileY += tiles.size.height / 2 - tiles.tall;
        return true;
      });

      return aux;
    },
    [discoveredTiles, tiles.onX, tiles.onY, tiles.size, tiles.tall]
  );

  const renderedTiles = useMemo(() => {
    return getInitialRenderTiles(activeTile);
  }, [activeTile, getInitialRenderTiles]);

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  const discoverTile = (id: string) => {
    const discovereds = [...discoveredTiles];
    discovereds.push(id);
    setDiscoveredTiles(discovereds);

    // make this new tile active
    setActiveTile(getActiveTileProps(id));
  };

  return (
    <Container>
      <Instructions>
        <p>Click to move player or click and drag to move map.</p>
      </Instructions>
      <Minimap id="Minimap" ref={minimap}>
        {renderedTiles &&
          renderedTiles.map((tile: IRenderedTiles | null) => {
            if (tile)
              return <IsometricTile {...tile} discoverTile={discoverTile} />;
            return <></>;
          })}
      </Minimap>
    </Container>
  );
};

export default Isometric;
