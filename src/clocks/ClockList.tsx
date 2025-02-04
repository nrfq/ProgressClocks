import Stack from "@mui/material/Stack";
import { useClocksStore } from "./store";
import { ClockView } from "./ClockView";
import Divider from "@mui/material/Divider";
import SimpleBar from "simplebar-react";

type ClockListProps = {

}

function ClockList(props: ClockListProps) {
  const clocks = useClocksStore((state) => state.clocks);
  return (
    <SimpleBar
      style={{
        maxHeight: "calc(100dvh - 64px)",
        height: "calc(100dvh - 64px)",
        overflowY: "auto",
      }}
    >
      <Stack padding={"10px"} direction={"column"} spacing={2} divider={<Divider />}>
        {clocks.map(clock => <ClockView key={clock.id} clock={clock} />)}
      </Stack>
    </SimpleBar>
  );
}

export { ClockList };
