import { useAppDispatch } from "@/store/hooks";
import { createLocation } from "@/store/slices/locationSlice";
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateLocation = ({ open, setOpen }: Props) => {
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const dispatch = useAppDispatch();

    const onSuccess = () => {
        setOpen(false);
        console.log("Location created successfully");
    };

    const handleCreateLocation = () => {
        dispatch(createLocation({ name, address, onSuccess }));
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
            <DialogTitle id="alert-dialog-title">Create Location</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    id="address-input"
                    label="address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleCreateLocation} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default CreateLocation;
