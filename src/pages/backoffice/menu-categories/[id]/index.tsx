import RecommendingAlert from "@/components/RecommendingAlert";
import MultipleSelectInput from "@/components/selectInput/MultiSelectInput";
import WarningAlert from "@/components/WarningAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenuCategoryMenu } from "@/store/slices/menuCategoryMenuSlice";
import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
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
    //open delete menu category dialog
    const [open, setOpen] = useState<boolean>(false);
    //open recommending alert dialog
    const [openRecommending, setOpenRecommending] = useState<boolean>(false);
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
    //for menu move to another menu category
    const [movingData, setMovingData] = useState<{ parentId: number; childId: number }[]>([]);

    useEffect(() => {
        selectedMenus.length && setCurrentSelectedMenus(selectedMenus);
        const menuIds = selectedMenus.map((menu) => menu.id);
        menuCategory !== undefined &&
            setUpdatedMenuCategory({ id: menuCategory.id, name: menuCategory.name, menuIds });
    }, [menuCategory !== undefined, selectedMenus.length]);

    // check valid data, else return and render agains
    if (!updatedMenuCategory) return;

    const updateOnSuccess = () => {
        dispatch(setOpenSnackBar({ message: "Update menu category successfully!", severity: "info" }));
        router.push("/backoffice/menu-categories");
    };
    const deleteOnSuccess = () => {
        dispatch(setOpenSnackBar({ message: "Delete menu category successfully!", severity: "error" }));
        router.push("/backoffice/menu-categories");
    };

    // could be delete permanently single menu

    // update part

    const saveMenuCategory = () => {
        const menuIds = currentSelectedMenus?.map((menu) => menu.id);
        dispatch(
            updateMenuCategory({
                ...updatedMenuCategory,
                menuIds,
                onSuccess: updateOnSuccess,
            }),
        );
    };

    let menusConnectWithOneMenuCategory: SelectType[] = [];

    const handleUpdateMenuCategory = () => {
        menusConnectWithOneMenuCategory = selectedMenus
            .filter(
                (selectedMenu) =>
                    menuCategoryMenus.filter((item) => item.menuId === selectedMenu.id).length === 1,
            )
            .filter((item) => !currentSelectedMenus?.find((csm) => csm.id === item.id));

        if (menusConnectWithOneMenuCategory.length && !openRecommending) {
            setOpenRecommending(true);
            return;
        }

        if (movingData.length) {
            dispatch(
                updateMenuCategoryMenu({
                    items: movingData.map((item) => ({
                        menuId: item.childId,
                        menuCategoryId: item.parentId,
                    })),
                    onSuccess: () => {
                        setMovingData([]);
                        saveMenuCategory();
                    },
                }),
            );
            return;
        }

        saveMenuCategory();
    };

    // delete part
    const menusInOneMenuCategory = selectedMenus.filter(
        (selectedMenu) =>
            menuCategoryMenus.filter((item) => item.menuId === selectedMenu.id).length === 1,
    );

    const handleDeleteMenuCategory = () => {
        if (menusInOneMenuCategory.length && !openRecommending) {
            setOpenRecommending(true);
            return;
        }
        //dispatch(deleteMenuCategory({ id: menuCategoryId, onSuccess: deleteOnSuccess }));
    };

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="error" onClick={() => setOpen(true)}>
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
            {!!menusConnectWithOneMenuCategory.length && (
                <RecommendingAlert
                    open={openRecommending}
                    setOpen={setOpenRecommending}
                    mainItems={menusConnectWithOneMenuCategory}
                    movingData={movingData}
                    setMovingData={setMovingData}
                    selectInput={{
                        items: menuCategories
                            .filter((item) => item.id !== menuCategoryId)
                            .map((item) => ({ id: item.id, name: item.name })),
                        label: "menu categories",
                    }}
                    handleData={handleUpdateMenuCategory}
                />
            )}
            <WarningAlert
                open={open}
                setOpen={setOpen}
                label={updatedMenuCategory.name}
                handleDeleteData={handleDeleteMenuCategory}
            />
        </Box>
    );
};

export default EditMenuCategoryPage;
