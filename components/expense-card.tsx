import { Expense } from "@prisma/client";
import { format } from "date-fns";
import { X, Loader2 } from 'lucide-react';
import { useState } from "react";
import axios from "axios";

interface ExpenseCardProps {
  expense: Expense;
  getNewEnterpriseExpenses: (enterpriseId: string) => Promise<void>;
}

export const ExpenseCard = ({
  expense,
  getNewEnterpriseExpenses,
}: ExpenseCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteExpense = async () => {
    setIsLoading(true)
    await axios.delete(`/api/expenses/${expense.id}`);
    await getNewEnterpriseExpenses(expense.enterpriseId);
    setIsLoading(false)
  }

  return (
    <div
      className="w-5/6 p-4 bg-yellow-50 rounded-lg shadow-md border border-red-300"
    >
      <div className="flex justify-between items-center mb-2" >
        <div className="text-lg font-semibold">{expense.name}</div>
        {isLoading ? 
          <Loader2 className="h-7 w-7 animate-spin" /> :
          <X 
            onClick={deleteExpense} 
            className="h-7 w-7 hover:cursor-pointer hover:bg-black hover:text-white transition rounded-sm"
          />
        }
      </div>
      <div className="text-red-400 mb-2">Cantidad: ${expense.amount} CLP</div>
      <div className="text-gray-600 mb-2">
        Creado: {format(new Date(expense.createdAt), "dd/MM/yyyy HH:mm")}
      </div>
      <div className="text-gray-600">
        Actualizado: {format(new Date(expense.updatedAt), "dd/MM/yyyy HH:mm")}
      </div>
    </div>
  );
}