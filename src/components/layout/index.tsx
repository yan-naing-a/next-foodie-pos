import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { ReactNode, useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    const init = useAppSelector((state) => state.app.init);
    const dispatch = useAppDispatch();

    useEffect(() => {
        !init && dispatch(fetchAppData());
    }, [!init]);

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
