import OBR, {Player} from "@owlbear-rodeo/sdk";
import {getClockPluginId} from "./getPluginId";

export const isProd = true;

export const getRole = async () => {
  if (isProd) {
    return await OBR.player.getRole();
  };
  return "PLAYER";
}

const clockTestData = [
  {
    segments: 6,
    color: "#FFFFFF",
    name: "Test Clock",
    visible: true,
    progress: 3,
    id: 123456,
  },
  {
    segments: 12,
    color: "#FF00FF",
    name: "The Baron",
    visible: true,
    progress: 7,
    id: 123456,
  },
  {
    segments: 4,
    color: "#FF0000",
    name: "Suspicion",
    visible: true,
    progress: 1,
    id: 123456,
  },
  {
    segments: 6,
    color: "#00FF00",
    name: "Good thing",
    visible: true,
    progress: 1,
    id: 123456,
  },
  {
    segments: 6,
    color: "#00FF00",
    name: "Good thing",
    visible: true,
    progress: 1,
    id: 123456,
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
