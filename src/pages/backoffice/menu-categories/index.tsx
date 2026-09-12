import ItemCard from "@/components/ItemCard";
import CreateMenuCategory from "@/components/menuCategory/createMenuCategory";
import { useAppSelector } from "@/store/hooks";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategoriesPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const menuCategories = useAppSelector((state) => state.menuCategory.items);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create menu category
                </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 5, gap: 4 }}>
                {menuCategories.map((menuCategory) => (
                    <ItemCard
                        key={menuCategory.id}
                        icon={<CategoryIcon sx={{ fontSize: 40 }} />}
                        title={menuCategory.name}
                    />
                ))}
            </Box>
            <CreateMenuCategory open={open} setOpen={setOpen} />
        </Box>
    );
};

export default MenuCategoriesPage;
