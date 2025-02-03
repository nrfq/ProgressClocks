import {useRole} from "../plugin/Owlbear";
import {GmView} from "./GmView";
import {PlayerView} from "./PlayerView";

type MainViewProps = {

}

function MainView(props: MainViewProps) {
  const role = useRole();
  return role === "GM"
    ? <GmView />
    : <PlayerView />
}

export { MainView };
