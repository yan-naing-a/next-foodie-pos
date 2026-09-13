import { Box, Typography } from "@mui/material";

interface Props {
    errorMessage: string[];
}

const InputErrorMessage = ({ errorMessage }: Props) => {
    return (
        <Box sx={{ color: "red", fontStyle: "italic" }}>
            {errorMessage.map((msg, indx) => (
                <Typography key={indx} variant="body1">
                    {msg}
                </Typography>
            ))}
        </Box>
    );
};

export default InputErrorMessage;
