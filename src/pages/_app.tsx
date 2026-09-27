import Layout from "@/components/layout";
import { store } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { themes } from "@/utils/theme";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <AppTheme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppTheme>
      </Provider>
    </SessionProvider>
  );
}

function AppTheme({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector((state) => state.theme.mode);

  return <ThemeProvider theme={themes[mode]}>{children}</ThemeProvider>;
}
