import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import {Clock} from "../clocks/store";
import {ClockViewReadonly} from "./ClockViewReadonly";
import {Grid2, Paper} from "@mui/material";
import SimpleBar from "simplebar-react";
import Divider from "@mui/material/Divider";

type ClockListReadonlyProps = {
  clocks: Clock[],
}

export function ClockListReadonly({ clocks }: ClockListReadonlyProps) {
  const theme = useTheme();
  console.log("theme", theme);
  return (
    <Box component="div" position="absolute" right={16} bottom={16}>
      <Slide
        in={true}
        direction="up"
      >
          <Paper
            sx={{
              width: "230px",
              height: "315px",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
              backdropFilter: theme.palette.mode === "light" ? "blur(20px)" : "blur(10px)",
              backgroundColor: `${theme.palette.mode === "light" ? theme.palette.background.paper : theme.palette.background.default}99`,
            }}
          >
            <SimpleBar
              style={{
                maxHeight: 315 - 32,
                height: 315 - 32,
                width: 230,
                overflow: "auto",
              }}
            >
              <Grid2 container spacing={2}>
                {clocks.map((clock) => <ClockViewReadonly key={clock.id} clock={clock} />)}
              </Grid2>
            </SimpleBar>
            <Divider />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              textAlign="center"
              lineHeight="32px"
              noWrap
            >
              Progress Clocks
            </Typography>
          </Paper>
      </Slide>
    </Box>
  );
}
