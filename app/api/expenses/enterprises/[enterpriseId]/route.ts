import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

//(igual explicar la diferencia entre el PATCH y PUT)

export async function GET(
  req: Request,
  { params }: { params: { enterpriseId: string } }
) {
  try {

    const expenses = await prismadb.expense.findMany({
      where: {
        enterpriseId: params.enterpriseId,
      }
    })

    return NextResponse.json({ expenses })
  } catch (error) {
    console.log('[EXPENSES/ENTERPRISES/ENTERPRISEID_GET]', error);
    return NextResponse.json({ error: "Internal Error [custom/personalizado]" }, { status: 500 });
  }
}