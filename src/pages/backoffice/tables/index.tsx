import ItemCard from "@/components/ItemCard";
import CreateTable from "@/components/table/createTable";
import { useAppSelector } from "@/store/hooks";
import TableBarIcon from "@mui/icons-material/TableBar";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

const TablesPage = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedLocationId, setSelectedLocationId] = useState<string>("");
    const tables = useAppSelector((state) => state.table.items);

    useEffect(() => {
        const storeLocationId = localStorage.getItem("selectedLocationId");
        storeLocationId && setSelectedLocationId(storeLocationId);
    }, []);

    const tablesByLocation = tables.filter(
        (table) => table.locationId === Number(selectedLocationId),
    );

    if (!tables.length) return;

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    create table
                </Button>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", mt: 5, gap: 4 }}>
                {tablesByLocation.map((table) => (
                    <ItemCard
                        key={table.id}
                        icon={<TableBarIcon sx={{ fontSize: 40 }} />}
                        title={table.name}
                        href={`/backoffice/tables/${table.id}`}
                    />
                ))}
            </Box>
            <CreateTable open={open} setOpen={setOpen} />
        </Box>
    );
};

export default TablesPage;
