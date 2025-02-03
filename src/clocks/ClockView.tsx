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

type ClockViewProps = {
  clock: Clock,
}

const MAX_SIZE = 100;

const generateSegments = (clock: Clock) => {
  const data = [];
  for (let i = 0; i < clock.segments; i++ ) {
    const color = i < clock.progress ? clock.color : `${clock.color}22`;
    data.push({ id: i, color , value: 1 })
  }
  return data;
}

function ClockView({ clock }: ClockViewProps) {
  const updateClock = useClocksStore((state) => state.updateClock);
  const removeClock = useClocksStore((state) => state.removeClock);
  const [segments, setSegments] = useState(generateSegments(clock))
  const [localHighlight, setLocalHighlight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const localClock = { ...clock, progress: localHighlight ? localHighlight : clock.progress }
    setSegments(generateSegments(localClock))
  }, [clock, localHighlight]);

  const setClock = (newClock: Partial<Clock>) => {
    updateClock(clock.id, newClock);
  }

  const remove = () => removeClock(clock.id);

  return (
    <>
      <Stack p={1} gap={1} direction={"row"} alignItems="center" sx={{ transition: "opacity 0.5s" }} >
        <IconButton onClick={remove}><DeleteIcon /></IconButton>
        <div style={{ maxWidth: MAX_SIZE, maxHeight: MAX_SIZE }}>
          <PieChart
            series={[
              {
                data: segments,
                paddingAngle: 3,
                innerRadius: MAX_SIZE * 0.1574,
                cornerRadius: MAX_SIZE * 0.04,
                outerRadius: MAX_SIZE / 2,
                cx: (MAX_SIZE / 2) - 2.5,
                cy: (MAX_SIZE / 2) - 2.5,
              },
            ]}
            width={MAX_SIZE + 5}
            height={MAX_SIZE + 5}
            tooltip={{ trigger: "none" }}
            onItemClick={(event, item) => setClock({ progress: item.dataIndex + 1 })}
            onHighlightChange={(item) => {
              setLocalHighlight(item?.dataIndex !== undefined ? item.dataIndex + 1 : undefined)
            }}
            sx={{ alignItems: "center", justifyContent: "center" }}
          />
        </div>
        <Stack direction={"column"} useFlexGap sx={{ flexGrow: 1 }} >
          <Stack gap={2} direction={"row"} justifyContent={"flex-start"} alignItems={"center"} >
            <IconButton><VisibilityIcon /></IconButton>
            <ColorPicker color={clock.color} setColor={(color) => setClock({ color })} />
          </Stack>
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
