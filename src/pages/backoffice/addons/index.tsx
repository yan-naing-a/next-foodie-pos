import CreateAddon from "@/components/addon/createAddon";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AddonsPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const addons = useAppSelector((state) => state.addon.items);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create addon
                </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 5, gap: 4 }}>
                {addons.map((addon) => (
                    <ItemCard key={addon.id} icon={<EggIcon sx={{ fontSize: 40 }} />} title={addon.name} />
                ))}
            </Box>
            <CreateAddon open={open} setOpen={setOpen} />
        </Box>
    );
};

export default AddonsPage;
