import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { Dispatch, SetStateAction } from "react";
import { Menu, MenuCategory } from "../../../generated/prisma/client";

interface Props {
    items: Menu[] | MenuCategory[];
    inputLabel: string;
    values: { id: number; name: string }[] | null;
    setValues: Dispatch<SetStateAction<{ id: number; name: string }[] | null>>;
}

function getStyles(valueId: number, values: { id: number; name: string }[], theme: Theme) {
    return {
        fontWeight: values.map((v) => v.id).includes(valueId)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}
function getNormalStyles(theme: Theme) {
    return { fontWeight: theme.typography.fontWeightRegular };
}

export default function MultipleSelectInput({ items, inputLabel, values, setValues }: Props) {
    const theme = useTheme();

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
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={!!values && values.map((value) => value.id)}
                    label={inputLabel}
                    onChange={(evt) => handleChange(evt.target.value as number[])}
                    input={<OutlinedInput label={inputLabel} />}
                >
                    {items.map((item) => (
                        <MenuItem
                            key={item.id}
                            value={item.id}
                            style={values?.length ? getStyles(item.id, values, theme) : getNormalStyles(theme)}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
