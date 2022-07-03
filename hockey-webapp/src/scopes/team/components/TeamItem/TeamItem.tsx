import shallow from "zustand/shallow";
import { useGlobalStore } from "../../../../store/globalStore";
import { TeamItemDetail } from "./TeamItemDetail";
import { TeamItemPresentation } from "./TeamItemPresentation";
import { TeamItemSkeleton } from "./TeamItemSkeleton";
export const TeamItem = () => {
  const { selectedTeamYear, loadingTeam } = useGlobalStore(
    (state) => ({
      selectedTeamYear: state.selectedTeam?.year,
      loadingTeam: state.loadingTeam,
    }),
    shallow
  );

  return loadingTeam ? (
    <TeamItemSkeleton />
  ) : !selectedTeamYear ? (
    <TeamItemPresentation />
  ) : (
    <TeamItemDetail />
  );
};
