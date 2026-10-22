import { useAppDispatch } from "@/store/hooks";
import { createLocation } from "@/store/slices/locationSlice";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { CreateLocationOption } from "@/types/location";
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import InputErrorMessage from "../InputErrorMessage";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultLocation: CreateLocationOption = {
    name: "",
    address: "",
};

const CreateLocation = ({ open, setOpen }: Props) => {
    // const [name, setName] = useState<string>("");
    // const [address, setAddress] = useState<string>("");
    const [location, setLocation] = useState<CreateLocationOption>(defaultLocation);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const clearInput = () => {
        setLocation(defaultLocation);
        setErrorMessage([]);
        setOpen(false);
    };

    const onSuccess = () => {
        // for open snack bar
        dispatch(setOpenSnackBar({ message: "Create location successfully!" }));
        clearInput();
    };

    const handleCreateLocation = () => {
        if (!location.name || !location.address) {
            setErrorMessage([]);
            !location.name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            !location.address && setErrorMessage((prevState) => [...prevState, "address field required"]);
            return;
        }
        dispatch(createLocation({ ...location, onSuccess }));
    };

    return (
        <Dialog
            open={open}
            onClose={clearInput}
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
                    value={location.name}
                    onChange={(e) => setLocation({ ...location, name: e.target.value })}
                />
                <TextField
                    id="address-input"
                    label="address"
                    variant="outlined"
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={clearInput} autoFocus>
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
