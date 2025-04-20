
import { Link, useLocation } from "react-router-dom";
import { PiggyBank, ChartPie, BarChart, AlertTriangle, Calendar } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { 
      path: "/", 
      label: "Dashboard", 
      icon: <ChartPie className="h-5 w-5" /> 
    },
    { 
      path: "/transactions", 
      label: "Transaksi", 
      icon: <BarChart className="h-5 w-5" /> 
    },
    { 
      path: "/debt-management", 
      label: "Hutang & Piutang", 
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

  return (
    <div className="w-64 bg-white border-r border-border h-screen p-4 hidden md:block">
      <div className="flex items-center justify-center mb-8 mt-4">
        <h1 className="text-xl font-bold text-dsm-blue">Dana Sehat Mandiri</h1>
      </div>
      <nav>
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
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <div className="bg-dsm-green-light bg-opacity-10 p-3 rounded-lg">
          <p className="text-sm text-dsm-green-dark font-medium">
            "Kebebasan finansial adalah hak setiap tenaga kesehatan"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
