import  MuiAlert,{ AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef, useContext } from "react";
import { MessageContext } from "./MessageProvider";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MessageAlert() {
    const appMessageCtx=useContext(MessageContext);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }
        appMessageCtx?.setMessage(null);
    };

    return (
        <>{appMessageCtx?.appMessage && 
            <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={appMessageCtx.appMessage.severity} sx={{ width: '100%' }}>
                {appMessageCtx.appMessage.message}
                </Alert>
            </Snackbar>
        }</>
    );
}