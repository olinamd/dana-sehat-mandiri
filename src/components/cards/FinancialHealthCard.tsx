
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const healthItems = [
  {
    name: "Rasio Tabungan",
    value: 34.7,
    target: 20,
    status: "success",
    description: "Pengeluaran tidak melebihi 80% dari pendapatan",
  },
  {
    name: "Dana Darurat",
    value: 65,
    target: 100,
    status: "warning",
    description: "Target 6x pengeluaran bulanan",
  },
  {
    name: "Rasio Hutang",
    value: 8.5,
    target: 30,
    status: "success",
    description: "Pembayaran hutang tidak melebihi 30% pendapatan",
  },
  {
    name: "Investasi",
    value: 15,
    target: 20,
    status: "warning",
    description: "Target minimal 20% dari pendapatan",
  },
];

const FinancialHealthCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kesehatan Finansial</CardTitle>
        <CardDescription>
          Berdasarkan 9 parameter kesehatan finansial
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {healthItems.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{item.name}</div>
                <div className={`text-sm ${
                  item.status === "success" ? "text-dsm-green" : 
                  item.status === "warning" ? "text-amber-500" : "text-destructive"
                }`}>
                  {item.value}% / {item.target}%
                </div>
              </div>
              <Progress 
                value={(item.value / item.target) * 100} 
                className={`h-2 ${
                  item.status === "success" ? "bg-gradient-to-r from-dsm-green-light to-dsm-green" : 
                  item.status === "warning" ? "bg-gradient-to-r from-amber-200 to-amber-500" : 
                  "bg-gradient-to-r from-red-200 to-destructive"
                }`}
              />
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialHealthCard;
