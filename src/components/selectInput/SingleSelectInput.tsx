import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { Dispatch, SetStateAction } from "react";
import { AddonCategory } from "../../../generated/prisma/client";

interface SelectType {
    id: number;
    name: string;
}

interface Props {
    items: AddonCategory[];
    inputLabel: string;
    value: SelectType | null;
    setValue: Dispatch<SetStateAction<SelectType | null>>;
}

const SingleSelectInput = ({ items, inputLabel, value, setValue }: Props) => {
    const handleChange = (eventValue: number) => {
        const selectedValue = items.find((item) => item.id === eventValue)!;
        setValue(selectedValue);
    };

    return (
        <div>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-name-label">{inputLabel}</InputLabel>
                <Select
                    labelId="demo-name-label"
                    id="demo-name"
                    value={value?.id || ""}
                    label={inputLabel}
                    onChange={(evt) => handleChange(evt.target.value)}
                    input={<OutlinedInput label={inputLabel} />}
                >
                    {items.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SingleSelectInput;
