import { Expense } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ExpenseCard } from "@/components/expense-card"

interface EnterpriseExpensesProps {
  expenses: Expense[] | undefined;
  setIsModalOpen: (isOpen: boolean) => void;
  getNewEnterpriseExpenses: (enterpriseId: string) => Promise<void>;
}

export const EnterpriseExpenses = ({
  expenses,
  setIsModalOpen,
  getNewEnterpriseExpenses,
}: EnterpriseExpensesProps) => {
  if (expenses === undefined) {
    return null;
  }

  return (
    <>
      <div
        className="w-5/6 bg-transparent flex justify-between items-center"
      >
        <span className="text-3xl font-semibold text-black">Gastos</span>
        <Button onClick={() => setIsModalOpen(true)} >Agregar Gasto</Button>
      </div>
      {expenses.map((expense) => (
        <ExpenseCard
          key={expense.id}
          expense={expense}
          getNewEnterpriseExpenses={getNewEnterpriseExpenses}
        />
      ))}
    </>
  );
}