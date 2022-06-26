import { PositionType } from "./Common";
import { Team } from "./Team";

export interface Player {
  id: number;
  number?: number;
  name: string;
  lastName: string;
  position: PositionType;
  teams: Team[];
}
