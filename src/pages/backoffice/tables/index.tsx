import CreateTable from "@/components/table/createTable";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const TablesPage = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create table
                </Button>
            </Box>
            <h1>Tables Page</h1>
            <CreateTable open={open} setOpen={setOpen} />
        </Box>
    );
};

export default TablesPage;
