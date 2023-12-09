import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"
import { EnterpriseType } from "@prisma/client";

export async function GET(
  req:  Request
) {
  const enterprises = await prismadb.enterprise.findMany()
  return NextResponse.json({ enterprises });
}

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(
  req: Request
) {

  const { name, email, type, description } = await req.json();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "email is not valid" }, { status: 400 });
  }

  // Este hazlo con chat gpt para que vean como hacerlo
  if (!Object.values(EnterpriseType).includes(type)) {
    return NextResponse.json({ error: "Invalid enterprise type" }, { status: 400 });
  }

  const enterprise = await prismadb.enterprise.create({
    data: {
      name,
      email,
      type,
      description,
    }
  })

  // console.log("ENTROOO 2")

  return NextResponse.json({ enterprise }, { status: 201 });
}