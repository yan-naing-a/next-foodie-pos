import logo from "@/assets/logo.png";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
    const { data: session } = useSession();
    return (
        <Box>
            <AppBar
                position="static"
                elevation={0}
                sx={{ bgcolor: "success.main", color: "text.secondary", boxShadow: "none" }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", margin: "4px" }}>
                    <Box sx={{ width: 140 }}>
                        <Link href="/" style={{ display: "block" }}>
                            <Image src={logo} alt="logo" priority style={{ width: "100%", height: "100%" }} />
                        </Link>
                    </Box>
                    {session ? (
                        <Button
                            color="inherit"
                            onClick={() => signOut({ callbackUrl: "/" })}
                            sx={{ color: "#ffffff" }}
                        >
                            Sign out
                        </Button>
                    ) : (
                        <span />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default TopBar;
