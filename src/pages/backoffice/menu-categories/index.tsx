import CreateMenuCategory from "@/components/menuCategory/createMenuCategory";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategoriesPage = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create menu category
                </Button>
            </Box>
            <h1>Menu Categories Page</h1>
            <CreateMenuCategory open={open} setOpen={setOpen} />
        </Box>
    );
};

export default MenuCategoriesPage;
