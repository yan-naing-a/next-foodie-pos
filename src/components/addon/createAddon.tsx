import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import SelectInput from "../SelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const items = [
    "addon category 1",
    "addon category 2",
    "addon category 3",
    "addon category 4",
    "addon category 5",
];

const CreateAddon = ({ open, setOpen }: Props) => {
    const handleCreateAddon = () => {
        console.log("Created an addon");
        setOpen(false);
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
            <DialogTitle id="alert-dialog-title">Create Addon</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField id="name-input" label="name" variant="outlined" />
                <TextField id="price-input" label="price" variant="outlined" type="number" />
                <SelectInput items={items} inputLabel="menu" multiple={false} />
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleCreateAddon} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default CreateAddon;
