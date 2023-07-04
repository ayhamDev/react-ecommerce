import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { HashLoader } from "react-spinners";

interface GuardedRouteProps {
  /**
   * Permission check for route
   * @default false
   */
  isRouteAccessible?: boolean;
  /**
   * Route to be redirected to
   * @default '/'
   */
  redirectRoute: string;
  Container?: React.JSX.Element;
}

/**
 * Component for guarding restricted routes
 *
 * @example Default usage
 * ```ts
 * <GuardedRoute
 *	 isRouteAccessible={true}
 * />
 * ```
 *
 * @example Usage with custom redirected route
 * ```ts
 * <GuardedRoute
 *	 isRouteAccessible={false}
 *	 redirectRoute={'/login'}
 * />
 * ```
 */
const GuardedRoute = ({
  isRouteAccessible = false,
  Container,
  redirectRoute = "/",
}: GuardedRouteProps): JSX.Element => {
  if (!Container && isRouteAccessible) return <Outlet />;
  if (!Container && !isRouteAccessible)
    return <Navigate to={redirectRoute} replace />;
  return isRouteAccessible ? (
    <Suspense
      fallback={
        <Box
          overflow={"hidden"}
          position={"absolute"}
          sx={{ inset: 1, padding: 0 }}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <HashLoader color="#212121" size={100} style={{ padding: 0 }} />
        </Box>
      }
    >
      {/* @ts-ignore*/}
      <Container>
        <Outlet />
      </Container>
    </Suspense>
  ) : (
    <Navigate to={redirectRoute} replace />
  );
};

export default GuardedRoute;
