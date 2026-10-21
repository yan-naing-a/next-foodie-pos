import WarningAlert from "@/components/WarningAlert";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenSnackBar } from "@/store/slices/snackBarSlice";
import { deleteTable, updateTable } from "@/store/slices/tableSlice";
import { UpdateTableOption } from "@/types/table";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SelectType {
    id: number;
    name: string;
}

const EditTablePage = () => {
    const router = useRouter();
    const params = useParams();
    const tableId = params && Number(params.id);
    const dispatch = useAppDispatch();
    //open delete location dialog
    const [open, setOpen] = useState<boolean>(false);
    //table
    const tables = useAppSelector((state) => state.table.items);
    const table = tables.find((item) => item.id === tableId);

    const [updatedTable, setUpdatedTable] = useState<UpdateTableOption>();

    useEffect(() => {
        table && setUpdatedTable({ id: table.id, name: table.name, locationId: table.locationId });
    }, [table, tableId]);

    //if not valid ,return back
    if (!updatedTable) return;

    const updateOnSuccess = () => {
        dispatch(setOpenSnackBar({ message: "Update table successfully!", severity: "info" }));
        router.push("/backoffice/tables");
    };
    const deleteOnSuccess = () => {
        dispatch(setOpenSnackBar({ message: "Delete table successfully!", severity: "error" }));
        router.push("/backoffice/tables");
    };

    const handleUpdateMenuCategory = () =>
        dispatch(updateTable({ ...updatedTable, onSuccess: updateOnSuccess }));

    const handleDeleteTable = () =>
        dispatch(deleteTable({ id: tableId, onSuccess: deleteOnSuccess }));

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="error" onClick={() => setOpen(true)}>
                    Delete
                </Button>
            </Box>
            <Box sx={{ width: "50%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                <Typography variant="h5" sx={{ color: "text.secondary" }}>
                    Edit Table
                </Typography>
                <TextField
                    id="name-input"
                    label="name"
                    variant="outlined"
                    value={updatedTable.name}
                    onChange={(evt) => setUpdatedTable({ ...updatedTable, name: evt.target.value })}
                />
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/tables")}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleUpdateMenuCategory}
                        disabled={updatedTable.name ? false : true}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
            <WarningAlert
                open={open}
                setOpen={setOpen}
                label={updatedTable.name}
                handleDeleteData={handleDeleteTable}
            />
        </Box>
    );
};

export default EditTablePage;
