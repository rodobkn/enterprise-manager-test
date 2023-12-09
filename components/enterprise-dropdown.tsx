import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Enterprise } from "@prisma/client";

interface EnterpriseDropdownProps {
  enterprises: Enterprise[];
  selectedEnterprise: Enterprise | undefined;
  setSelectedEnterprise: (enterpriseId: string) => void;
}

export const EnterpriseDropdown = ({
  enterprises,
  selectedEnterprise,
  setSelectedEnterprise
}: EnterpriseDropdownProps) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" >{selectedEnterprise ? selectedEnterprise.name : "Selecciona Empresa"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Empresas:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedEnterprise?.id} onValueChange={setSelectedEnterprise}>
          {enterprises.map((enterprise) => {
            return (
              <DropdownMenuRadioItem key={enterprise.id} value={enterprise.id}>{enterprise.name}</DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
