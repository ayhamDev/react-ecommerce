import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store/Store";
import loadable from "@loadable/component";

const GuardedRoute = loadable(() => import("./components/GuardedRoute"));
const Overview = loadable(() => import("./pages/Admin/Overview"));
const SendEmail = loadable(() => import("./pages/Admin/SendEmail"));
const Product = loadable(() => import("./pages/Admin/Product"));
const Order = loadable(() => import("./pages/Admin/Order"));
const Catagory = loadable(() => import("./pages/Admin/Catagory"));
const User = loadable(() => import("./pages/Admin/User"));
const Login = loadable(() => import("./pages/Admin/Login"));
const Dashboard = loadable(() => import("./pages/Admin/Dashboard"));

const ProductDetails = loadable(() => import("./pages/Admin/Details/product"));
const ProductCreate = loadable(() => import("./pages/Admin/Create/product"));

const CatagoryDetails = loadable(
  () => import("./pages/Admin/Details/Catagory")
);
const CatagoryCreate = loadable(() => import("./pages/Admin/create/Catagory"));

const UserDetails = loadable(() => import("./pages/Admin/Details/User"));
const OrderDetails = loadable(() => import("./pages/Admin/Details/order"));

const Settings = loadable(() => import("./pages/Admin/Settings"));

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
        <Route
          path="/admin"
          element={
            <Dashboard>
              <Overview />
            </Dashboard>
          }
        />
        <Route
          path="/admin/sendmail"
          element={
            <Dashboard>
              <SendEmail />
            </Dashboard>
          }
        />
        {/* CMS */}
        <Route
          path="/admin/product"
          element={
            <Dashboard>
              <Product />
            </Dashboard>
          }
        />
        <Route
          path="/admin/product/create"
          element={
            <Dashboard>
              <ProductCreate />
            </Dashboard>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <Dashboard>
              <ProductDetails />
            </Dashboard>
          }
        />

        <Route
          path="/admin/catagory"
          element={
            <Dashboard>
              <Catagory />
            </Dashboard>
          }
        />
        <Route
          path="/admin/catagory/create"
          element={
            <Dashboard>
              <CatagoryCreate />
            </Dashboard>
          }
        />
        <Route
          path="/admin/catagory/:id"
          element={
            <Dashboard>
              <CatagoryDetails />
            </Dashboard>
          }
        />
        <Route
          path="/admin/order"
          element={
            <Dashboard>
              <Order />
            </Dashboard>
          }
        />
        <Route
          path="/admin/order/:userId/:orderId"
          element={
            <Dashboard>
              <OrderDetails />
            </Dashboard>
          }
        />
        <Route
          path="/admin/user"
          element={
            <Dashboard>
              <User />
            </Dashboard>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <Dashboard>
              <UserDetails />
            </Dashboard>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <Dashboard>
              <Settings />
            </Dashboard>
          }
        />
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
      <Route path="*" element={<h1>404</h1>}></Route>
    </Routes>
  );
};

export default App;
