import InputErrorMessage from "@/components/InputErrorMessage";
import MultipleSelectInput from "@/components/selectInput/MultiSelectInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenu } from "@/store/slices/menuSlice";
import { UpdateMenuOption } from "@/types/menu";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SelectType {
    id: number;
    name: string;
}

const EditMenuPage = () => {
    const router = useRouter();
    const params = useParams();
    const menuId = params && Number(params.id);
    const dispatch = useAppDispatch();
    //error message
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    //menu
    const menus = useAppSelector((state) => state.menu.items);
    const menu = menus.find((item) => item.id === menuId);
    const menuCategories = useAppSelector((state) => state.menuCategory.items);
    const menuCategoryMenus = useAppSelector((state) => state.menuCategoryMenu.items);
    const addonCategories = useAppSelector((state) => state.addonCategory.items);
    const menuAddonCategories = useAppSelector((state) => state.menuAddonCategory.items);
    //menuCategory
    const selectedMenuCategories = menuCategoryMenus
        .filter((item) => item.menuId === menuId)
        .flatMap((item) => {
            const category = menuCategories.find(
                (menuCategory) => menuCategory.id === item.menuCategoryId,
            );
            return category !== undefined ? [{ id: category.id, name: category.name }] : [];
        });
    //addonCategory
    const selectedAddonCategories = menuAddonCategories
        .filter((item) => item.menuId === menuId)
        .flatMap((item) => {
            const category = addonCategories.find(
                (addonCategory) => addonCategory.id === item.addonCategoryId,
            );
            return category !== undefined ? [{ id: category.id, name: category.name }] : [];
        });

    const [updatedMenu, setUpdateMenu] = useState<UpdateMenuOption>();
    const [currentSelectedMenuCategories, setCurrentSelectedMenuCategories] = useState<
        SelectType[] | null
    >([]);
    const [currentSelectedAddonCategories, setCurrentSelectedAddonCategories] = useState<
        SelectType[] | null
    >([]);

    useEffect(() => {
        selectedMenuCategories.length && setCurrentSelectedMenuCategories(selectedMenuCategories);
        selectedAddonCategories.length && setCurrentSelectedAddonCategories(selectedAddonCategories);
        menu !== undefined &&
            setUpdateMenu({
                id: menu.id,
                name: menu.name,
                price: menu.price,
                description: menu.description ?? "",
                assetUrl: menu.assetUrl ?? "",
                menuCategoryIds: selectedMenuCategories.map((item) => item.id),
                addonCategoryIds: selectedAddonCategories.map((item) => item.id),
            });
    }, [menu !== undefined, selectedMenuCategories.length, selectedAddonCategories.length]);

    // if not updateMenu, return back
    if (updatedMenu === undefined || !currentSelectedMenuCategories) return;

    const handleUpdateMenu = () => {
        const menuCategoryIds = currentSelectedMenuCategories?.map((item) => item.id);
        const addonCategoryIds = currentSelectedAddonCategories?.map((item) => item.id);
        if (!menuCategoryIds) return;
        dispatch(
            updateMenu({
                ...updatedMenu,
                menuCategoryIds,
                addonCategoryIds,
                onSuccess: () => router.push("/backoffice/menus"),
            }),
        );
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
                    Edit Menu
                </Typography>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    value={updatedMenu.name}
                    onChange={(evt) => setUpdateMenu({ ...updatedMenu, name: evt.target.value })}
                />
                <TextField
                    id="price-input"
                    label="price"
                    variant="outlined"
                    value={updatedMenu.price}
                    type="number"
                    slotProps={{ htmlInput: { min: 0 } }}
                    onChange={(evt) => setUpdateMenu({ ...updatedMenu, price: Number(evt.target.value) })}
                />
                <TextField
                    id="description-input"
                    label="description"
                    multiline
                    value={updatedMenu.description}
                    rows={3}
                    onChange={(evt) => setUpdateMenu({ ...updatedMenu, description: evt.target.value })}
                />
                <Typography variant="body1">There must be image upload</Typography>
                {/* menu category */}
                <MultipleSelectInput
                    items={menuCategories}
                    inputLabel="menu categories"
                    values={currentSelectedMenuCategories}
                    setValues={setCurrentSelectedMenuCategories}
                />
                {/* addon category */}
                <MultipleSelectInput
                    items={addonCategories}
                    inputLabel="addon categories"
                    values={currentSelectedAddonCategories}
                    setValues={setCurrentSelectedAddonCategories}
                />
                {!!errorMessage && <InputErrorMessage errorMessage={errorMessage} />}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/menus")}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        disabled={
                            updatedMenu.name &&
                                updatedMenu.price !== undefined &&
                                currentSelectedMenuCategories.length
                                ? false
                                : true
                        }
                        onClick={handleUpdateMenu}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditMenuPage;
