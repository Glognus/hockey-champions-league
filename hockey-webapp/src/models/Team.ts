import { Player } from "./Player";

export interface Team {
  id: number;
  coach: string;
  year: number;
  players: Player[];
}
