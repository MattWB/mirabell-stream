import { Outlet } from "react-router";

export function AdminLayout() {
  return (
    <>
      <div className="min-h-screen bg-stone-100 text-stone-900">
        <Outlet />
      </div>
    </>
  );
}
