import InputErrorMessage from "@/components/InputErrorMessage";
import MultiSelectInput from "@/components/selectInput/MultiSelectInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddonCategory } from "@/store/slices/addonCategorySlice";
import { Box, Button, FormControlLabel, Switch, TextField, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SelectType {
    id: number;
    name: string;
}

const EditAddonCategoryPage = () => {
    const router = useRouter();
    const params = useParams();
    const addonCategoryId = params && Number(params.id);
    const dispatch = useAppDispatch();
    //error message
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    //addon category
    const addonCategories = useAppSelector((state) => state.addonCategory.items);
    const addonCategory = addonCategories.find((item) => item.id === addonCategoryId);
    //selected Menus
    const menus = useAppSelector((state) => state.menu.items);
    const menuAddonCategories = useAppSelector((state) => state.menuAddonCategory.items);
    const selectedMenus: SelectType[] = menuAddonCategories
        .filter((item) => item.addonCategoryId === addonCategoryId)
        .flatMap((item) => {
            const selectedMenu = menus.find((menu) => menu.id === item.menuId);
            if (!selectedMenu || selectedMenu.id === undefined || !selectedMenu.name) {
                return [];
            }
            return [{ id: selectedMenu.id, name: selectedMenu.name }];
        });

    const [name, setName] = useState<string>("");
    const [isRequired, setIsRequired] = useState<boolean>(false);
    const [currentSelectedMenus, setCurrentSelectedMenus] = useState<SelectType[] | null>([]);

    useEffect(() => {
        if (addonCategory) {
            setName(addonCategory.name);
            setIsRequired(addonCategory.isRequired);
        }
        setCurrentSelectedMenus(selectedMenus);
    }, [addonCategory?.name, addonCategoryId, menuAddonCategories, menus]);

    const onSuccess = () => {
        router.push("/backoffice/addon-categories");
    };

    const handleUpdateMenuCategory = () => {
        if (!name || !currentSelectedMenus?.length) {
            setErrorMessage([]);
            !name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            !currentSelectedMenus?.length &&
                setErrorMessage((prevState) => [...prevState, "menus field required"]);
            return;
        }
        const menuIds = currentSelectedMenus?.map((menu) => menu.id);
        dispatch(updateAddonCategory({ id: addonCategoryId, name, menuIds, isRequired, onSuccess }));
    };

    if (!name || !currentSelectedMenus) return;

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="error">
                    Delete
                </Button>
            </Box>
            <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <Typography variant="h5" sx={{ color: "text.secondary" }}>
                    Edit Addon Category
                </Typography>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                />
                <MultiSelectInput
                    items={menus}
                    inputLabel="menus"
                    values={currentSelectedMenus}
                    setValues={setCurrentSelectedMenus}
                />
                <FormControlLabel
                    control={
                        <Switch checked={isRequired} onChange={(evt) => setIsRequired(evt.target.checked)} />
                    }
                    label="Required"
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/addon-categories")}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleUpdateMenuCategory}>
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditAddonCategoryPage;
