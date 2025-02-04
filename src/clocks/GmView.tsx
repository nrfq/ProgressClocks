import { Sidebar } from "../controls/Sidebar";
import { ClockList } from "./ClockList";
import {PluginGate} from "../plugin/PluginGate";
import {ClockSync} from "../plugin/ClockSync";

type GmViewProps = {

}

function GmView(props: GmViewProps) {
  return (
    <>
      <Sidebar />
      <ClockList />
      <PluginGate>
        <ClockSync />
        {/*<PluginResizeObserver />*/}
      </PluginGate>
    </>
  );
}

export { GmView };
