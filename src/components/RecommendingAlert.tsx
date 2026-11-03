import WarningIcon from "@mui/icons-material/Warning";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useLayoutEffect } from "react";
import MultipleSelectInput from "./selectInput/MultiSelectInput";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

interface SelectType {
    id: number;
    name: string;
}

interface MovingData {
    parentId: number;
    childId: number;
}

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    // ဖျက်မဲ့ menu (သို့) addon category
    mainItems: SelectType[];
    movingData: MovingData[];
    setMovingData: Dispatch<SetStateAction<MovingData[]>>;
    selectInput: {
        items: SelectType[];
        label: string;
    };
    handleData: () => void;
}

const RecommendingAlert = ({
    open,
    setOpen,
    mainItems,
    movingData,
    setMovingData,
    selectInput,
    handleData,
}: Props) => {
    const handleClose = () => {
        setOpen(false);
        setMovingData([]);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
                <WarningIcon sx={{ color: "orange", fontSize: 30, fontWeight: "bold" }} />
                <Typography variant="h5" component="span">
                    Warning
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    The items below will be permanently deleted. Do you want to move to another one?
                </DialogContentText>
            </DialogContent>
            <Divider variant={"middle"} sx={{ backgroundColor: "secondary.main", mb: 2 }} />
            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3, pl: 3, pr: 3 }}>
                {!!mainItems.length &&
                    mainItems.map((item) => {
                        return (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} key={item.id}>
                                <Typography variant="subtitle1">{item.name}</Typography>
                                <MultipleSelectInput
                                    items={selectInput.items}
                                    inputLabel={selectInput.label}
                                    values={selectInput.items.filter((parent) =>
                                        movingData.some(
                                            (pair) => pair.parentId === parent.id && pair.childId === item.id,
                                        ),
                                    )}
                                    setValues={(nextValues) => {
                                        const currentValues = selectInput.items.filter((parent) =>
                                            movingData.some(
                                                (pair) => pair.parentId === parent.id && pair.childId === item.id,
                                            ),
                                        );
                                        const updatedValues =
                                            typeof nextValues === "function" ? nextValues(currentValues) : nextValues;

                                        setMovingData((current) => [
                                            ...current.filter((pair) => pair.childId !== item.id),
                                            ...(updatedValues ?? []).map((parent) => ({
                                                parentId: parent.id,
                                                childId: item.id,
                                            })),
                                        ]);
                                    }}
                                />
                            </Box>
                        );
                    })}
            </Box>

            <DialogActions sx={{ p: 3 }}>
                <Button
                    onClick={() => {
                        handleClose();
                        handleData();
                    }}
                >
                    Cancel
                </Button>

                <Button
                    onClick={() => {
                        handleData();
                        handleClose();
                    }}
                    variant="contained"
                >
                    Move
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RecommendingAlert;
