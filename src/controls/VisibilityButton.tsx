import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TooltipButton } from "./TooltipButton";

type VisibilityButtonProps = {
  visible: boolean,
  title?: string,
  setVisible: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: boolean) => void,
}

function VisibilityButton({ visible, setVisible, title }: VisibilityButtonProps) {
  return (
    <TooltipButton
      onClick={(event) => setVisible(event, !visible)}
      title={title}
    >
      {visible
        ? <VisibilityIcon />
        : <VisibilityOffIcon />
      }
    </TooltipButton>
  );
}

export { VisibilityButton };
