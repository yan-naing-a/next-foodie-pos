import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenu } from "@/store/slices/menuSlice";
import { CreateMenuOption } from "@/types/menu";
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

const defaultMenu: CreateMenuOption = {
    name: "",
    price: 0,
    description: "",
    assetUrl: "",
    menuCategoryIds: [],
    addonCategoryIds: [],
};

const CreateMenu = ({ open, setOpen }: Props) => {
    const [newMenu, setNewMenu] = useState<CreateMenuOption>(defaultMenu);
    // select menu category
    const [selectedMenuCategories, setSelectedMenuCategories] = useState<SelectType[] | null>([]);
    const menuCategories = useAppSelector((state) => state.menuCategory.items);
    // select addon category
    const [selectedAddonCategories, setSelectedAddonCategories] = useState<SelectType[] | null>([]);
    const addonCategories = useAppSelector((state) => state.addonCategory.items);

    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectedMenuCategories) {
            const menuCategoryIds = selectedMenuCategories.map((item) => item.id);
            setNewMenu((prev) => ({ ...prev, menuCategoryIds }));
            if (selectedAddonCategories) {
                const addonCategoryIds = selectedAddonCategories?.map((item) => item.id);
                setNewMenu((prev) => ({ ...prev, addonCategoryIds }));
            }
        }
    }, [selectedMenuCategories, selectedAddonCategories]);

    const clearInput = () => {
        setNewMenu(defaultMenu);
        setSelectedMenuCategories([]);
        setSelectedAddonCategories([]);
        setErrorMessage([]);
        setOpen(false);
    };

    console.log("menuCategoryIds: ", newMenu.menuCategoryIds);
    console.log("addonCategoryIds: ", newMenu.addonCategoryIds);

    const handleCreateMenu = () => {
        if (!newMenu.name || newMenu.price === undefined || !newMenu.menuCategoryIds.length) {
            setErrorMessage([]);
            !newMenu.name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            newMenu.price === undefined &&
                setErrorMessage((prevState) => [...prevState, "invalid price field"]);
            !newMenu.menuCategoryIds?.length &&
                setErrorMessage((prevState) => [...prevState, "menu categories field required"]);
            return;
        }
        dispatch(createMenu({ ...newMenu, onSuccess: () => clearInput() }));
    };

    if (!menuCategories.length) return;

    return (
        <Dialog
            open={open}
            onClose={() => clearInput()}
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
                    onChange={(evt) => setNewMenu({ ...newMenu, name: evt.target.value })}
                />
                <TextField
                    id="price-input"
                    label="price"
                    variant="outlined"
                    type="number"
                    slotProps={{ htmlInput: { min: 0 } }}
                    onChange={(evt) => setNewMenu({ ...newMenu, price: Number(evt.target.value) })}
                />
                <TextField
                    id="description-input"
                    label="description"
                    multiline
                    rows={3}
                    onChange={(evt) => setNewMenu({ ...newMenu, description: evt.target.value })}
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
                <Button onClick={() => clearInput()} autoFocus>
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
