import React, { useCallback } from "react";

import pin from "./pin.png";

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
      {active && <img src={pin} alt="Pin" />}
    </Tile>
  );
};

export default IsometricTile;
