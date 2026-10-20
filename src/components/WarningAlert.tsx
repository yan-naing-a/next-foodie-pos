import WarningIcon from "@mui/icons-material/Warning";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import InputErrorMessage from "./InputErrorMessage";

const useIsomorphicLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    label: string;
    handleDeleteData: () => void;
}

const WarningAlert = ({ open, setOpen, label, handleDeleteData }: Props) => {
    const [inputWord, setInputWord] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string[]>();
    const triggerRef = useRef<HTMLElement | null>(null);

    useIsomorphicLayoutEffect(() => {
        if (!open) return;

        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLElement && activeElement !== document.body) {
            triggerRef.current = activeElement;
            activeElement.blur();
        }
    }, [open]);

    const handleClose = () => {
        setInputWord("");
        setErrorMessage([]);
        setOpen(false);
    };

    const handleDelete = () => {
        if (!inputWord) {
            setErrorMessage([]);
            setErrorMessage(["input field required"]);
        } else if (label !== inputWord) {
            setErrorMessage([]);
            setErrorMessage(["type carefully please"]);
        } else {
            handleDeleteData();
            handleClose();
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
            onTransitionExited={() => {
                const trigger = triggerRef.current;
                triggerRef.current = null;

                if (trigger?.isConnected) {
                    queueMicrotask(() => {
                        if (trigger.isConnected) trigger.focus();
                    });
                }
            }}
        >
            <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
                <WarningIcon sx={{ color: "orange", fontSize: 30, fontWeight: "bold" }} />
                <Typography variant="h5" component="span">
                    Warning
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure want to delete &quot;
                    <span style={{ color: "black", fontWeight: "bold" }}>{label}</span>&quot; ?
                </DialogContentText>
            </DialogContent>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField
                    label="type name to delete"
                    variant="outlined"
                    color="error"
                    onChange={(e) => setInputWord(e.target.value)}
                />
                {!!errorMessage?.length && <InputErrorMessage errorMessage={errorMessage} />}
            </Box>

            <DialogActions sx={{ p: 3 }}>
                <Button onClick={handleClose} autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleDelete} variant="contained" color="error">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WarningAlert;
