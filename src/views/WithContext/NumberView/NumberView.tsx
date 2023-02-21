import { useNameContext } from "../../../lib";
import { Typography } from "@mui/material";

export const NumberView = (): JSX.Element => {
    const { response } = useNameContext();

    if (response?.loading) return <Typography variant="body1">Loading...</Typography>;
    if (response?.error) return <Typography variant="body1">Error: {response?.error.error}</Typography>;

    if (!!response?.data) return <Typography variant="body1">Sample of people: {response?.data.count}</Typography>;

    return (<>Nothing</>);
};
