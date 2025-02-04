import { PluginGate } from "./plugin/PluginGate";
import {MainView} from "./clocks/MainView";

export function App() {
  return (
    <div style={{ maxWidth: 300, height: "100dvh", maxHeight: "100dvh", overflow: "hidden" }}>
      <PluginGate>
        <MainView />
      </PluginGate>
    </div>
  );
}
