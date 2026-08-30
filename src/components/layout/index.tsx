import { Box } from "@mui/material";
import { ReactNode } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <Box>
            <TopBar />
            <Box sx={{ display: "flex" }}>
                <SideBar />
                <Box sx={{ margin: 3, width: "100%" }}>{children}</Box>
            </Box>
        </Box>
    );
};

export default Layout;
