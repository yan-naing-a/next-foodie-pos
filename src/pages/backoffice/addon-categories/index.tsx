import CreateAddonCategory from "@/components/addonCategory/createAddonCategory";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AddonCategoriesPage = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create addon category
                </Button>
            </Box>
            <h1>Addon Categories Page</h1>
            <CreateAddonCategory open={open} setOpen={setOpen} />
        </Box>
    );
};

export default AddonCategoriesPage;
