import React, { PropsWithChildren } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

type TooltipButtonProps = PropsWithChildren<{
  title?: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
}>;

function TooltipButton(props: TooltipButtonProps) {
  return (
    <Tooltip title={props.title}>
      <IconButton onClick={props.onClick}>
        {props.children}
      </IconButton>
    </Tooltip>
  );
}

export { TooltipButton };
