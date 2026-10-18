import InputErrorMessage from "@/components/InputErrorMessage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateLocation } from "@/store/slices/locationSlice";
import { UpdateLocationOption } from "@/types/location";
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

    // const [name, setName] = useState<string>("");
    // const [address, setAddress] = useState<string>("");
    const [updatedLocation, setUpdatedLocation] = useState<UpdateLocationOption>();

    useEffect(() => {
        if (location) setUpdatedLocation(location);
    }, [location, locationId]);

    // if not valid, return back
    if (!updatedLocation) return;

    const onSuccess = () => router.push("/backoffice/locations");

    const handleUpdateLocation = () => {
        if (!updatedLocation.name || !updatedLocation.address) {
            setErrorMessage([]);
            !updatedLocation.name &&
                setErrorMessage((prevState) => [...prevState, "name field required"]);
            !updatedLocation.address &&
                setErrorMessage((prevState) => [...prevState, "address field required"]);
            return;
        }

        dispatch(updateLocation({ ...updatedLocation, onSuccess }));
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
                    Edit Location
                </Typography>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    value={updatedLocation.name}
                    onChange={(e) => setUpdatedLocation({ ...updatedLocation, name: e.target.value })}
                />
                <TextField
                    id="address-input"
                    label="address"
                    variant="outlined"
                    value={updatedLocation.address}
                    onChange={(e) => setUpdatedLocation({ ...updatedLocation, address: e.target.value })}
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/locations")}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleUpdateLocation}
                        disabled={updatedLocation.name && updatedLocation.address ? false : true}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditLocationPage;
