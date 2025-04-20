
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, PiggyBank, ChartPie, BarChart, AlertTriangle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileHeader = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [open, setOpen] = useState(false);

  const menuItems = [
    { 
      path: "/", 
      label: "Dashboard", 
      icon: <ChartPie className="h-5 w-5" /> 
    },
    { 
      path: "/transactions", 
      label: "Arus Kas", // Ganti Transaksi -> Arus Kas
      icon: <BarChart className="h-5 w-5" /> 
    },
    { 
      path: "/debt-management", 
      label: "Neraca Keuangan", // Ganti Hutang & Piutang -> Neraca Keuangan
      icon: <PiggyBank className="h-5 w-5" /> 
    },
    { 
      path: "/risk-profile", 
      label: "Profil Risiko", 
      icon: <AlertTriangle className="h-5 w-5" /> 
    },
    { 
      path: "/budget-suggestions", 
      label: "Saran Anggaran", 
      icon: <Calendar className="h-5 w-5" /> 
    },
  ];

  const getPageTitle = () => {
    const item = menuItems.find(item => isActive(item.path));
    return item ? item.label : "Dana Sehat Mandiri";
  };

  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-4">
      <h1 className="text-lg font-bold text-dsm-blue">{getPageTitle()}</h1>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 sm:max-w-sm p-0">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-dsm-blue">Dana Sehat Mandiri</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center p-3 rounded-md transition-colors ${
                        isActive(item.path)
                          ? "bg-dsm-blue text-white"
                          : "text-gray-700 hover:bg-muted"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-border">
              <div className="bg-dsm-green-light bg-opacity-10 p-3 rounded-lg">
                <p className="text-sm text-dsm-green-dark font-medium">
                  "Kebebasan finansial adalah hak setiap tenaga kesehatan"
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileHeader;
