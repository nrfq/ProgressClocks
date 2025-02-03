import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from '@mui/icons-material/Add';
import AppBar from "@mui/material/AppBar";

import { PluginGate } from "../plugin/PluginGate";
import { ResizeObserver as PluginResizeObserver } from "../plugin/ResizeObserver";
import IconButton from "@mui/material/IconButton";
import { useClocksStore } from "../clocks/store";
import { VisibilityButton } from "./VisibilityButton";
import { ClockSync } from "../plugin/ClockSync";

export function Sidebar() {
  const allVisible = useClocksStore((state) => state.allVisible);
  const setAllVisible = useClocksStore((state) => state.setAllVisible);
  const addClock = useClocksStore((state) => state.addClock);
  return (
    <AppBar color="primary" position={"static"}>
      <Toolbar>
          <VisibilityButton visible={allVisible} setVisible={(event, value) => setAllVisible(value)} />
          <IconButton onClick={addClock} sx={{ fontSize: 18 }} ><AddIcon /></IconButton>
          <PluginGate>
            <Divider flexItem sx={{ mx: 1 }} />
            <ClockSync />
            {/*<PluginResizeObserver />*/}
          </PluginGate>
      </Toolbar>
    </AppBar>
  );
}
