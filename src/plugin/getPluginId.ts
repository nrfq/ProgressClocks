/** Get the reverse domain name id for this plugin at a given path */
export function getPluginId(path: string) {
  return `nrfq.progressclocks/${path}`;
}

export const getClockPluginId = () => getPluginId("clocks");
