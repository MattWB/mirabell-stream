import { Film } from "lucide-react";
import { Outlet } from "react-router";

import { AdminMobileHeader } from "../components/admin/AdminMobileHeader";
import { AdminNavigation } from "../components/admin/AdminNavigation";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-5">
          <span className="grid size-7 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Film className="size-4" aria-hidden="true" />
          </span>

          <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
            Mirabell Admin
          </span>
        </div>

        <AdminNavigation className="min-h-0 flex-1" />
      </aside>

      <div className="min-h-screen md:pl-56">
        <AdminMobileHeader />
        <Outlet />
      </div>
    </div>
  );
}
