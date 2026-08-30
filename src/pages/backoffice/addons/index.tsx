import CreateAddon from "@/components/addon/createAddon";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const AddonsPage = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create addon
                </Button>
            </Box>
            <h1>Addons Page</h1>
            <CreateAddon open={open} setOpen={setOpen} />
        </Box>
    );
};

export default AddonsPage;
