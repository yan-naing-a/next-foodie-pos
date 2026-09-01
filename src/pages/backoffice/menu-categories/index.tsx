import CreateMenuCategory from "@/components/menuCategory/createMenuCategory";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
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
            <Box>
                {menuCategories.map((menuCategory) => (
                    <Typography variant="h5" key={menuCategory.id}>
                        {menuCategory.name}
                    </Typography>
                ))}
            </Box>
            <CreateMenuCategory open={open} setOpen={setOpen} />
        </Box>
    );
};

export default MenuCategoriesPage;
