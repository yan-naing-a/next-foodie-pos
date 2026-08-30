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

const CreateAddonCategory = ({ open, setOpen }: Props) => {
    const handleCreateAddonCategory = () => {
        console.log("Created an addon category");
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
            <DialogTitle id="alert-dialog-title">Create Addon Category</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Creating an addon category is awesome
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleCreateAddonCategory} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default CreateAddonCategory;
