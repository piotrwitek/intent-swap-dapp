import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Error from "./pages/Error";

import { Outlet } from "@tanstack/react-router";
import { useUser } from "@account-kit/react";
import { useApp } from "./context/useApp";
import { useEffect } from "react";

const rootRoute = createRootRoute({
  component: function RootLayout() {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  },
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: Orders,
});

const orderDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/:orderId",
  component: OrderDetails,
});

const errorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/error",
  component: Error,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  ordersRoute,
  orderDetailsRoute,
  errorRoute,
]);

const router = createRouter({
  routeTree,
});

export default function TanStackRouter() {
  const { state } = useApp();

  // Redirect to error page if there's a token fetch error
  useEffect(() => {
    if (state.globalError && window.location.pathname !== "/error") {
      window.location.href = "/error";
    }
  }, [state.globalError]);

  return <RouterProvider router={router} />;
}
