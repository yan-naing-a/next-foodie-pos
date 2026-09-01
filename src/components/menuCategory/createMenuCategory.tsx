import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import SelectInput from "../SelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const items = ["Menu 1", "Menu 2", "Menu 3", "Menu 4", "Menu 5"];

const CreateMenuCategory = ({ open, setOpen }: Props) => {
    const handleCreateMenuCategory = () => {
        console.log("Created a menu category");
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
            <DialogTitle id="alert-dialog-title">Create Menu Category</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField id="name-input" label="name" variant="outlined" />
                <SelectInput items={items} inputLabel="menu" />
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleCreateMenuCategory} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default CreateMenuCategory;
