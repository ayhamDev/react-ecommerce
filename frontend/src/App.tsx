import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store/Store";
import GuardedRoute from "./components/GuardedRoute";
import Overview from "./pages/Admin/Overview";
import SendEmail from "./pages/Admin/SendEmail";
import Product from "./pages/Admin/Product";
import Order from "./pages/Admin/Order";
import Catagory from "./pages/Admin/Catagory";
import User from "./pages/Admin/User";
import Login from "./pages/Admin/Login";

const App = () => {
  const auth = useSelector((state: RootState) => state.auth.value);
  const adminAuth = useSelector((state: RootState) => state.adminAuth.value);
  return (
    <Routes>
      {/* website */}
      <Route path="/" element={<div>Home</div>} />
      {/* Auth */}
      <Route
        element={
          <GuardedRoute
            redirectRoute="/"
            isRouteAccessible={!auth.isAuthenticated}
          />
        }
      >
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/register" element={<div>register Page</div>} />
      </Route>

      {/* admin */}

      <Route
        element={
          <GuardedRoute
            redirectRoute="/admin/login"
            isRouteAccessible={adminAuth.isAuthenticated}
          />
        }
      >
        {/* General */}
        <Route path="/admin" element={<Overview />} />
        <Route path="/admin/sendmail" element={<SendEmail />} />
        {/* CMS */}
        <Route path="/admin/cms/product" element={<Product />} />
        <Route path="/admin/cms/catagory" element={<Catagory />} />
        <Route path="/admin/cms/order" element={<Order />} />
        <Route path="/admin/cms/user" element={<User />} />
      </Route>

      <Route
        element={
          <GuardedRoute
            redirectRoute="/admin"
            isRouteAccessible={!adminAuth.isAuthenticated}
          />
        }
      >
        <Route path="/admin/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
