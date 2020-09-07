import React, { useCallback } from "react";

import { Tile } from "./styles";

const IsometricTile: React.FC<IIsometricTile> = ({
  id,
  x,
  y,
  size,
  tall,
  discovered,
  active,
  adjacent,
  discoverTile,
}) => {
  const handleClick = useCallback((): void => {
    if (!adjacent && !discovered) return;
    console.log(id);
    discoverTile(id);
  }, [adjacent, id, discoverTile, discovered]);

  return (
    <Tile
      x={x}
      y={y}
      size={size}
      tall={tall}
      active={active}
      adjacent={adjacent}
      discovered={discovered}
      onClick={() => handleClick()}
    >
      {active && <p>X</p>}
    </Tile>
  );
};

export default IsometricTile;
