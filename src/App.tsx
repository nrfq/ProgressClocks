import { Sidebar } from "./controls/Sidebar";
import {ClockList} from "./clocks/ClockList";

export function App() {
  return (
    <div style={{ maxWidth: 300 }}>
      <Sidebar />
      <ClockList />
    </div>
  );
}
