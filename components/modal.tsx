import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import axios from "axios";
import { Loader2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  enterpriseId: string;
  getNewEnterpriseExpenses: (enterpriseId: string) => Promise<void>;
}

export const Modal = ({
  isOpen,
  setIsOpen,
  enterpriseId,
  getNewEnterpriseExpenses
}: ModalProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setName("")
    setAmount("")
  }

  const handleSaveExpense = async () => {
    // console.log('Nuevo Gasto - Nombre:', name);
    // console.log('Nuevo Gasto - Cantidad:', amount);

    const payload = {
      "name": name,
      "amount": parseInt(amount),
      "enterpriseId": enterpriseId
    }

    setIsLoading(true);
    await axios.post("/api/expenses", payload);
    await getNewEnterpriseExpenses(enterpriseId);
    setIsLoading(false);
    handleClose();      
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Gasto</DialogTitle>
          <DialogDescription>Ingresa los datos del nuevo gasto</DialogDescription>
        </DialogHeader>
        {isLoading ? <Loader2 className="h-24 w-24 animate-spin mx-auto mt-2" /> : 
          <>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Nombre:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Cantidad:</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <button
              onClick={handleSaveExpense}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Guardar Gasto
            </button>
          </>
        }
      </DialogContent>
    </Dialog>
  );
}