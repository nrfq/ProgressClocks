import AddIcon from '@mui/icons-material/Add';

import { useClocksStore } from "../clocks/store";
import { VisibilityButton } from "./VisibilityButton";
import {TooltipButton} from "./TooltipButton";
import {CardHeader, SlotProps} from "@mui/material";
import Divider from "@mui/material/Divider";

const slotProps = {
  title: {
    sx: {
      fontSize: "1.125rem",
        fontWeight: "bold",
        lineHeight: "32px",
        color: "text.primary",
    },
  },
}

export function Sidebar() {
  const allVisible = useClocksStore((state) => state.allVisible);
  const setAllVisible = useClocksStore((state) => state.setAllVisible);
  const addClock = useClocksStore((state) => state.addClock);
  return (
    <>
      <CardHeader
        title={"Progress Clocks"}
        action={
          <>
            <VisibilityButton
              visible={allVisible}
              title={allVisible ? "Hide All" : "Show All"}
              setVisible={(event, value) => setAllVisible(value)}
            />
            <TooltipButton onClick={addClock} title={"Add Clock"}>
              <AddIcon />
            </TooltipButton>
          </>
        }
        slotProps={slotProps}
      />
      <Divider variant={"fullWidth"} />
    </>
  );
}
