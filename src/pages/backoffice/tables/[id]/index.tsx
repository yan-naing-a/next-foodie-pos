import InputErrorMessage from "@/components/InputErrorMessage";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateTable } from "@/store/slices/tableSlice";
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
    //error message
    const [errorMessage, setErrorMessage] = useState<string[]>([]);
    //table
    const tables = useAppSelector((state) => state.table.items);
    const table = tables.find((item) => item.id === tableId);

    const [name, setName] = useState<string>("");

    useEffect(() => {
        table && setName(table.name);
    }, [table?.name, tableId]);

    const onSuccess = () => {
        router.push("/backoffice/tables");
    };

    const handleUpdateMenuCategory = () => {
        if (!name || !table?.locationId) {
            setErrorMessage([]);
            !name && setErrorMessage((prevState) => [...prevState, "name field required"]);
            return;
        }
        dispatch(updateTable({ id: tableId, name, locationId: table?.locationId, onSuccess }));
    };

    if (!name) return;

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="error">
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
                    value={name}
                    onChange={(evt) => setName(evt.target.value)}
                />
                {!!errorMessage.length && <InputErrorMessage errorMessage={errorMessage} />}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Button variant="outlined" onClick={() => router.push("/backoffice/tables")}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleUpdateMenuCategory}>
                        Update
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditTablePage;
