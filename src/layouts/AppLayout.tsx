
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex">
      {!isMobile && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {isMobile && <MobileHeader />}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
