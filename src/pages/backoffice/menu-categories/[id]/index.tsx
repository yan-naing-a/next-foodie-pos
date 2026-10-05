import InputErrorMessage from "@/components/InputErrorMessage";
import MultipleSelectInput from "@/components/selectInput/MultiSelectInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SelectType {
    id: number;
    name: string;
}

const EditMenuCategoryPage = () => {
    const router = useRouter();
    const params = useParams();
    const menuCategoryId = params && Number(params.id);
    const dispatch = useAppDispatch();
    //error message
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    //menuCategory
    const menuCategories = useAppSelector((state) => state.menuCategory.items);
    const menuCategory = menuCategories.find((item) => item.id === menuCategoryId);
    //selected Menus
    const menus = useAppSelector((state) => state.menu.items);
    const menuCategoryMenus = useAppSelector((state) => state.menuCategoryMenu.items);
    const selectedMenus: SelectType[] = menuCategoryMenus
        .filter((item) => item.menuCategoryId === menuCategoryId)
        .flatMap((item) => {
            const selectedMenu = menus.find((menu) => menu.id === item.menuId);

            if (!selectedMenu || selectedMenu.id === undefined || !selectedMenu.name) {
                return [];
            }

            return [{ id: selectedMenu.id, name: selectedMenu.name }];
        });

    const [name, setName] = useState<string>("");
    const [currentSelectedMenus, setCurrentSelectedMenus] = useState<SelectType[] | null>([]);

    useEffect(() => {
        menuCategory && setName(menuCategory.name);
        setCurrentSelectedMenus(selectedMenus);
    }, [menuCategory?.name, menuCategoryId, menuCategoryMenus, menus]);

    const onSuccess = () => {
        router.push("/backoffice/menu-categories");
    };

    const handleUpdateMenuCategory = () => {
        if (!name) {
            setErrorMessage([]);
            !name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            return;
        }
        const menuIds = currentSelectedMenus?.map((menu) => menu.id);
        dispatch(updateMenuCategory({ id: menuCategoryId, name, menuIds, onSuccess }));
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
                    Edit Menu Category
                </Typography>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                />
                <MultipleSelectInput
                    items={menus}
                    inputLabel="menus"
                    values={currentSelectedMenus}
                    setValues={setCurrentSelectedMenus}
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/menu-categories")}>
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

export default EditMenuCategoryPage;
