import { Box, Grid } from "@mui/material";
import React from "react";
import { Header } from "../../sharedComponents";
import { AgeView } from "./AgeView";
import { Form } from "./Form";
import { NameProvider } from "./NameProvider";
import { NumberView } from "./NumberView";

export const WithContextView = (): JSX.Element => {
    return (
        <NameProvider>
            <Grid item xs={12} md={4}>
                <Box pt={4}>
                    <Header title="... by context" variant="h2" />
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Form />
                <NumberView />
            </Grid>
            <Grid item xs={12} md={4}>
                <AgeView />
            </Grid>
        </NameProvider>
    );
};
