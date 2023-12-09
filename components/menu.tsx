"use client"

import { Enterprise, Expense } from "@prisma/client";
import { EnterpriseDropdown } from "@/components/enterprise-dropdown";
import { EnterpriseInfo } from "@/components/enterprise-info";
import { EnterpriseExpenses } from "@/components/enterprise-expenses";
import { Modal } from "@/components/modal";
import { useEffect, useState } from "react";
import axios from "axios";

interface MenuProps {
  enterprises: Enterprise[];
}

//(el patch lo dejo para la casa o muestro en postman y muestro como se actualizo el updated)

export const Menu = ({
  enterprises
}: MenuProps) => {
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise | undefined>(undefined);
  const [expenses, setExpenses] = useState<Expense[] | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  const getEnterpriseExpenses = async (enterpriseId: string) => {
    const expenses = await axios.get(`/api/expenses/enterprises/${enterpriseId}`);
    setExpenses(expenses.data.expenses)
  }

  const setEnterprise = (enterpriseId: string) => {
    const newSelectedEnterprise = enterprises.find((enterprise) => enterprise.id === enterpriseId)
    setSelectedEnterprise(newSelectedEnterprise);
    getEnterpriseExpenses(enterpriseId)
  }

  // EXPLICAR PORQUE ES MAS OPTIMO HACER EL GET EN EL SERVIDOR cuando termine el EnterpriseInfo
  // const [useEffectEnterprises, setUseEffectEnterprises] = useState<Enterprise[] | undefined>(undefined);

  // useEffect(() => {
  //   const getEnterprises = async () => {
  //     const enterprises = await axios.get("/api/enterprises");
  //     setUseEffectEnterprises(enterprises.data.enterprises);
  //   }
  //   getEnterprises()
  // }, [])

  // useEffect(() => {
  //   console.log("enterprises: ",enterprises)
  //   console.log("useEffectEnterprises: ", useEffectEnterprises)
  // }, [useEffectEnterprises, enterprises])

  return (
    <div className="flex flex-col space-y-8 items-center my-10" >
      <EnterpriseDropdown 
        enterprises={enterprises}
        selectedEnterprise={selectedEnterprise}
        setSelectedEnterprise={setEnterprise}
      />
      <EnterpriseInfo
        enterprise={selectedEnterprise}
      />
      <EnterpriseExpenses 
        expenses={expenses}
        setIsModalOpen={setModalOpen}
        getNewEnterpriseExpenses={getEnterpriseExpenses}
      />
      <Modal 
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        enterpriseId={selectedEnterprise ? selectedEnterprise.id : ""}
        getNewEnterpriseExpenses={getEnterpriseExpenses}
      />
    </div>
  )
}