import { PositionType } from "./Common";

export interface Player {
  id: number;
  number?: number;
  name: string;
  lastname: string;
  position: PositionType;
  isCapitain: boolean;
}

export type PlayerPayload = Omit<Player, "id" | "teams">;
