import InputErrorMessage from "@/components/InputErrorMessage";
import MultipleSelectInput from "@/components/selectInput/MultiSelectInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenu } from "@/store/slices/menuSlice";
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
    //menuCategory
    const menus = useAppSelector((state) => state.menu.items);
    const menu = menus.find((item) => item.id === menuId);
    //selected Menu Categories
    const menuCategories = useAppSelector((state) => state.menuCategory.items);
    const menuCategoryMenus = useAppSelector((state) => state.menuCategoryMenu.items);
    const selectedMenuCategories: SelectType[] = menuCategoryMenus
        .filter((item) => item.menuId === menuId)
        .flatMap((item) => {
            const selectedMenuCategory = menuCategories.find(
                (menuCategory) => menuCategory.id === item.menuCategoryId,
            );

            if (
                !selectedMenuCategory ||
                selectedMenuCategory.id === undefined ||
                !selectedMenuCategory.name
            ) {
                return [];
            }

            return [{ id: selectedMenuCategory.id, name: selectedMenuCategory.name }];
        });
    //selected addon Categories
    const addonCategories = useAppSelector((state) => state.addonCategory.items);
    const menuAddonCategories = useAppSelector((state) => state.menuAddonCategory.items);
    const selectedAddonCategories: SelectType[] = menuAddonCategories
        .filter((item) => item.menuId === menuId)
        .flatMap((item) => {
            const selectedAddonCategory = addonCategories.find(
                (addonCategory) => addonCategory.id === item.addonCategoryId,
            );

            if (
                !selectedAddonCategory ||
                selectedAddonCategory.id === undefined ||
                !selectedAddonCategory.name
            ) {
                return [];
            }

            return [{ id: selectedAddonCategory.id, name: selectedAddonCategory.name }];
        });

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>("");
    const [assetUrl, setAssetUrl] = useState<string>("");
    const [currentSelectedMenuCategories, setCurrentSelectedMenuCategories] = useState<
        SelectType[] | null
    >([]);
    const [currentSelectedAddonCategories, setCurrentSelectedAddonCategories] = useState<
        SelectType[] | null
    >([]);

    useEffect(() => {
        if (menu) {
            setName(menu.name);
            setPrice(menu.price);
            setDescription(() => menu.description || "");
            setAssetUrl(() => menu.assetUrl || "");
        }
        setCurrentSelectedMenuCategories(selectedMenuCategories);
        setCurrentSelectedAddonCategories(selectedAddonCategories);
    }, [menu?.name, menuId, menuCategoryMenus, menuCategories, addonCategories, menuAddonCategories]);

    const onSuccess = () => {
        router.push("/backoffice/menus");
    };

    const handleUpdateMenu = () => {
        if (
            !name ||
            price === undefined ||
            !currentSelectedMenuCategories ||
            !currentSelectedMenuCategories.length
        ) {
            setErrorMessage([]);
            !name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            price === undefined && setErrorMessage((prevState) => [...prevState, "invalid price field"]);
            !currentSelectedMenuCategories?.length &&
                setErrorMessage((prevState) => [...prevState, "menu categories field required"]);
            return;
        } else {
            const menuCategoryIds = currentSelectedMenuCategories?.map((MenuCategory) => MenuCategory.id);
            if (selectedAddonCategories?.length) {
                const addonCategoryIds = currentSelectedAddonCategories?.map(
                    (addonCategory) => addonCategory.id,
                );
                const menuData = {
                    id: menuId,
                    name,
                    price,
                    description,
                    assetUrl,
                    menuCategoryIds,
                    addonCategoryIds,
                    onSuccess,
                };
                dispatch(updateMenu(menuData));
            } else {
                dispatch(
                    updateMenu({
                        id: menuId,
                        name,
                        price,
                        description,
                        assetUrl,
                        menuCategoryIds,
                        onSuccess,
                    }),
                );
            }
        }
    };

    if (!name || !currentSelectedMenuCategories) return;

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
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                />
                <TextField
                    id="price-input"
                    label="price"
                    variant="outlined"
                    value={price}
                    type="number"
                    slotProps={{ htmlInput: { min: 0 } }}
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
                    <Button variant="outlined" onClick={() => router.push("/backoffice/menu-categories")}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleUpdateMenu}>
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditMenuPage;
