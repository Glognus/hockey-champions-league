import { Player, PlayerPayload, Team } from "../models";

export const fetchTeamsAsync = async (): Promise<Team[]> => {
  const teams = await fetch("/api/teams").then((res) => res.json());
  return teams;
};

export const fetchTeamAsync = async (year: number): Promise<Team> => {
  const team = await fetch(`/api/teams/${year}`).then((res) => res.json());
  return team;
};

export const addPlayerAsync = async (
  year: number,
  playerPayload: PlayerPayload
): Promise<Player> => {
  const playerCreated = await fetch(`/api/teams/${year}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playerPayload),
  }).then((res) => res.json());
  return playerCreated;
};

export const setTeamCaptainAsync = async (
  year: number,
  playerId: number
): Promise<Player> => {
  const newCaptain = await fetch(`/api/teams/${year}/${playerId}/captain`, {
    method: "PUT",
  }).then((res) => res.json());
  return newCaptain;
};
