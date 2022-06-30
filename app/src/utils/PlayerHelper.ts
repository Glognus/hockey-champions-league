import { PositionType } from "../models";

export const positionTypeToString = (positionType: PositionType) => {
  switch (positionType) {
    case "CENTER_DEFENSEMAN":
      return "Center Defenseman";
    case "GOALTENDER":
      return "Goaltender";
    case "LEFT_DEFENSEMAN":
      return "Left Defenseman";
    case "RIGHT_DEFENSEMAN":
      return "Right Defenseman";
    case "LEFT_WINGER":
      return "Left Winger";
    case "RIGHT_WINGER":
      return "Right Winger";
  }
};
