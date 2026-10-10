import ItemCard from "@/components/ItemCard";
import CreateLocation from "@/components/location/createLocation";
import { useAppSelector } from "@/store/hooks";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Button } from "@mui/material";
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
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 5, gap: 4 }}>
                {locations.map((location) => (
                    <ItemCard
                        key={location.id}
                        icon={<LocationOnIcon sx={{ fontSize: 40 }} />}
                        title={location.name}
                        href={`/backoffice/locations/${location.id}`}
                    />
                ))}
            </Box>
            <CreateLocation open={open} setOpen={setOpen} />
        </Box>
    );
};

export default LocationsPage;
