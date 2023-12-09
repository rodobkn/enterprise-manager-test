import prismadb from "@/lib/prismadb"
import { Menu } from "@/components/menu";

export default async function Home() {
  const enterprises = await prismadb.enterprise.findMany();
  return (
    <Menu 
      enterprises={enterprises}
    /> 
  )
}
