import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import {Clock} from "../clocks/store";
import {ClockViewReadonly} from "./ClockViewReadonly";
import {Grid2} from "@mui/material";
import SimpleBar from "simplebar-react";
import Divider from "@mui/material/Divider";

type ClockListReadonlyProps = {
  clocks: Clock[],
}

export function ClockListReadonly({ clocks }: ClockListReadonlyProps) {
  const theme = useTheme();
  return (
    <Box component="div" position="absolute" right={16} bottom={16}>
      <Slide
        in={true}
        direction="up"
      >
          <Paper
            elevation={0}
            sx={{
              width: "230px",
              height: "315px",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
              <Box sx={{ boxShadow: "0 8px 6px -6px black" }}>
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
                Progress Clocks
              </Typography>
          </Paper>
      </Slide>
    </Box>
  );
}
