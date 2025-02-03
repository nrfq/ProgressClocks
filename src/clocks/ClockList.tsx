import Stack from "@mui/material/Stack";
import { useClocksStore } from "./store";
import {ClockView} from "./ClockView";
import Divider from "@mui/material/Divider";

type ClockListProps = {

}

function ClockList(props: ClockListProps) {
  const clocks = useClocksStore((state) => state.clocks);

  return (
    <Stack direction={"column"} spacing={2} divider={<Divider />}>
      {clocks.map(clock => <ClockView key={clock.id} clock={clock} />)}
    </Stack>
  );
}

export { ClockList };
