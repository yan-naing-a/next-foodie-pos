import { useAppDispatch } from "@/store/hooks";
import { createTable } from "@/store/slices/tableSlice";
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InputErrorMessage from "../InputErrorMessage";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateTable = ({ open, setOpen }: Props) => {
    const [name, setName] = useState<string>("");
    const [selectedLocationId, setSelectedLocationId] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const storeLocationId = localStorage.getItem("selectedLocationId");
        storeLocationId && setSelectedLocationId(storeLocationId);
    }, []);

    const clearInput = () => {
        setName("");
        setSelectedLocationId("");
    };

    const onSuccess = () => {
        clearInput();
        setOpen(false);
    };

    const handleCreateTable = () => {
        if (!name || !selectedLocationId) {
            setErrorMessage([]);
            !name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            !selectedLocationId &&
                setErrorMessage((prevState) => [...prevState, "select location on setting first"]);
            return;
        }
        dispatch(createTable({ name, locationId: Number(selectedLocationId), onSuccess }));
    };

    return (
        <Dialog
            open={open}
            onClose={() => {
                clearInput();
                setErrorMessage([]);
                setOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
            disableRestoreFocus
            sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: 400 } }}
        >
            <DialogTitle id="alert-dialog-title">Create Table</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    onChange={(evt) => setName(evt.target.value)}
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button
                    onClick={() => {
                        clearInput();
                        setErrorMessage([]);
                        setOpen(false);
                    }}
                    autoFocus
                >
                    Cancel
                </Button>
                <Button onClick={handleCreateTable} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default CreateTable;
