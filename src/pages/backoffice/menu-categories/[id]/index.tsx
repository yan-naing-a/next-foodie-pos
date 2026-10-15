import MultipleSelectInput from "@/components/selectInput/MultiSelectInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import { UpdateMenuCategoryOption } from "@/types/menuCategory";
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
            if (!selectedMenu || selectedMenu.id === undefined || !selectedMenu.name) return [];
            return [{ id: selectedMenu.id, name: selectedMenu.name }];
        });
    const [currentSelectedMenus, setCurrentSelectedMenus] = useState<SelectType[] | null>([]);
    const [updatedMenuCategory, setUpdatedMenuCategory] = useState<UpdateMenuCategoryOption>();

    useEffect(() => {
        selectedMenus.length && setCurrentSelectedMenus(selectedMenus);
        const menuIds = selectedMenus.map((menu) => menu.id);
        menuCategory !== undefined &&
            setUpdatedMenuCategory({ id: menuCategory.id, name: menuCategory.name, menuIds });
    }, [menuCategory !== undefined, selectedMenus.length]);

    // check valid data, else return and render agains
    if (!updatedMenuCategory) return;

    const onSuccess = () => router.push("/backoffice/menu-categories");

    const handleUpdateMenuCategory = () => {
        const menuIds = currentSelectedMenus?.map((menu) => menu.id);
        dispatch(updateMenuCategory({ ...updatedMenuCategory, menuIds, onSuccess }));
    };

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
                    value={updatedMenuCategory.name}
                    onChange={(evt) =>
                        setUpdatedMenuCategory({ ...updatedMenuCategory, name: evt.target.value })
                    }
                />
                <MultipleSelectInput
                    items={menus}
                    inputLabel="menus"
                    values={currentSelectedMenus}
                    setValues={setCurrentSelectedMenus}
                />
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/menu-categories")}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleUpdateMenuCategory}
                        disabled={updateMenuCategory.name ? false : true}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditMenuCategoryPage;
