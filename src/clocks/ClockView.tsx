import {TextField} from "@mui/material";
import {ColorPicker} from "../controls/ColorPicker";
import { useClocksStore, Clock } from "./store";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { PieChart } from "@mui/x-charts/PieChart";
import {useEffect, useState} from "react";
import Slider from "@mui/material/Slider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {VisibilityButton} from "../controls/VisibilityButton";
import {ProgressClock} from "./ProgressClock";

type ClockViewProps = {
  clock: Clock,
}

function ClockView({ clock }: ClockViewProps) {
  const updateClock = useClocksStore((state) => state.updateClock);
  const removeClock = useClocksStore((state) => state.removeClock);

  const setClock = (newClock: Partial<Clock>) => {
    updateClock(clock.id, newClock);
  }

  const remove = () => removeClock(clock.id);

  return (
    <>
      <Stack p={1} gap={1} direction={"row"} alignItems="center" sx={{ transition: "opacity 0.5s" }} >
        <IconButton onClick={remove}><DeleteIcon /></IconButton>
        <ProgressClock clock={clock} readonly={false} />
        <Stack direction={"column"} useFlexGap sx={{ flexGrow: 1 }} >
          <Slider
            aria-label="Segments"
            value={clock.segments}
            shiftStep={1}
            step={1}
            marks
            min={2}
            max={12}
            valueLabelDisplay={"auto"}
            onChange={(event, value) => setClock({ segments: Number(value) })}
          />
          <Stack gap={2} direction={"row"} justifyContent={"flex-start"} alignItems={"center"} >
            <VisibilityButton visible={clock.visible} setVisible={(event, value) => setClock({ visible: value })} />
            <ColorPicker color={clock.color} setColor={(color) => setClock({ color })} />
          </Stack>
        </Stack>
      </Stack>
      <TextField
        value={clock.name}
        onChange={(event) => setClock({ name: event.target.value })}
        id={"new-name"}
        label={"Name"}
      />
    </>
  );
}

export { ClockView };
