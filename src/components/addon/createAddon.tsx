import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

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
        >
            <DialogTitle id="alert-dialog-title">Create Addon</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Creating an addon is awesome
                </DialogContentText>
            </DialogContent>
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
