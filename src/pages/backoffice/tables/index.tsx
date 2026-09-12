import ItemCard from "@/components/ItemCard";
import CreateTable from "@/components/table/createTable";
import { useAppSelector } from "@/store/hooks";
import TableBarIcon from "@mui/icons-material/TableBar";
import { Box, Button } from "@mui/material";
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
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 5, gap: 4 }}>
                {tables.map((table) => (
                    <ItemCard
                        key={table.id}
                        icon={<TableBarIcon sx={{ fontSize: 40 }} />}
                        title={table.name}
                    />
                ))}
            </Box>
            <CreateTable open={open} setOpen={setOpen} />
        </Box>
    );
};

export default TablesPage;
