import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import "./App.css";
import { useUser } from "@account-kit/react";

function App() {
  const user = useUser();
  return (
    <Router key={user?.address || user?.email || "guest"}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
