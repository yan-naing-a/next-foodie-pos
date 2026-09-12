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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
    const [description, setDescription] = useState<string>("");
    const [assetUrl, setAssetUrl] = useState<string>("");
    const [selectedMenuCategories, setSelectedMenuCategories] = useState<SelectType[] | null>(null);
    const [price, setPrice] = useState<number>(0);
    const menuCategories = useAppSelector((state) => state.menuCategory.items);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (menuCategories.length) {
            const { id, name } = menuCategories[0];
            setSelectedMenuCategories([{ id, name }]);
        }
    }, [menuCategories]);

    const onSuccess = () => {
        setOpen(false);
    };

    const handleCreateMenu = () => {
        if (!name || !selectedMenuCategories?.length) {
            console.log("Field required!");
            return;
        }
        const selectedMenuCategoryIds = selectedMenuCategories.map(
            (selectedMenuCategory) => selectedMenuCategory.id,
        );
        dispatch(
            createMenu({
                name,
                price,
                description,
                assetUrl,
                menuCategoryIds: selectedMenuCategoryIds,
                onSuccess,
            }),
        );
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
                <MultipleSelectInput
                    items={menuCategories}
                    inputLabel="menu categories"
                    values={selectedMenuCategories}
                    setValues={setSelectedMenuCategories}
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
