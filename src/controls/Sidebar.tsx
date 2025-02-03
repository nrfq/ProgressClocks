import SimpleBar from "simplebar-react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {AppBar, TextField, Toolbar} from "@mui/material";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';

import { PluginGate } from "../plugin/PluginGate";
import { DiceRollSync } from "../plugin/DiceRollSync";
import { PartyTrays } from "../plugin/PartyTrays";
import { ResizeObserver as PluginResizeObserver } from "../plugin/ResizeObserver";
import IconButton from "@mui/material/IconButton";
import { useClocksStore } from "../clocks/store";

export function Sidebar() {
  const allVisible = useClocksStore((state) => state.allVisible);
  const setAllVisible = useClocksStore((state) => state.setAllVisible);
  const addClock = useClocksStore((state) => state.addClock);
  return (
    <AppBar color="primary" position={"sticky"}>
      <Toolbar>
          <IconButton onClick={() => setAllVisible(!allVisible)} sx={{ fontSize: 18 }} >
            {allVisible
              ? <VisibilityIcon />
              : <VisibilityOffIcon />
            }
          </IconButton>
          <IconButton onClick={addClock} sx={{ fontSize: 18 }} ><AddIcon /></IconButton>
          <PluginGate>
            <Divider flexItem sx={{ mx: 1 }} />
            <DiceRollSync />
            <PartyTrays />
            <PluginResizeObserver />
          </PluginGate>
      </Toolbar>
    </AppBar>
  );
}
