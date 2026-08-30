import CreateMenu from "@/components/menu/createMenu";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenusPage = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create menu
                </Button>
            </Box>
            <h1>Menus Page</h1>
            <CreateMenu open={open} setOpen={setOpen} />
        </Box>
    );
};

export default MenusPage;
