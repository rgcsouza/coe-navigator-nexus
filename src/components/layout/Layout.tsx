
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { AppSidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/components/ui/sidebar";

export function Layout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {isAuthenticated ? (
        <SidebarProvider>
          <div className="flex flex-1 w-full">
            <AppSidebar />
            <main className="flex-1 p-6 overflow-auto">
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <main className="flex-1">
          <Outlet />
        </main>
      )}
    </div>
  );
}
