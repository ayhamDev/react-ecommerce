import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store/Store";
import GuardedRoute from "./components/GuardedRoute";
import React, { Suspense } from "react";

import LoadingSpinner from "./components/LoadingSpinner";
const Overview = React.lazy(() => import("./pages/Admin/Overview"));
const SendEmail = React.lazy(() => import("./pages/Admin/SendEmail"));
const Product = React.lazy(() => import("./pages/Admin/Product"));
const Order = React.lazy(() => import("./pages/Admin/Order"));
const Catagory = React.lazy(() => import("./pages/Admin/Catagory"));
const User = React.lazy(() => import("./pages/Admin/User"));
const Login = React.lazy(() => import("./pages/Admin/Login"));
const Dashboard = React.lazy(() => import("./pages/Admin/Dashboard"));

const ProductDetails = React.lazy(
  () => import("./pages/Admin/Details/product")
);
const ProductCreate = React.lazy(() => import("./pages/Admin/Create/product"));

const CatagoryDetails = React.lazy(
  () => import("./pages/Admin/Details/Catagory")
);
const CatagoryCreate = React.lazy(
  () => import("./pages/Admin/create/Catagory")
);

const UserDetails = React.lazy(() => import("./pages/Admin/Details/User"));
const OrderDetails = React.lazy(() => import("./pages/Admin/Details/order"));

const Settings = React.lazy(() => import("./pages/Admin/Settings"));

import { AnimatePresence } from "framer-motion";

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
            Container={Dashboard}
          />
        }
      >
        {/* General */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Overview />
            </Suspense>
          }
        />
        <Route
          path="/admin/sendmail"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <SendEmail />
            </Suspense>
          }
        />
        {/* CMS */}
        <Route
          path="/admin/product"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Product />
            </Suspense>
          }
        />
        <Route
          path="/admin/product/create"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductCreate />
            </Suspense>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ProductDetails />
            </Suspense>
          }
        />

        <Route
          path="/admin/catagory"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Catagory />
            </Suspense>
          }
        />
        <Route
          path="/admin/catagory/create"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CatagoryCreate />
            </Suspense>
          }
        />
        <Route
          path="/admin/catagory/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <CatagoryDetails />
            </Suspense>
          }
        />
        <Route
          path="/admin/order"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Order />
            </Suspense>
          }
        />
        <Route
          path="/admin/order/:userId/:orderId"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <OrderDetails />
            </Suspense>
          }
        />
        <Route
          path="/admin/user"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <User />
            </Suspense>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <UserDetails />
            </Suspense>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Settings />
            </Suspense>
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
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<h1>404</h1>}></Route>
    </Routes>
  );
};

export default App;
