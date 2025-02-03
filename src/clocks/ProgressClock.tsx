import {PieChart} from "@mui/x-charts/PieChart";
import {useEffect, useState} from "react";
import {Clock, useClocksStore} from "./store";

const MAX_SIZE = 100;

const generateSegments = (clock: Clock) => {
  const data = [];
  for (let i = 0; i < clock.segments; i++ ) {
    const color = i < clock.progress ? clock.color : `${clock.color}22`;
    data.push({ id: i, color , value: 1 })
  }
  return data;
}

type ClockProps = {
  clock: Clock
  readonly: boolean,
}

function ProgressClock({ clock, readonly }: ClockProps) {
  const [segments, setSegments] = useState(generateSegments(clock))
  const [localHighlight, setLocalHighlight] = useState<number | undefined>(undefined);
  const updateClock = useClocksStore((state) => state.updateClock);

  const setClock = (newClock: Partial<Clock>) => {
    updateClock(clock.id, newClock);
  }

  useEffect(() => {
    const localClock = { ...clock, progress: localHighlight ? localHighlight : clock.progress }
    setSegments(generateSegments(localClock))
  }, [clock, localHighlight]);

  return (
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
        onItemClick={readonly ? undefined : (event, item) => setClock({ progress: item.dataIndex + 1 })}
        onHighlightChange={readonly ? undefined : (item) => {
          setLocalHighlight(item?.dataIndex !== undefined ? item.dataIndex + 1 : undefined)
        }}
        sx={{ alignItems: "center", justifyContent: "center" }}
      />
    </div>
  );
}

export { ProgressClock };
