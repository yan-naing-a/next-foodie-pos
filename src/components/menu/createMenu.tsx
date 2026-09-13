import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menuSlice";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import InputErrorMessage from "../InputErrorMessage";
import MultipleSelectInput from "../selectInput/MultiSelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectType {
    id: number;
    name: string;
}

const CreateMenu = ({ open, setOpen }: Props) => {
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>("");
    const [assetUrl, setAssetUrl] = useState<string>("");
    // select menu category
    const [selectedMenuCategories, setSelectedMenuCategories] = useState<SelectType[] | null>([]);
    const menuCategories = useAppSelector((state) => state.menuCategory.items);
    // select addon category
    const [selectedAddonCategories, setSelectedAddonCategories] = useState<SelectType[] | null>([]);
    const addonCategories = useAppSelector((state) => state.addonCategory.items);

    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    const clearInput = () => {
        setName("");
        setPrice(undefined);
        setDescription("");
        setAssetUrl("");
        setSelectedMenuCategories([]);
        setSelectedAddonCategories([]);
    };

    const onSuccess = () => {
        clearInput();
        setOpen(false);
    };

    const handleCreateMenu = () => {
        if (!name || price === undefined || !selectedMenuCategories?.length) {
            setErrorMessage([]);
            !name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            price === undefined && setErrorMessage((prevState) => [...prevState, "invalid price field"]);
            !selectedMenuCategories?.length &&
                setErrorMessage((prevState) => [...prevState, "menu categories field required"]);
            return;
        }
        const menuCategoryIds = selectedMenuCategories.map((MenuCategory) => MenuCategory.id);

        if (selectedAddonCategories?.length) {
            const addonCategoryIds = selectedAddonCategories.map((addonCategory) => addonCategory.id);
            const menuData = {
                name,
                price,
                description,
                assetUrl,
                menuCategoryIds,
                addonCategoryIds,
                onSuccess,
            };
            dispatch(createMenu(menuData));
        } else {
            dispatch(createMenu({ name, price, description, assetUrl, menuCategoryIds, onSuccess }));
        }
    };

    if (!menuCategories.length) return;

    return (
        <Dialog
            open={open}
            onClose={() => {
                clearInput();
                setErrorMessage([]);
                setOpen(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            role="alertdialog"
            disableRestoreFocus
            sx={{ "& .MuiDialog-paper": { width: "100%", maxWidth: 400 } }}
        >
            <DialogTitle id="alert-dialog-title">Create Menu</DialogTitle>
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
                    slotProps={{ htmlInput: { min: 0 } }}
                    onChange={(evt) => setPrice(Number(evt.target.value))}
                />
                <TextField
                    id="description-input"
                    label="description"
                    multiline
                    rows={3}
                    onChange={(evt) => setDescription(evt.target.value)}
                />
                <Typography variant="body1">There must be image upload</Typography>
                {/* menu category */}
                <MultipleSelectInput
                    items={menuCategories}
                    inputLabel="menu categories"
                    values={selectedMenuCategories}
                    setValues={setSelectedMenuCategories}
                />
                {/* addon category */}
                <MultipleSelectInput
                    items={addonCategories}
                    inputLabel="addon categories"
                    values={selectedAddonCategories}
                    setValues={setSelectedAddonCategories}
                />
                {!!errorMessage && <InputErrorMessage errorMessage={errorMessage} />}
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button
                    onClick={() => {
                        clearInput();
                        setErrorMessage([]);
                        setOpen(false);
                    }}
                    autoFocus
                >
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
