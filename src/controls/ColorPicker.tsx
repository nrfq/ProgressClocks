import { useState } from "react";

import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";

import { useDiceRollStore } from "../dice/store";
import {BlockPicker, ColorChangeHandler} from "react-color";
import {ColorButton} from "./ColorButton";

type ColorPickerProps = {
  color: string | undefined,
  setColor: (color: string) => void,
}

export function ColorPicker({ color = "#FFFFFF", setColor }: ColorPickerProps) {
  const colorChange: ColorChangeHandler = (color, event) => {
    setColor(color.hex);
  }

  /** Controls (bonus and adv/dis) */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <Tooltip title="Color" placement="top" disableInteractive>
        <ColorButton color={color} open={open} onClick={handleClick} />
      </Tooltip>
      <Menu
        id="color-menu"
        anchorEl={anchorEl}
        variant={"selectedMenu"}
        open={open}
        onClose={handleClose}
        classes={{
          root: "color-menu",
          paper: "color-menu",
          list: "color-menu",
        }}
        MenuListProps={{
          "aria-labelledby": "color-button",
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <BlockPicker color={color} onChange={colorChange} triangle={"hide"} />
      </Menu>
    </>
  );
}
