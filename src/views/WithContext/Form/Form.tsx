import { useNameContext } from "../../../lib";
import { FormEvent, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { NameRequest } from "../../../types";

export const Form = (): JSX.Element => {
    const { setRequestData, invalidate } = useNameContext();
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
                    variant="outlined"
                    inputRef={name}
                    fullWidth
                />
                <Box mt={2}>
                    <Button type="submit" variant="contained" fullWidth>
                        Submit
                    </Button>
                </Box>
            </form>

            <Box mt={2}>
                <Button variant="contained" fullWidth onClick={invalidate}>
                    Invalidate
                </Button>
            </Box>
        </>
    );
};
