import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonCategory } from "@/store/slices/addonCategorySlice";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    FormControlLabel,
    Switch,
    TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MultiSelectInput from "../selectInput/MultiSelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectType {
    id: number;
    name: string;
}

const CreateAddonCategory = ({ open, setOpen }: Props) => {
    const [name, setName] = useState<string | null>(null);
    const [selectedMenus, setSelectedMenus] = useState<SelectType[] | null>(null);
    const [isRequired, setIsRequired] = useState<boolean>(false);
    const menus = useAppSelector((state) => state.menu.items);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (menus.length) {
            const { id, name } = menus[0];
            setSelectedMenus([{ id, name }]);
        }
    }, [menus]);

    const onSuccess = () => {
        setOpen(false);
    };

    const handleCreateAddonCategory = () => {
        if (!name || !selectedMenus?.length) {
            console.log("Field required!");
            return;
        }
        const selectedMenuIds = selectedMenus.map((selectedMenu) => selectedMenu.id);
        dispatch(createAddonCategory({ name, menuIds: selectedMenuIds, isRequired, onSuccess }));
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
            <DialogTitle id="alert-dialog-title">Create Addon Category</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    onChange={(evt) => setName(evt.target.value)}
                />
                <MultiSelectInput
                    items={menus}
                    inputLabel="menus"
                    values={selectedMenus}
                    setValues={setSelectedMenus}
                />
                <FormControlLabel
                    control={<Switch onChange={(evt) => setIsRequired(evt.target.checked)} />}
                    label="Required"
                />
            </Box>
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
