import React from "react";
import { Container, CssBaseline, Grid } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Header } from "./sharedComponents";
import { WithContextView, WithHooksProps } from "./views";

const App = (): JSX.Element => {
    return (
        <>
            <CssBaseline />
            <Container maxWidth="xl">
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12}>
                        <Header />
                    </Grid>

                    <WithContextView />

                    <WithHooksProps />
                </Grid>
            </Container>
        </>
    );
};

export default App;
