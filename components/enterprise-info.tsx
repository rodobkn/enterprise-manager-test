import { Enterprise } from "@prisma/client";

interface EnterpriseInfoProps {
  enterprise: Enterprise | undefined;
}

export const EnterpriseInfo = ({
  enterprise
}: EnterpriseInfoProps) => {

  if (!enterprise) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 my-8">
      <div className="text-lg font-semibold mb-2">Nombre: {enterprise.name}</div>
      <div className="text-gray-600 mb-4">Email: {enterprise.email}</div>
      <div className="text-sm text-indigo-500">Tipo: {enterprise.type}</div>
      <div className="text-gray-700 mt-2">Descripción: {enterprise.description}</div>
    </div>
  );
}