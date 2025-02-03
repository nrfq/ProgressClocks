import Typography from "@mui/material/Typography";

type PlayerViewProps = {

}

function PlayerView(props: PlayerViewProps) {
  return (
    <Typography padding={"10px"}>
      Your GM can control Progress Clocks from this panel. They'll be pinned to your screen once made visible to you.
    </Typography>
  );
}

export { PlayerView };
