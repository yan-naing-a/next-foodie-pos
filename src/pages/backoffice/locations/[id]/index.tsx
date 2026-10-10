import InputErrorMessage from "@/components/InputErrorMessage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateLocation } from "@/store/slices/locationSlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SelectType {
    id: number;
    name: string;
}

const EditLocationPage = () => {
    const router = useRouter();
    const params = useParams();
    const locationId = params && Number(params.id);
    const dispatch = useAppDispatch();
    //error message
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    //location
    const locations = useAppSelector((state) => state.location.items);
    const location = locations.find((item) => item.id === locationId);

    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        if (location) {
            setName(location.name);
            setAddress(location.address);
        }
    }, [location?.name, locationId]);

    const onSuccess = () => {
        router.push("/backoffice/locations");
    };

    const handleUpdateLocation = () => {
        if (!name || !address) {
            setErrorMessage([]);
            !name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            !address && setErrorMessage((prevState) => [...prevState, "address field required"]);
            return;
        } else {
            dispatch(
                updateLocation({
                    id: locationId,
                    name,
                    address,
                    onSuccess,
                }),
            );
        }
    };

    if (!name || !address) return;

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="error">
                    Delete
                </Button>
            </Box>
            <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <Typography variant="h5" sx={{ color: "text.secondary" }}>
                    Edit Location
                </Typography>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    id="address-input"
                    label="address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/locations")}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleUpdateLocation}>
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditLocationPage;
