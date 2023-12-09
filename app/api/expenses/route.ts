import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

export async function GET(
  req:  Request
) {
  const expenses = await prismadb.expense.findMany()
  return NextResponse.json({ expenses });
}

export async function POST(
  req: Request
) {
  try {
    const { name, amount, enterpriseId } = await req.json();

    const existingEnterprise = await prismadb.enterprise.findFirst({
      where: {
        id: enterpriseId
      }
    })
  
    if (!existingEnterprise) {
      return NextResponse.json({ error: "enterpriseId is not correct" }, { status: 400 });
    }
  
    const expense = await prismadb.expense.create({
      data: {
        name,
        amount,
        enterpriseId,
      }
    })
    return NextResponse.json({ expense });
  } catch (error) {
    console.log('[EXPENSES_POST]', error);
    return NextResponse.json({ error: "Internal Error [custom/personalizado]" }, { status: 500 });
  }
}
