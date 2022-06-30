import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  addPlayerAsync,
  fetchTeamAsync,
  fetchTeamsAsync,
  setTeamCaptainAsync,
} from "../api";
import { PlayerPayload, Team } from "../models";

interface SnackBarProps {
  open: boolean;
  severity?: "success" | "error" | "info" | "warning";
  message: string;
}

export interface GlobalState {
  isDarkMode: boolean;
  switchDarkMode: () => void;
  snackbar?: SnackBarProps;
  closeSnackbar: () => void;
  teams: Team[];
  loadingTeams: boolean;
  fetchTeams: () => void;
  fetchTeam: (year: number) => void;
  addPlayer: (year: number, playerPayload: PlayerPayload) => void;
  setTeamCaptain: (teamId: number, playerId: number) => void;
  selectedTeam?: Team;
  loadingTeam: boolean;
}

export const useGlobalStore = create<GlobalState>()(
  devtools((set) => ({
    loadingTeam: false,
    isDarkMode: false,
    loadingTeams: false,
    teams: [],
    selectedTeam: undefined,
    closeSnackbar: () =>
      set(
        (state) => ({ ...state, snackbar: { open: false, message: "" } }),
        false,
        "closeSnackbar"
      ),
    showSnackBarOpen: (isOpen: boolean) =>
      set((state) => ({ ...state, snackBarOpen: isOpen })),
    resetSelectedTeam: () =>
      set(
        (state) => ({ ...state, selectedTeam: undefined }),
        false,
        "resetSelectedTeam"
      ),
    switchDarkMode: () =>
      set(
        (state) => ({ isDarkMode: !state.isDarkMode }),
        false,
        "switchDarkMode"
      ),
    fetchTeams: async () => {
      set((state) => ({ ...state, loadingTeams: true }), false, "loadingTeams");
      const fetchedTeams = await fetchTeamsAsync();
      set(
        (state) => ({
          ...state,
          teams: [...fetchedTeams],
          loadingTeams: false,
        }),
        false,
        "fetchTeams"
      );
    },
    fetchTeam: async (year: number) => {
      set({ loadingTeam: true, selectedTeam: undefined }, false, "loadingTeam");
      const team = await fetchTeamAsync(year);
      set(
        (state) => ({
          ...state,
          selectedTeam: team,
          loadingTeam: false,
        }),
        false,
        "fetchTeam"
      );
    },
    addPlayer: async (year: number, playerPayload: PlayerPayload) => {
      const playerCreated = await addPlayerAsync(year, playerPayload);
      set(
        (state) => ({
          ...state,
          selectedTeam: state.selectedTeam
            ? {
                ...state.selectedTeam,
                players: state.selectedTeam.players
                  ? [
                      ...state.selectedTeam.players.map((player) =>
                        playerCreated.isCapitain
                          ? { ...player, isCapitain: false }
                          : player
                      ),
                      playerCreated,
                    ]
                  : [playerCreated],
              }
            : undefined,
          snackbar: {
            open: true,
            severity: "success",
            message: "Player added successfully",
          },
        }),
        false,
        "addPlayer"
      );
    },
    setTeamCaptain: async (year: number, playerId: number) => {
      const newCaptain = await setTeamCaptainAsync(year, playerId);
      set(
        (state) => ({
          ...state,
          selectedTeam: state.selectedTeam
            ? {
                ...state.selectedTeam,
                players: state.selectedTeam.players
                  ? [
                      ...state.selectedTeam.players.map((player) =>
                        player.id === newCaptain.id
                          ? { ...player, isCapitain: true }
                          : { ...player, isCapitain: false }
                      ),
                    ]
                  : [],
              }
            : undefined,
          snackbar: {
            open: true,
            severity: "success",
            message: "Captain assigned successfully",
          },
        }),
        false,
        "setTeamCaptain"
      );
    },
  }))
);
