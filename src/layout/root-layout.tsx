import { RootState } from "@/app/store";
import AppSidebar from "@/components/common/app-sidebar";
import Header from "@/components/common/header/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Login from "@/pages/auth/login";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const { auth } = useSelector((state: RootState) => state.auth);

  if (auth === null) {
    return <Login />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full h-screen">
        <Header>
          <SidebarTrigger />
        </Header>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
