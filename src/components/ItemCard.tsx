import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    icon: ReactNode;
    title: string;
    href?: string;
    subtitle?: string;
    assetUrl?: string | null;
}

const ItemCard = ({ icon, title, href, subtitle, assetUrl }: Props) => {
    if (href) {
        return (
            <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
                <Paper
                    elevation={2}
                    sx={{
                        width: 170,
                        height: 170,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        m: 2,
                    }}
                >
                    <Box>{!!assetUrl ? <img src={assetUrl} alt={title} /> : icon}</Box>
                    <Typography sx={{ color: "text.primary", fontWeight: "700" }}>{title}</Typography>
                    {subtitle && (
                        <Typography sx={{ color: "text.primary", fontSize: 14 }}>{subtitle}</Typography>
                    )}
                </Paper>
            </Link>
        );
    }

    return (
        <Paper
            elevation={2}
            sx={{
                width: 170,
                height: 170,
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box>{icon}</Box>
            <Typography sx={{ color: "text.primary", fontWeight: "700" }}>{title}</Typography>
            {subtitle && <Typography sx={{ color: "text.primary", fontSize: 14 }}>{subtitle}</Typography>}
        </Paper>
    );
};

export default ItemCard;
