import React from "react";

import { Tile } from "./styles";

const IsometricTile: React.FC<IIsometricTile> = ({ ...rest }) => {
  return <Tile {...rest} draggable={false} />;
};

export default IsometricTile;
