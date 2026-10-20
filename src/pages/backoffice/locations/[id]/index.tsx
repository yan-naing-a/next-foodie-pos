import WarningAlert from "@/components/WarningAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteLocation, updateLocation } from "@/store/slices/locationSlice";
import { UpdateLocationOption } from "@/types/location";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditLocationPage = () => {
    const router = useRouter();
    const params = useParams();
    const locationId = params && Number(params.id);
    const dispatch = useAppDispatch();
    //open delete location dialog
    const [open, setOpen] = useState<boolean>(false);
    //location
    const locations = useAppSelector((state) => state.location.items);
    const location = locations.find((item) => item.id === locationId);

    const [updatedLocation, setUpdatedLocation] = useState<UpdateLocationOption>();

    useEffect(() => {
        if (location) setUpdatedLocation(location);
    }, [location, locationId]);

    // if not valid, return back
    if (!updatedLocation) return;

    const onSuccess = () => router.push("/backoffice/locations");

    const handleUpdateLocation = () => dispatch(updateLocation({ ...updatedLocation, onSuccess }));

    const handleDeleteLocation = () => dispatch(deleteLocation({ id: locationId, onSuccess }));

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="error" onClick={() => setOpen(true)}>
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
            <WarningAlert
                open={open}
                setOpen={setOpen}
                label={updatedLocation.name}
                handleDeleteData={handleDeleteLocation}
            />
        </Box>
    );
};

export default EditLocationPage;
