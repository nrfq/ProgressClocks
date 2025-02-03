import { Sidebar } from "../controls/Sidebar";
import { ClockList } from "./ClockList";

type GmViewProps = {

}

function GmView(props: GmViewProps) {
  return (
    <>
      <Sidebar />
      <ClockList />
    </>
  );
}

export { GmView };
