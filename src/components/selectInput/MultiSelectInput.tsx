import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { ListItemText, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";
import { AddonCategory, Menu, MenuCategory } from "../../../generated/prisma/client";

interface SelectType {
    id: number;
    name: string;
}

interface Props {
    items: Menu[] | MenuCategory[] | AddonCategory[];
    inputLabel: string;
    values: SelectType[] | null;
    setValues: Dispatch<SetStateAction<SelectType[] | null>>;
}

export default function MultipleSelectInput({ items, inputLabel, values, setValues }: Props) {
    const handleChange = (values: number[]) => {
        const selectedValues = values
            .map((value) => items.find((item) => item.id === value))
            .filter((item) => item !== undefined);

        setValues(selectedValues);
    };

    return (
        <div>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">{inputLabel}</InputLabel>
                <Select
                    multiple
                    value={!!values?.length ? values.map((value) => value.id) : []}
                    label={inputLabel}
                    onChange={(evt) => handleChange(evt.target.value as number[])}
                    input={<OutlinedInput label={inputLabel} />}
                    renderValue={(selectedIds) => {
                        return selectedIds
                            .map((selectedId) => items.find((item) => item.id === selectedId))
                            .map((selectedItem) => selectedItem?.name)
                            .join(", ");
                    }}
                    MenuProps={{
                        slotProps: {
                            paper: {
                                style: {
                                    maxHeight: 48 * 4.5 + 8,
                                    width: 250,
                                },
                            },
                        },
                    }}
                >
                    {items.length ? (
                        items.map((item) => {
                            const selected = values?.some((value) => value.id === item.id) ?? false;
                            const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

                            return (
                                <MenuItem key={item.id} value={item.id}>
                                    <SelectionIcon
                                        fontSize="small"
                                        style={{ marginRight: 8, padding: 9, boxSizing: "content-box" }}
                                    />
                                    <ListItemText primary={item.name} />
                                </MenuItem>
                            );
                        })
                    ) : (
                        <MenuItem>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    width: "100%",
                                    color: "text.secondary",
                                    margin: "15px 0",
                                }}
                                variant="h6"
                            >{`No ${inputLabel.toLowerCase()}   `}</Typography>
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    );
}
