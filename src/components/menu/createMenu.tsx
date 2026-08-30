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
        >
            <DialogTitle id="alert-dialog-title">Create Menu</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Creating a menu is awesome
                </DialogContentText>
            </DialogContent>
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
