import { FormEvent, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { NameRequest } from "../../../types";

export interface FormProps {
    setRequestData: (data: NameRequest) => void;
    invalidate: () => void;
}

export const Form = ({ setRequestData, invalidate }: FormProps): JSX.Element => {
    const name = useRef<HTMLInputElement>();

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!name.current?.value) return;
        const request: NameRequest = {
            name: name.current?.value
        };
        setRequestData(request);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="filled"
                    inputRef={name}
                    fullWidth
                />
                <Box mt={2}>
                    <Button type="submit" variant="outlined" fullWidth>
                        Submit
                    </Button>
                </Box>
            </form>

            <Box mt={2}>
                <Button variant="outlined" fullWidth onClick={invalidate}>
                    Invalidate
                </Button>
            </Box>
        </>
    );
};
