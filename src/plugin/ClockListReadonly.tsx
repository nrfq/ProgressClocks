import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Player } from "@owlbear-rodeo/sdk";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import {Clock} from "../clocks/store";
import {ClockViewReadonly} from "./ClockViewReadonly";
import {Grid2} from "@mui/material";

type ClockListReadonlyProps = {
  clocks: Clock[],
}

export function ClockListReadonly({ clocks }: ClockListReadonlyProps) {
  const theme = useTheme();
  return (
    <Box component="div" position="absolute" right={16} bottom={16}>
      <Slide
        in={true}
        // onExited={() => onToggle(player.connectionId, false)}
        direction="up"
      >
          <Paper
            elevation={8}
            sx={{
              width: "230px",
              height: "315px",
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(34, 38, 57, 0.8)"
                  : "rgba(255, 255, 255, 0.4)",
            }}
          >
              <Box sx={{ boxShadow: "0 8px 6px -6px black" }}>
                <Box component="div" height="calc(315px - 32px)" width="230px" sx={{ overflow: "scroll" }}>
                  <Grid2 container spacing={2}>
                    {clocks.map((clock) => <ClockViewReadonly clock={clock} />)}
                  </Grid2>
                </Box>
              </Box>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                textAlign="center"
                lineHeight="32px"
                sx={{
                  bgcolor: "background.default",
                }}
                noWrap
              >
                Progress Clocks (Scrollable)
              </Typography>
          </Paper>
      </Slide>
    </Box>
  );
}
