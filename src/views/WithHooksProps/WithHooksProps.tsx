import { useFetchData } from "../../lib";
import { NameError, NameResponse } from "../../types";
import { Box, Grid } from "@mui/material";
import { Header } from "../../sharedComponents";
import { Form } from "./Form";
import { NumberView } from "./NumberView";
import { AgeView } from "./AgeView";

export const WithHooksProps = (): JSX.Element => {
    const { loading, data, handleSetData, success, error, invalidDate } = useFetchData<
        NameResponse,
        NameError
    >({
        genericResponseTypeGuard: (response: NameResponse | unknown): response is NameResponse => {
            return (response as NameResponse).age !== undefined;
        },
        genericTypeError: {
            error: "Incorrect response type",
        },
        genericErrorTypeGuard: (response: NameError | unknown | undefined): response is NameError => {
            return (response as NameError).error !== undefined;
        }
    });

    return (
        <>
            <Grid item xs={12} md={4}>
                <Box pt={4}>
                    <Header title="... by hook props" variant="h2" />
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Form setRequestData={handleSetData} invalidate={invalidDate} />
                <NumberView loading={loading} success={success} data={data} error={error} />
            </Grid>
            <Grid item xs={12} md={4}>
                <AgeView loading={loading} success={success} data={data} error={error} />
            </Grid>
        </>
    );
};
