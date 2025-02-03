import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
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
