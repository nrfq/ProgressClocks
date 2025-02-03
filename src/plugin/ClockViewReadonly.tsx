import {Clock} from "../clocks/store";
import {ProgressClock} from "../clocks/ProgressClock";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ClockViewReadonlyProps = {
  clock: Clock;
}

function ClockViewReadonly({ clock }: ClockViewReadonlyProps) {
  return (
    <Stack alignItems={"center"}>
      <ProgressClock clock={clock} readonly={true} />
      <Typography
        variant="subtitle1"
        color="text.primary"
        textAlign="center"
        lineHeight="32px"
        noWrap
      >
        {clock.name}
      </Typography>
    </Stack>
  );
}

export { ClockViewReadonly };
