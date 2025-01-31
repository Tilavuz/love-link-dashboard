import { RootState } from "@/app/store";
import AppSidebar from "@/components/common/sidebar/app-sidebar";
import Header from "@/components/common/header/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const { auth } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) {
      navigate("/login");
      return;
    }
  }, [auth, navigate]);

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
