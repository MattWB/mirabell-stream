import { createBrowserRouter } from "react-router";

import { AdminLoadingScreen } from "../components/admin/AdminLoadingScreen";

import { PublicLayout } from "../layouts/PublicLayout";
import { CatalogPage } from "../pages/CatalogPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter(
  [
    {
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "catalogue",
          element: <CatalogPage />,
        },
      ],
    },
    {
      path: "dashboard",
      hydrateFallbackElement: <AdminLoadingScreen />,
      lazy: async () => {
        const { AdminLayout } = await import("../layouts/AdminLayout");

        return {
          Component: AdminLayout,
        };
      },
      children: [
        {
          index: true,
          lazy: async () => {
            const { DashboardPage } = await import("../pages/DashboardPage");

            return {
              Component: DashboardPage,
            };
          },
        },
      ],
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
