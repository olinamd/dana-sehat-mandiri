
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { formatRupiah } from "@/utils/formatters";

interface WealthSummaryCardsProps {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

export default function WealthSummaryCards({ totalAssets, totalLiabilities, netWorth }: WealthSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Aset</CardTitle>
          <ArrowUp className="h-4 w-4 text-dsm-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatRupiah(totalAssets)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Liabilitas</CardTitle>
          <ArrowDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatRupiah(totalLiabilities)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Kekayaan Bersih</CardTitle>
          <ArrowUp className="h-4 w-4 text-dsm-green" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatRupiah(netWorth)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
