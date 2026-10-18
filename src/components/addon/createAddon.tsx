import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddon } from "@/store/slices/addonSlice";
import { CreateAddonOption } from "@/types/addon";
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import InputErrorMessage from "../InputErrorMessage";
import SingleSelectInput from "../selectInput/SingleSelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectType {
    id: number;
    name: string;
}

const defaultAddon: CreateAddonOption = {
    name: "",
    price: 0,
};

const CreateAddon = ({ open, setOpen }: Props) => {
    const [selectedAddonCategory, setSelectedAddonCategory] = useState<SelectType | null>(null);
    const [addon, setAddon] = useState<CreateAddonOption>(defaultAddon);
    // error message
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const addonCategories = useAppSelector((state) => state.addonCategory.items);
    const dispatch = useAppDispatch();

    const clearInput = () => {
        setAddon(defaultAddon);
        setErrorMessage([]);
        setOpen(false);
    };

    const onSuccess = () => clearInput();

    // if not valid ,return back
    if (!addonCategories.length) return;

    const handleCreateAddon = () => {
        if (!addon.name || addon.price == undefined || !selectedAddonCategory) {
            setErrorMessage([]);
            !addon.name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            addon.price == undefined &&
                setErrorMessage((prevState) => [...prevState, "invalid price field"]);
            !selectedAddonCategory &&
                setErrorMessage((prevState) => [...prevState, "addon category field required"]);
            return;
        }
        const addonCategoryId = selectedAddonCategory.id;
        dispatch(createAddon({ name: addon.name, price: addon.price, addonCategoryId, onSuccess }));
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
            <DialogTitle id="alert-dialog-title">Create Addon</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    onChange={(evt) => setAddon((prev) => ({ ...prev, name: evt.target.value }))}
                />
                <TextField
                    id="price-input"
                    label="price"
                    variant="outlined"
                    type="number"
                    slotProps={{ htmlInput: { min: 0 } }}
                    onChange={(evt) => setAddon((prev) => ({ ...prev, price: Number(evt.target.value) }))}
                />
                <SingleSelectInput
                    items={addonCategories}
                    inputLabel="addon category"
                    value={selectedAddonCategory}
                    setValue={setSelectedAddonCategory}
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={clearInput} autoFocus>
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
