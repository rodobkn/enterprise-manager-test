import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function GET(
  req:  Request,
) {
  const enterprises = await prismadb.enterprise.findMany({
    include: {
      expenses: true,
    }
  })

  return NextResponse.json({ enterprises });
}
