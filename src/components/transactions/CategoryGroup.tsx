
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight, ChevronDown } from "lucide-react";
import { formatRupiah } from "@/utils/formatters";
import { Transaction } from "@/types";
import SubCategoryTransactions from "./SubCategoryTransactions";

interface CategoryGroupProps {
  mainCategory: string;
  subCategories: Record<string, Transaction[]>;
  isExpanded: boolean;
  onToggle: () => void;
  onDeleteTransaction: (id: number) => void;
  categoryGroup: "Need" | "Want" | "Save" | null;
}

const CategoryGroup = ({ 
  mainCategory, 
  subCategories, 
  isExpanded, 
  onToggle,
  onDeleteTransaction,
  categoryGroup
}: CategoryGroupProps) => {
  const categoryTotal = Object.values(subCategories)
    .flat()
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <>
      <TableRow 
        className={
          categoryGroup === "Need" 
            ? "bg-red-50" 
            : categoryGroup === "Want" 
              ? "bg-yellow-50" 
              : categoryGroup === "Save" 
                ? "bg-green-50" 
                : "bg-gray-50"
        }
      >
        <TableCell colSpan={4}>
          <button onClick={onToggle} className="flex items-center font-medium">
            {isExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
            {mainCategory}
          </button>
        </TableCell>
        <TableCell className="text-right font-medium">
          {formatRupiah(categoryTotal)}
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
      
      {isExpanded && Object.entries(subCategories).map(([subCategory, transactions]) => {
        const subCategoryTotal = transactions.reduce((sum, t) => sum + t.amount, 0);
        
        return (
          <React.Fragment key={`${mainCategory}-${subCategory}`}>
            <TableRow className="bg-muted/30">
              <TableCell className="pl-8" colSpan={3}></TableCell>
              <TableCell className="font-medium">{subCategory}</TableCell>
              <TableCell className="text-right font-medium">
                {formatRupiah(subCategoryTotal)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            
            <SubCategoryTransactions 
              transactions={transactions} 
              onDeleteTransaction={onDeleteTransaction}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default CategoryGroup;
