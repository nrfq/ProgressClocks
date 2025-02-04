import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from '@mui/icons-material/Add';
import AppBar from "@mui/material/AppBar";

import { PluginGate } from "../plugin/PluginGate";
import { useClocksStore } from "../clocks/store";
import { VisibilityButton } from "./VisibilityButton";
import { ClockSync } from "../plugin/ClockSync";
import {TooltipButton} from "./TooltipButton";

export function Sidebar() {
  const allVisible = useClocksStore((state) => state.allVisible);
  const setAllVisible = useClocksStore((state) => state.setAllVisible);
  const addClock = useClocksStore((state) => state.addClock);
  return (
    <AppBar color="primary" position={"static"}>
      <Toolbar>
          <VisibilityButton
            visible={allVisible}
            title={allVisible ? "Hide All" : "Show All"}
            setVisible={(event, value) => setAllVisible(value)}
          />
          <TooltipButton onClick={addClock} title={"Add Clock"}>
            <AddIcon />
          </TooltipButton>
          <PluginGate>
            <Divider flexItem sx={{ mx: 1 }} />
            <ClockSync />
            {/*<PluginResizeObserver />*/}
          </PluginGate>
      </Toolbar>
    </AppBar>
  );
}
