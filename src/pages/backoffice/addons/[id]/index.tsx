import InputErrorMessage from "@/components/InputErrorMessage";
import SingleSelectInput from "@/components/selectInput/SingleSelectInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddon } from "@/store/slices/addonSlice";
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
    //error message
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    //addon
    const addons = useAppSelector((state) => state.addon.items);
    const addon = addons.find((item) => item.id === addonId);
    //addon categories
    const addonCategories = useAppSelector((state) => state.addonCategory.items);

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>();
    const [selectedAddonCategory, setSelectedAddonCategory] = useState<SelectType | null>(null);

    useEffect(() => {
        if (addon) {
            setName(addon.name);
            setPrice(addon.price);
        }
        if (addonCategories.length && addon) {
            setSelectedAddonCategory(
                addonCategories.find((item) => item.id === addon.addonCategoryId) || null,
            );
        }
    }, [addon?.name, addonId, addonCategories]);

    const onSuccess = () => {
        router.push("/backoffice/addons");
    };

    const handleUpdateAddon = () => {
        if (!name || price === undefined || selectedAddonCategory === null) {
            setErrorMessage([]);
            !name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            price === undefined && setErrorMessage((prevState) => [...prevState, "price field required"]);
            !selectedAddonCategory &&
                setErrorMessage((prevState) => [...prevState, "addon category field required"]);
            return;
        } else {
            dispatch(
                updateAddon({
                    id: addonId,
                    name,
                    price,
                    addonCategoryId: selectedAddonCategory.id,
                    onSuccess,
                }),
            );
        }
    };

    if (!name || selectedAddonCategory === null) return;

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
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                />
                <TextField
                    id="price-input"
                    label="price"
                    variant="outlined"
                    type="number"
                    value={price}
                    slotProps={{ htmlInput: { min: 0 } }}
                    onChange={(evt) => setPrice(Number(evt.target.value))}
                />
                <SingleSelectInput
                    items={addonCategories}
                    inputLabel="addon category"
                    value={selectedAddonCategory}
                    setValue={setSelectedAddonCategory}
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/tables")}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleUpdateAddon}>
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditAddonPage;
