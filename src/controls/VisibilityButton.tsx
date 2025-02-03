import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

type VisibilityButtonProps = {
  visible: boolean,
  setVisible: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, value: boolean) => void,
}

function VisibilityButton({ visible, setVisible }: VisibilityButtonProps) {
  return (
    <IconButton onClick={(event) => setVisible(event, !visible)}>
      {visible
        ? <VisibilityIcon />
        : <VisibilityOffIcon />
      }
    </IconButton>
  );
}

export { VisibilityButton };
