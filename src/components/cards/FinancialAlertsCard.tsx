
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "Dana darurat Anda hanya cukup untuk 4 bulan pengeluaran, disarankan minimal 6 bulan.",
  },
  {
    id: 2,
    type: "warning",
    message: "Alokasi investasi Anda saat ini (15%) masih di bawah target (20%).",
  },
  {
    id: 3,
    type: "success",
    message: "Rasio tabungan Anda (34.7%) lebih tinggi dari target (20%). Hebat!",
  },
];

const FinancialAlertsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <span>Peringatan & Saran</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-lg border flex items-start gap-3 ${
                alert.type === "warning" 
                  ? "border-amber-200 bg-amber-50" 
                  : "border-green-200 bg-green-50"
              }`}
            >
              {alert.type === "warning" ? (
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              )}
              <p className={`text-sm ${
                alert.type === "warning" ? "text-amber-800" : "text-green-800"
              }`}>
                {alert.message}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialAlertsCard;
