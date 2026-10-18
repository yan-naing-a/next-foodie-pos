import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createAddonCategory } from "@/store/slices/addonCategorySlice";
import { CreateAddonCategoryOption } from "@/types/addonCategory";
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
import { Dispatch, SetStateAction, useState } from "react";
import InputErrorMessage from "../InputErrorMessage";
import MultiSelectInput from "../selectInput/MultiSelectInput";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

interface SelectType {
    id: number;
    name: string;
}
const defaultAddonCategory: CreateAddonCategoryOption = {
    name: "",
    menuIds: [],
    isRequired: false,
};

const CreateAddonCategory = ({ open, setOpen }: Props) => {
    const [selectedMenus, setSelectedMenus] = useState<SelectType[] | null>([]);
    const [addonCategory, setAddonCategory] =
        useState<CreateAddonCategoryOption>(defaultAddonCategory);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    const menus = useAppSelector((state) => state.menu.items);
    const dispatch = useAppDispatch();

    const clearInput = () => {
        setAddonCategory(defaultAddonCategory);
        setSelectedMenus([]);
        setErrorMessage([]);
        setOpen(false);
    };

    const handleCreateAddonCategory = () => {
        if (!addonCategory.name || !selectedMenus?.length) {
            setErrorMessage([]);
            !addonCategory.name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            !selectedMenus?.length &&
                setErrorMessage((prevState) => [...prevState, "menus field required"]);
            return;
        }
        const menuIds = selectedMenus.map((selectedMenu) => selectedMenu.id);
        dispatch(
            createAddonCategory({
                ...addonCategory,
                menuIds,
                onSuccess: () => clearInput(),
            }),
        );
    };

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
            <DialogTitle id="alert-dialog-title">Create Addon Category</DialogTitle>
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    value={addonCategory.name}
                    onChange={(evt) => setAddonCategory({ ...addonCategory, name: evt.target.value })}
                />
                <MultiSelectInput
                    items={menus}
                    inputLabel="menus"
                    values={selectedMenus}
                    setValues={setSelectedMenus}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={addonCategory.isRequired}
                            onChange={(evt) =>
                                setAddonCategory({
                                    ...addonCategory,
                                    isRequired: evt.target.checked,
                                })
                            }
                        />
                    }
                    label="Required"
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
            </Box>
            <DialogActions sx={{ padding: 3 }}>
                <Button onClick={clearInput} autoFocus>
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
