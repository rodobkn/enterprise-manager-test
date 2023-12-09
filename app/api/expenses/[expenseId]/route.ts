import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

//(igual explicar la diferencia entre el PATCH y PUT)

export async function PATCH(
  req: Request,
  { params }: { params: { expenseId: string } }
) {
  try {
    const { name, amount } = await req.json();

    const expense = await prismadb.expense.update({
      where: {
        id: params.expenseId
      },
      data: {
        name,
        amount
      }
    })

    return NextResponse.json({ expense })
  } catch (error) {
    console.log('[EXPENSE_PATCH]', error);
    return NextResponse.json({ error: "Internal Error [custom/personalizado]" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { expenseId: string } }
) {
  try {

    const expenseDeleted = await prismadb.expense.delete({
      where: {
        id: params.expenseId
      }
    })

    return NextResponse.json({ expenseDeleted })
  } catch (error) {
    console.log('[EXPENSE_DELETE]', error);
    return NextResponse.json({ error: "Internal Error [custom/personalizado]" }, { status: 500 });
  }
}