import { PublicHeader } from "../components/layout/PublicHeader";
import { Outlet } from "react-router";

export function PublicLayout() {
  return (
    <>
      <div className="min-h-screen bg-mist-950 text-white">
        <PublicHeader />
        <Outlet />
      </div>
    </>
  );
}
