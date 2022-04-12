import { AlertColor } from "@mui/material/Alert";
import { Dispatch, SetStateAction } from "react";

export interface AppMessage {
    severity: AlertColor;
    message: string;
}

export interface AppMessageContext {
    appMessage: AppMessage | null;
    setMessage: Dispatch<SetStateAction<AppMessage | null>>;
}