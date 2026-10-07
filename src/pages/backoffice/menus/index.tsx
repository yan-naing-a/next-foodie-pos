import ItemCard from "@/components/ItemCard";
import CreateMenu from "@/components/menu/createMenu";
import { useAppSelector } from "@/store/hooks";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Box, Button } from "@mui/material";
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
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 5, gap: 4 }}>
                {menus.map((menu) => (
                    <ItemCard
                        key={menu.id}
                        icon={<RestaurantMenuIcon sx={{ fontSize: 40 }} />}
                        title={menu.name}
                        assetUrl={menu.assetUrl}
                        href={`/backoffice/menus/${menu.id}`}
                    />
                ))}
            </Box>

            <CreateMenu open={open} setOpen={setOpen} />
        </Box>
    );
};

export default MenusPage;
