import CreateLocation from "@/components/location/createLocation";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const LocationsPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const locations = useAppSelector((state) => state.location.items);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create location
                </Button>
            </Box>
            <Box>
                {locations.map((location) => (
                    <Typography variant="h5" key={location.id}>
                        {location.name}
                    </Typography>
                ))}
            </Box>
            <CreateLocation open={open} setOpen={setOpen} />
        </Box>
    );
};

export default LocationsPage;
