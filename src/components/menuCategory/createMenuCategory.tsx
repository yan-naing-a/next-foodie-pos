import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createMenuCategory } from "@/store/slices/menuCategorySlice";
import { Box, Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { default as MultipleSelectInput } from "../selectInput/MultiSelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectType {
    id: number;
    name: string;
}

const CreateMenuCategory = ({ open, setOpen }: Props) => {
    const [name, setName] = useState<string>("");
    const [selectedMenus, setSelectedMenus] = useState<SelectType[] | null>([]);
    const menus = useAppSelector((state) => state.menu.items);
    const dispatch = useAppDispatch();

    const onSuccess = () => {
        setSelectedMenus([]);
        setOpen(false);
    };

    const handleCreateMenuCategory = () => {
        if (!name || !selectedMenus?.length) {
            console.log("Field required!");
            return;
        }
        const menuIds = selectedMenus.map((selectedMenu) => selectedMenu.id);
        dispatch(createMenuCategory({ name, menuIds, onSuccess }));
    };

    if (!menus.length) return;

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
            <DialogTitle id="alert-dialog-title">Create Menu Category</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    onChange={(evt) => setName(evt.target.value)}
                />
                <MultipleSelectInput
                    items={menus}
                    inputLabel="menus"
                    values={selectedMenus}
                    setValues={setSelectedMenus}
                />
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={() => setOpen(false)} autoFocus>
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
