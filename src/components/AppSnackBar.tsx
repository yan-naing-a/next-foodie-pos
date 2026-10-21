import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetSnackBar } from "@/store/slices/snackBarSlice";
import { Alert, Snackbar } from "@mui/material";

const AppSanckBar = () => {
    const { open, message, autoHideDuration, severity } = useAppSelector((state) => state.snackBar);
    const dispatch = useAppDispatch();

    setTimeout(() => dispatch(resetSnackBar()), 5000);

    const handleClose = () => dispatch(resetSnackBar());

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AppSanckBar;
