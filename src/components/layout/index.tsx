import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { setMode } from "@/store/slices/themeSlice";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    const init = useAppSelector((state) => state.app.init);
    const dispatch = useAppDispatch();
    const { data: session } = useSession();

    useEffect(() => {
        const themeMode = localStorage.getItem("themeMode");
        if (themeMode) {
            dispatch(setMode(themeMode));
        } else {
            localStorage.setItem("themeMode", "light");
            dispatch(setMode("light"));
        }
    }, []);

    useEffect(() => {
        !init && dispatch(fetchAppData());
    }, [!init]);

    return (
        <Box sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh" }}>
            <TopBar />
            <Box sx={{ display: "flex" }}>
                {!!session && <SideBar />}
                <Box sx={{ margin: 3, width: "100%", color: "text.primary" }}>{children}</Box>
            </Box>
        </Box>
    );
};

export default Layout;
