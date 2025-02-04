import { useEffect } from "react";
import { useClocksStore, Clock, ClockState } from "../clocks/store";
import { getClockPluginId } from "./getPluginId";
import { setMetadata } from "./Owlbear";

const filterInvisibleClocks = (clocksState: ClockState) => {
  const clocks: Clock[] = [];
  if (clocksState.allVisible) {
    clocksState.clocks.forEach((clock) => {
      if (clock.visible) {
        clocks.push(clock);
      }
    });
  }
  return clocks;
}

const setClocksMetadata = (clocks: Clock[]) => {
  setMetadata({
    [getClockPluginId()]: clocks,
  })
}

const useClockSync = () => {
  useEffect(
    () => {
      setClocksMetadata(filterInvisibleClocks(useClocksStore.getState())) // sync on initial hydration

      useClocksStore.subscribe((state, prevState) => {
        let changed = false;
        let clocks: Clock[] = [];
        if (!state.allVisible && !prevState.allVisible) {
          return;
        } else {
          changed = true;
          clocks = filterInvisibleClocks(state);
        }

        if (changed) {
          setClocksMetadata(clocks)
        }
      });
    },
    [],
  );
}

export function ClockSync() {
  useClockSync();
  return null;
}
