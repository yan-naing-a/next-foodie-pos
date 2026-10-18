import SingleSelectInput from "@/components/selectInput/SingleSelectInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddon } from "@/store/slices/addonSlice";
import { UpdateAddonOption } from "@/types/addon";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SelectType {
    id: number;
    name: string;
}

const EditAddonPage = () => {
    const router = useRouter();
    const params = useParams();
    const addonId = params && Number(params.id);
    const dispatch = useAppDispatch();
    //addon
    const addons = useAppSelector((state) => state.addon.items);
    const addon = addons.find((item) => item.id === addonId);
    //addon categories
    const addonCategories = useAppSelector((state) => state.addonCategory.items);

    const [updatedAddon, setUpdatedAddon] = useState<UpdateAddonOption>();
    const [selectedAddonCategory, setSelectedAddonCategory] = useState<SelectType | null>(null);

    useEffect(() => {
        addon && updateAddon({ id: addonId, name: addon.name, price: addon.price });
        if (addonCategories.length && addon) {
            const singleAddonCategory = addonCategories.find((item) => item.id === addon.addonCategoryId);
            setSelectedAddonCategory(singleAddonCategory || null);
        }
    }, [addon, addonId, addonCategories]);

    // if not valid, return back
    if (!updatedAddon?.name || selectedAddonCategory === null) return;

    const onSuccess = () => router.push("/backoffice/addons");

    const handleUpdateAddon = () => {
        dispatch(
            updateAddon({
                ...updatedAddon,
                addonCategoryId: selectedAddonCategory.id,
                onSuccess,
            }),
        );
    };

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="error">
                    Delete
                </Button>
            </Box>
            <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <Typography variant="h5" sx={{ color: "text.secondary" }}>
                    Edit Addon
                </Typography>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    value={updatedAddon.name}
                    onChange={(evt) => setUpdatedAddon({ ...updatedAddon, name: evt.target.value })}
                />
                <TextField
                    id="price-input"
                    label="price"
                    variant="outlined"
                    type="number"
                    value={updatedAddon.price}
                    slotProps={{ htmlInput: { min: 0 } }}
                    onChange={(evt) => setUpdatedAddon({ ...updatedAddon, price: Number(evt.target.value) })}
                />
                <SingleSelectInput
                    items={addonCategories}
                    inputLabel="addon category"
                    value={selectedAddonCategory}
                    setValue={setSelectedAddonCategory}
                />
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/tables")}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleUpdateAddon}
                        disabled={
                            updatedAddon.name && updatedAddon.price !== undefined && updatedAddon.addonCategoryId
                                ? false
                                : true
                        }
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditAddonPage;
