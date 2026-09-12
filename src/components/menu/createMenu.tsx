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
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [assetUrl, setAssetUrl] = useState<string>("");
    // select menu category
    const [selectedMenuCategories, setSelectedMenuCategories] = useState<SelectType[] | null>([]);
    const menuCategories = useAppSelector((state) => state.menuCategory.items);
    // select addon category
    const [selectedAddonCategories, setSelectedAddonCategories] = useState<SelectType[] | null>([]);
    const addonCategories = useAppSelector((state) => state.addonCategory.items);
    const dispatch = useAppDispatch();

    const onSuccess = () => {
        setSelectedMenuCategories([]);
        setSelectedAddonCategories([]);
        setOpen(false);
    };

    const handleCreateMenu = () => {
        if (!name || !selectedMenuCategories?.length) {
            console.log("Field required!");
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
            return;
        } else {
            dispatch(createMenu({ name, price, description, assetUrl, menuCategoryIds, onSuccess }));
        }
    };

    if (!menuCategories.length) return;

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
