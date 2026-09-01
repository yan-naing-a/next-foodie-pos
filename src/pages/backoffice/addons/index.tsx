import CreateAddon from "@/components/addon/createAddon";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
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
            <Box>
                {addons.map((addon) => (
                    <Typography variant="h5" key={addon.id}>
                        {addon.name}
                    </Typography>
                ))}
            </Box>
            <CreateAddon open={open} setOpen={setOpen} />
        </Box>
    );
};

export default AddonsPage;
