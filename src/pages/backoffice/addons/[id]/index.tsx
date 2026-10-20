import SingleSelectInput from "@/components/selectInput/SingleSelectInput";
import WarningAlert from "@/components/WarningAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddon, updateAddon } from "@/store/slices/addonSlice";
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
    //open delete addon dialog
    const [open, setOpen] = useState<boolean>(false);
    //addon
    const addons = useAppSelector((state) => state.addon.items);
    const addon = addons.find((item) => item.id === addonId);
    //addon categories
    const addonCategories = useAppSelector((state) => state.addonCategory.items);
    const addonCategory = addonCategories.find((item) => item.id === addon?.addonCategoryId);

    const [updatedAddon, setUpdatedAddon] = useState<UpdateAddonOption>();
    const [selectedAddonCategory, setSelectedAddonCategory] = useState<SelectType | null>(null);

    useEffect(() => {
        console.log("Hello world");
        addon && setUpdatedAddon({ id: addonId, name: addon.name, price: addon.price });
        addonCategory && setSelectedAddonCategory(addonCategory);
    }, [addon, addonId, addonCategories, addonCategory]);

    // if not valid, return back
    if (!updatedAddon || !selectedAddonCategory) return;

    const onSuccess = () => router.push("/backoffice/addons");

    const handleUpdateAddon = () => {
        dispatch(
            updateAddon({ ...updatedAddon, addonCategoryId: selectedAddonCategory.id, onSuccess }),
        );
    };

    const handleDeleteAddon = () => dispatch(deleteAddon({ id: addonId, onSuccess }));

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="error" onClick={() => setOpen(true)}>
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
                            updatedAddon.name && updatedAddon.price !== undefined && selectedAddonCategory
                                ? false
                                : true
                        }
                    >
                        Update
                    </Button>
                </Box>
            </Box>
            <WarningAlert
                open={open}
                setOpen={setOpen}
                label={updatedAddon.name}
                handleDeleteData={handleDeleteAddon}
            />
        </Box>
    );
};

export default EditAddonPage;
