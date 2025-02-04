import OBR, {Metadata, Player} from "@owlbear-rodeo/sdk";
import {getClockPluginId, getPluginId} from "./getPluginId";
import {useEffect, useMemo, useState} from "react";
import {Clock} from "../clocks/store";

export const isProd = import.meta.env.MODE === "production";

export const getRole = async () => {
  if (isProd) {
    return await OBR.player.getRole();
  };
  return window.location.pathname.includes("popover") ? "PLAYER" : "GM"; // assume player on dev popover page
}

const clockTestData = [
  {
    segments: 6,
    color: "#FFFFFF",
    name: "Test Clock",
    visible: true,
    progress: 3,
    id: 1,
  },
  {
    segments: 12,
    color: "#FF00FF",
    name: "The Baron",
    visible: true,
    progress: 7,
    id: 2,
  },
  {
    segments: 4,
    color: "#FF0000",
    name: "Suspicion",
    visible: true,
    progress: 1,
    id: 3,
  },
  {
    segments: 6,
    color: "#00FF00",
    name: "Good thing",
    visible: true,
    progress: 1,
    id: 4,
  },
  {
    segments: 6,
    color: "#00FF00",
    name: "Good thing",
    visible: true,
    progress: 1,
    id: 5,
  }
]

export const getPlayers = async (): Promise<Player[]> => {
  if (isProd) {
    return await OBR.party.getPlayers();
  }
  return [{
    id: "12345",
    connectionId: "12345",
    name: "Nick",
    color: "#FF00FF",
    syncView: false,
    role: "GM",
    metadata: {
      [getClockPluginId()]: clockTestData,
    },
  }];
}

export const onPartyChanged = (callback: (players: Player[]) => void) => {
  if (isProd) {
    OBR.party.onChange(callback);
  }
}

export const isAvailable = () => {
  if (isProd) {
    return OBR.isAvailable;
  }
  return true;
}

export const onReady = (callback: () => void) => {
  if (isProd) {
    OBR.onReady(callback);
  } else {
    callback();
  }
}

export const usePublicClocks = (gm: Player | undefined) => {
  return useMemo(() => {
    return (gm?.metadata[getClockPluginId()] ?? []) as Clock[]
  }, [gm]);
}

export const useRole = () => {
  const [role, setRole] = useState<Player["role"] | undefined>(undefined);
  useEffect(() => {
    getRole().then(role => setRole(role))
  }, []);
  return role;
}

export const setMetadata = async (update: Partial<Metadata>) => {
  if (isProd) {
    return await OBR.player.setMetadata(update)
  }
  return null;
}

export const adjustPopoverHeight = (hidden: boolean) => {
  if (!isProd) {
    return;
  }

  if (hidden) {
    OBR.popover.setHeight(getPluginId("popover"), 0);
    OBR.popover.setWidth(getPluginId("popover"), 0);
  } else {
    // Height = Tray + Name + Bottom
    OBR.popover.setHeight(getPluginId("popover"), 315 + 16);
    // Width = Tray + Right
    OBR.popover.setWidth(getPluginId("popover"), 230 + 16);
  }

}
