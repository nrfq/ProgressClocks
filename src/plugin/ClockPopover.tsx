import OBR, { Player } from "@owlbear-rodeo/sdk";
import {useEffect, useMemo, useState} from "react";

import Box from "@mui/material/Box";

import { getClockPluginId, getPluginId } from "./getPluginId";
import { Clock } from "../clocks/store";
import {getPlayers, getRole, onPartyChanged} from "./Owlbear";
import {ClockListReadonly} from "./ClockListReadonly";

const usePublicClocks = (gm: Player | undefined) => {
  return useMemo(() => {
    return (gm?.metadata[getClockPluginId()] ?? []) as Clock[]
  }, [gm]);
}

export function ClockPopover() {
  const [gm, setGm] = useState<Player | undefined>(undefined);
  const [isGM, setIsGm] = useState(false);

  useEffect(() => {
    getRole()
      .then((role) => {
        setIsGm(role === "GM");
      })
      .then(() => getPlayers())
      .then((players) => {
        setGm(players.find(player => player.role === "GM"));
      });
  }, []);

  useEffect(() => onPartyChanged((players) => {
    setGm(players.find(player => player.role === "GM"));
  }), []);

  const clocks = usePublicClocks(gm);

  // function handleTrayToggle(connectionId: string, shown: boolean) {
  //   if (shown) {
  //     setVisibleTrays((visible) =>
  //       visible.includes(connectionId) ? visible : [...visible, connectionId]
  //     );
  //   } else {
  //     setVisibleTrays((visible) => visible.filter((id) => id !== connectionId));
  //   }
  // }
  //
  // function handleTrayOpen(connectionId: string) {
  //   if (window.BroadcastChannel) {
  //     OBR.action.open();
  //     const channel = new BroadcastChannel(getPluginId("focused-tray"));
  //     channel.postMessage(connectionId);
  //     channel.close();
  //   }
  // }

  // Hide popover when no trays are visible
  const hidden = clocks.length === 0 || isGM;
  console.log("clocks", clocks);
  console.log("isGM", isGM);
  useEffect(() => {
    if (hidden) {
      OBR.popover.setHeight(getPluginId("popover"), 0);
      OBR.popover.setWidth(getPluginId("popover"), 0);
    } else {
      // Height = Tray + Name + Bottom
      OBR.popover.setHeight(getPluginId("popover"), 315 + 16);
      // Width = Tray + Right
      OBR.popover.setWidth(getPluginId("popover"), 230 + 16);
    }
  }, [hidden]);

  return (
    <Box
      component="div"
      position="absolute"
      bottom="0"
      left="0"
      right="0"
      top="0"
      overflow="hidden"
    >
      {hidden
        ? "She hidden tho"
        : <ClockListReadonly clocks={clocks} />
      }
    </Box>
  );
}
