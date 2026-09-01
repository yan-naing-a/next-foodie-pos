import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import SelectInput from "../SelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const items = [
    "Menu Category 1",
    "Menu Category 2",
    "Menu Category 3",
    "Menu Category 4",
    "Menu Category 5",
];

const CreateMenu = ({ open, setOpen }: Props) => {
    const handleCreateMenu = () => {
        console.log("Created a menu");
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
            <DialogTitle id="alert-dialog-title">Create Menu</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField id="name-input" label="name" variant="outlined" />
                <TextField id="price-input" label="price" variant="outlined" type="number" />
                <TextField id="description-input" label="description" multiline rows={3} />
                <Typography variant="body1">There must be image upload</Typography>
                <SelectInput items={items} inputLabel="menu category" />
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleCreateMenu} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default CreateMenu;
