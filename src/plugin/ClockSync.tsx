import OBR from "@owlbear-rodeo/sdk";
import { useEffect } from "react";
import { useClocksStore, Clock } from "../clocks/store";
import { getClockPluginId } from "./getPluginId";
import { setMetadata } from "./Owlbear";

const useClockSync = () => {
  const clocks = useClocksStore((state) => state.clocks);
  useEffect(
    () => {
      setMetadata({ // sync on initial hydration
        [getClockPluginId()]: clocks,
      })
      useClocksStore.subscribe((state, prevState) => {
        let changed = false;
        let clocks: Clock[] = [];
        if (!state.allVisible && !prevState.allVisible) {
          return;
        } else if (!state.allVisible) {
          changed = true;
          clocks = [];
        } else {
          changed = true;
          state.clocks.forEach((clock) => {
            if (clock.visible) {
              clocks.push(clock);
            }
          });
        }

        if (changed) {
          setMetadata({
            [getClockPluginId()]: clocks,
          });
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
