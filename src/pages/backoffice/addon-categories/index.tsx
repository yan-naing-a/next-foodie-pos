import CreateAddonCategory from "@/components/addonCategory/createAddonCategory";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import ClassIcon from "@mui/icons-material/Class";
import { Box, Button } from "@mui/material";
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
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 5, gap: 4 }}>
                {addonCategories.map((addonCategory) => (
                    <ItemCard
                        key={addonCategory.id}
                        icon={<ClassIcon sx={{ fontSize: 40 }} />}
                        title={addonCategory.name}
                        href={`/backoffice/addon-categories/${addonCategory.id}`}
                    />
                ))}
            </Box>
            <CreateAddonCategory open={open} setOpen={setOpen} />
        </Box>
    );
};

export default AddonCategoriesPage;
