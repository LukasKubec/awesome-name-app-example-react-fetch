import { Typography } from "@mui/material";
import React from "react";

interface HeaderProps {
    title?: string;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const DEFAULT_TITLE = "Awesome name app!";

export const Header = ({ title = DEFAULT_TITLE, variant = "h1" }: HeaderProps): JSX.Element => {
    return (
        <Typography variant={variant}>
            {title}
        </Typography>
    );
};
