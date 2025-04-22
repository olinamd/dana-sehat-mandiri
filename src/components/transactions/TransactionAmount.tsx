
import React from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { formatRupiah } from "@/utils/formatters";

interface TransactionAmountProps {
  amount: number;
  type: "income" | "expense";
}

const TransactionAmount = ({ amount, type }: TransactionAmountProps) => {
  return (
    <div className="flex items-center justify-end gap-2">
      {type === "income" ? (
        <ArrowUpRight className="h-4 w-4 text-dsm-green" />
      ) : (
        <ArrowDownLeft className="h-4 w-4 text-destructive" />
      )}
      <span className={type === "income" ? "text-dsm-green" : "text-destructive"}>
        {formatRupiah(amount)}
      </span>
    </div>
  );
};

export default TransactionAmount;
