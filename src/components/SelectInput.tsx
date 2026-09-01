import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import { useState } from "react";

interface Props {
    items: string[];
    inputLabel: string;
    multiple?: boolean;
}

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export default function MultipleSelect({ items, inputLabel, multiple = true }: Props) {
    const theme = useTheme();
    const [personName, setPersonName] = useState<string[]>([]);

    const handleChange = (value: string | string[]) => {
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value,
        );
    };

    return (
        <div>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">{inputLabel}</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple={multiple}
                    value={personName}
                    onChange={(evt) => handleChange(evt.target.value)}
                    input={<OutlinedInput label={inputLabel} />}
                >
                    {items.map((item) => (
                        <MenuItem key={item} value={item} style={getStyles(item, personName, theme)}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
