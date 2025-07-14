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

import { Outlet } from "@tanstack/react-router";
import { useUser } from "@account-kit/react";

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

const routeTree = rootRoute.addChildren([
  homeRoute,
  ordersRoute,
  orderDetailsRoute,
]);

const router = createRouter({
  routeTree,
});

export default function TanStackRouter() {
  const user = useUser();
  console.log("User:", user);
  return <RouterProvider router={router} />;
}
