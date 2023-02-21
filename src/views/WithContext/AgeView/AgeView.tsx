import {useNameContext} from "../../../lib";
import {Typography} from "@mui/material";

export const AgeView = (): JSX.Element => {
    const { response } = useNameContext();

    if (response?.loading) return <Typography variant="body1">Loading...</Typography>;
    if (response?.error) return <Typography variant="body1">Error: {response?.error.error}</Typography>;

    if (!!response?.data && response.success) return <Typography variant="body1">Your age is probably: {response?.data.age}</Typography>;

    return (<>Nothing</>);
}
