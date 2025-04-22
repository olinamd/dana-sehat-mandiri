
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Transaction } from "@/types";
import { formatDate } from "@/utils/formatters";
import TransactionAmount from "./TransactionAmount";

interface SubCategoryTransactionsProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: number) => void;
}

const SubCategoryTransactions = ({ transactions, onDeleteTransaction }: SubCategoryTransactionsProps) => {
  return (
    <>
      {transactions.map((transaction) => (
        <TableRow key={transaction.id} className="hover:bg-muted/50">
          <TableCell className="pl-12">{formatDate(transaction.date)}</TableCell>
          <TableCell>{transaction.description}</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell className="text-right">
            <TransactionAmount amount={transaction.amount} type={transaction.type} />
          </TableCell>
          <TableCell className="text-right">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onDeleteTransaction(transaction.id)}
              className="text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default SubCategoryTransactions;
