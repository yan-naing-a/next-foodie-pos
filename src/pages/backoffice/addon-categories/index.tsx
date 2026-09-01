import CreateAddonCategory from "@/components/addonCategory/createAddonCategory";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const AddonCategoriesPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const addonCategories = useAppSelector((state) => state.addonCategory.items);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create addon category
                </Button>
            </Box>
            <Box>
                {addonCategories.map((addonCategory) => (
                    <Typography variant="h5" key={addonCategory.id}>
                        {addonCategory.name}
                    </Typography>
                ))}
            </Box>
            <CreateAddonCategory open={open} setOpen={setOpen} />
        </Box>
    );
};

export default AddonCategoriesPage;
