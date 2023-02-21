import { Typography } from "@mui/material";
import { NameError, NameResponse } from "../../../types";

interface NumberViewProps {
    success: boolean;
    loading: boolean;
    error?: NameError;
    data?: NameResponse;
}

export const NumberView = ({ success, loading, error, data }: NumberViewProps): JSX.Element => {
    if (loading) return <Typography variant="body1">Loading...</Typography>;
    if (error) return <Typography variant="body1">Error: {error.error}</Typography>;

    if (!!data && success)
        return <Typography variant="body1">Sample of people: {data.count}</Typography>;

    return <>Nothing</>;
};
