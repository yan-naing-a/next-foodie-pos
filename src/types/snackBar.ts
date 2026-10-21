import { AlertColor, AlertPropsColorOverrides } from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

export interface SnackBarState {
  open?: boolean;
  message: string;
  autoHideDuration?: number;
  severity?: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined;
}
