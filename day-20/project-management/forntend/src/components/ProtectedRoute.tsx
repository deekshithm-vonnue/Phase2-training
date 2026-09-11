import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Loading from "./Loading";

export default function ProctectRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return <Outlet />;
}
