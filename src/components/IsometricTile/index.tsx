import React from "react";

import { Tile } from "./styles";

const IsometricTile: React.FC<IIsometricTile> = ({ ...rest }) => {
  return <Tile {...rest} />;
};

export default IsometricTile;
