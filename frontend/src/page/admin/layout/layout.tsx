import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./dashboard-sidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1 size-4" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <p className="text-sm">
            Manage your customer services and generate dynamic exam data form.
          </p>
        </header>
        <div className="flex flex-col gap-4 p-4">
          <LoadingOverlay />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
