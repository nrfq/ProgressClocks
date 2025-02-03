import styled from "@emotion/styled"
import { MouseEventHandler } from "react";

type ColorButtonProps = {
  className?: string,
  onClick: MouseEventHandler<HTMLButtonElement>,
  open: boolean,
  color?: string,
}

const ColorButtonBase = ({ className, onClick, open }: ColorButtonProps) => (
  <button
    aria-label="color"
    id="color-button"
    aria-controls={open ? "color-picker" : undefined}
    aria-haspopup="true"
    aria-expanded={open ? "true" : undefined}
    onClick={onClick}
    className={className}
  >
  </button>
);

export const ColorButton = styled(ColorButtonBase)`
    border-radius: 9999px;
    height: 1.5rem;
    width: 1.5rem;
    background-color: ${props => props.color ?? "#FFFFFF"};
    box-shadow: none;
    border: none;
    cursor: pointer;
`
