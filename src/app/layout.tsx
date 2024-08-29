import { AppProvider } from "@toolpad/core/nextjs";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Navigation } from "@toolpad/core";
import SummarizeIcon from '@mui/icons-material/Summarize';
import theme from "../../theme";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "modulos principales",
  },
  {
    segment: "page",
    title: "Inicio",
    icon: <DashboardIcon />,
  },
  {
    segment: "report",
    title: "Reportes",
    icon: <SummarizeIcon />,
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-toolpad-color-scheme="light">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppProvider
            theme={theme}
            navigation={NAVIGATION}
            branding={{
              logo: (
                <img src="/logo.png" alt="logo" />
              ),
              title: "Acueducto las cruces",
            }}
          >
            {children}
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
