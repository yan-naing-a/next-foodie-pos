import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenuCategory } from "@/store/slices/menuCategorySlice";
import { CreateMenuCategoryOption } from "@/types/menuCategory";
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import InputErrorMessage from "../InputErrorMessage";
import { default as MultipleSelectInput } from "../selectInput/MultiSelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectType {
    id: number;
    name: string;
}

const defaultMenuCategory = {
    name: "",
    menuIds: [],
};

const CreateMenuCategory = ({ open, setOpen }: Props) => {
    const [selectedMenus, setSelectedMenus] = useState<SelectType[] | null>([]);
    const [menuCategory, setMenuCategory] = useState<CreateMenuCategoryOption>(defaultMenuCategory);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const menus = useAppSelector((state) => state.menu.items);
    const dispatch = useAppDispatch();

    const clearInput = () => {
        setMenuCategory(defaultMenuCategory);
        setErrorMessage([]);
        setSelectedMenus([]);
        setOpen(false);
    };

    const handleCreateMenuCategory = () => {
        if (!menuCategory.name) {
            setErrorMessage([]);
            !menuCategory.name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            return;
        }
        const menuIds = selectedMenus?.map((selectedMenu) => selectedMenu.id);
        dispatch(
            createMenuCategory({ name: menuCategory.name, menuIds, onSuccess: () => clearInput() }),
        );
    };

    //
    if (!menus.length) return;

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
            <DialogTitle id="alert-dialog-title">Create Menu Category</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    onChange={(evt) => setMenuCategory({ ...menuCategory, name: evt.target.value })}
                />
                <MultipleSelectInput
                    items={menus}
                    inputLabel="menus"
                    values={selectedMenus}
                    setValues={setSelectedMenus}
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={clearInput} autoFocus>
                    Cancel
                </Button>
                <Button onClick={handleCreateMenuCategory} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default CreateMenuCategory;
