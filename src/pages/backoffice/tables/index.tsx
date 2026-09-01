import CreateTable from "@/components/table/createTable";
import { useAppSelector } from "@/store/hooks";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

const TablesPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const tables = useAppSelector((state) => state.table.items);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create table
                </Button>
            </Box>
            <Box>
                {tables.map((table) => (
                    <Typography variant="h5" key={table.id}>
                        {table.name}
                    </Typography>
                ))}
            </Box>
            <CreateTable open={open} setOpen={setOpen} />
        </Box>
    );
};

export default TablesPage;
