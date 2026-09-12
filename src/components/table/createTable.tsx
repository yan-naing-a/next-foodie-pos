import { useAppDispatch } from "@/store/hooks";
import { createTable } from "@/store/slices/tableSlice";
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateTable = ({ open, setOpen }: Props) => {
    const [name, setName] = useState<string>("");
    const [selectedLocationId, setSelectedLocationId] = useState<string>("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        const storeLocationId = localStorage.getItem("selectedLocationId");
        storeLocationId && setSelectedLocationId(storeLocationId);
    }, []);

    const onSuccess = () => setOpen(false);

    const handleCreateTable = () => {
        if (!name || !selectedLocationId) {
            console.log("Fields are required");
            return;
        }
        dispatch(createTable({ name, locationId: Number(selectedLocationId), onSuccess }));
    };

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
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
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={() => setOpen(false)} autoFocus>
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
