/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo, useCallback, useEffect } from "react";

import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";

import IsometricTile from "components/IsometricTile";

import { tilesType, IRenderedTiles } from "./types";

import { Container, Minimap } from "./styles";

const Isometric: React.FC = () => {
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

  const vars = useMemo(
    () => ({
      mouseX0: 0,
      mouseY0: 0,
      mouseX: 0,
      mouseY: 0,
      pageX: 0,
      pageY: 0,
      mouseDown: false,
      canDrag: true, // Controls if map can be dragged, useful for disabling drag some times
    }),
    []
  );

  const [{ x, y }, setDrag] = useSpring(() => ({
    x: 0,
    y: 0,
    //config: { mass: 1, tension: 10, friction: 0 },
  }));

  // # Update screen scroll position
  const updateScreenScroll = useCallback((): void => {
    if (vars.mouseDown && vars.canDrag) {
      document.body.style.cursor = "grabbing";

      const auxScrollX = vars.mouseX - vars.mouseX0;
      const auxScrollY = vars.mouseY - vars.mouseY0;

      const newX = vars.pageX - auxScrollX * -1;
      const newY = vars.pageY - auxScrollY * -1;

      setDrag({ x: newX, y: newY });
    } else {
      document.body.style.cursor = "default";
    }
  }, [
    setDrag,
    vars.canDrag,
    vars.mouseDown,
    vars.mouseX,
    vars.mouseX0,
    vars.mouseY,
    vars.mouseY0,
    vars.pageX,
    vars.pageY,
  ]);

  // Set the drag hook and define component movement based on gesture data
  const eventHandlers = useDrag((state) => {
    const {
      initial: [m0x, m0y],
      first,
      last,
      event,
    } = state;

    const onDragStart = (e: any): void => {
      if (e.button !== 2) return; // drag only with second click

      vars.mouseDown = true;

      vars.mouseX0 = m0x;
      vars.mouseY0 = m0y;

      // console.log('S', e.x, e.y);

      vars.pageX = x.getValue();
      vars.pageY = y.getValue();
    };
    const onDragEnds = (e: any): void => {
      vars.mouseDown = false;

      // do something when drag ends
    };
    const onDragging = (e: any): void => {
      if (!vars.mouseDown) return;

      vars.mouseX = e.x;
      vars.mouseY = e.y;

      updateScreenScroll();
    };

    /* ----- */

    if (first) return onDragStart(event);
    if (last) return onDragEnds(event);

    return onDragging(event);
  });

  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

  // Prevent context menu on right click - right click context menu bugs the map drag
  useEffect(() => {
    document.oncontextmenu = function (e) {
      if (e.button === 2) {
        e.preventDefault();
        return false;
      }
    };
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
      <Minimap id="Minimap" {...eventHandlers()}>
        <animated.div style={{ marginTop: y, marginLeft: x }}>
          {renderedTiles &&
            renderedTiles.map((tile: IRenderedTiles | null) => {
              if (tile) return <IsometricTile {...tile} />;
              return <></>;
            })}
        </animated.div>
      </Minimap>
    </Container>
  );
};

export default Isometric;
