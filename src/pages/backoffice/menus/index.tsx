import CreateMenu from "@/components/menu/createMenu";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const MenusPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const menus = useAppSelector((state) => state.menu.items);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create menu
                </Button>
            </Box>
            <Box>
                {menus.map((menu) => (
                    <Typography variant="h5" key={menu.id}>
                        {menu.name}
                    </Typography>
                ))}
            </Box>
            <CreateMenu open={open} setOpen={setOpen} />
        </Box>
    );
};

export default MenusPage;
