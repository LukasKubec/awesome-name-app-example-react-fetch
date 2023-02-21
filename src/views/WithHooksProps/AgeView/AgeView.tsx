import { Typography } from "@mui/material";
import { NameError, NameResponse } from "../../../types";

interface AgeViewProps {
    success: boolean;
    loading: boolean;
    error?: NameError;
    data?: NameResponse;
}

export const AgeView = ({ success, loading, error, data }: AgeViewProps): JSX.Element => {
    if (loading) return <Typography variant="body1">Loading...</Typography>;
    if (error) return <Typography variant="body1">Error: {error.error}</Typography>;

    if (!!data && success)
        return <Typography variant="body1">Your age is probably: {data.age}</Typography>;

    return <>Nothing</>;
};
