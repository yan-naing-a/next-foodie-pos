import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddon } from "@/store/slices/addonSlice";
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import SingleSelectInput from "../selectInput/SingleSelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectType {
    id: number;
    name: string;
}

const CreateAddon = ({ open, setOpen }: Props) => {
    const [name, setName] = useState<string | null>(null);
    const [price, setPrice] = useState<number>(0);
    const [selectedAddonCategory, setSelectedAddonCategory] = useState<SelectType | null>(null);
    const addonCategories = useAppSelector((state) => state.addonCategory.items);
    const dispatch = useAppDispatch();

    const onSuccess = () => {
        setSelectedAddonCategory(null);
        setOpen(false);
    };

    const handleCreateAddon = () => {
        if (!name || !price || !selectedAddonCategory) {
            console.log("Fields are required");
            return;
        }
        const addonCategoryId = selectedAddonCategory.id;

        dispatch(createAddon({ name, price, addonCategoryId, onSuccess }));
    };

    if (!addonCategories.length) return;

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
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    onChange={(evt) => setName(evt.target.value)}
                />
                <TextField
                    id="price-input"
                    label="price"
                    variant="outlined"
                    type="number"
                    onChange={(evt) => setPrice(Number(evt.target.value))}
                />
                <SingleSelectInput
                    items={addonCategories}
                    inputLabel="addon category"
                    value={selectedAddonCategory}
                    setValue={setSelectedAddonCategory}
                />
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
