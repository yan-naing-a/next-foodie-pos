import DarkModeSwitch from "@/components/DarkModeSwitch";
import { useAppSelector } from "@/store/hooks";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Location } from "../../../../generated/prisma/client";

const SettingsPage = () => {
    const company = useAppSelector((state) => state.company.items);
    const locations = useAppSelector((state) => state.location.items);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    useEffect(() => {
        if (!locations.length) {
            setSelectedLocation(null);
            return;
        }

        const storedLocationId = localStorage.getItem("selectedLocationId");
        const storedLocation = storedLocationId
            ? locations.find((location) => location.id === Number(storedLocationId))
            : undefined;
        const location = storedLocation ?? locations[0];

        setSelectedLocation(location);
        localStorage.setItem("selectedLocationId", String(location.id));
    }, [locations]);

    const handleChange = (value: number) => {
        const currentLocation = locations.find((location) => location.id === value);
        if (currentLocation) {
            setSelectedLocation(currentLocation);
            localStorage.setItem("selectedLocationId", String(value));
        }
    };

    if (!company.length || !selectedLocation) return null;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Box>
                <Typography variant="h4">{company[0].name}</Typography>
            </Box>
            <Box sx={{ width: 500 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    Select location
                </Typography>
                <div>
                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-name-label">location</InputLabel>
                        <Select
                            labelId="demo-single-name-label"
                            id="demo-single-name"
                            value={selectedLocation.id}
                            onChange={(evt) => handleChange(Number(evt.target.value))}
                            input={<OutlinedInput label="location" />}
                        >
                            {locations.map((location) => (
                                <MenuItem key={location.id} value={location.id}>
                                    {location.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </Box>
            <Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                    Dark mode
                </Typography>
                <DarkModeSwitch />
            </Box>
        </Box>
    );
};

export default SettingsPage;
