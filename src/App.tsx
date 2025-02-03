import { PluginGate } from "./plugin/PluginGate";
import {MainView} from "./clocks/MainView";

export function App() {
  return (
    <div style={{ maxWidth: 300 }}>
      <PluginGate>
        <MainView />
      </PluginGate>
    </div>
  );
}
