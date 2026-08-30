import CreateLocation from "@/components/location/createLocation";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const LocationsPage = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create location
                </Button>
            </Box>
            <h1>Locations Page</h1>
            <CreateLocation open={open} setOpen={setOpen} />
        </Box>
    );
};

export default LocationsPage;
