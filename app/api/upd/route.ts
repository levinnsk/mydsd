import { UpdService } from "@/services";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const result = await UpdService.createUpd(body);
  if (result.isError) return Response.json(result.message, { status: 400 });

  return Response.json(result.data, { status: 201 });
}

export async function GET() {
  const headersList = headers();
  const id = headersList.get("id")!;
  const result = await UpdService.getUpds(id);
  if (result.isError) return Response.json(result.message, { status: 500 });
  return Response.json(result.data);
}

// сделать проверку на авторизацию?
export async function DELETE(req: Request) {
  const body = await req.json();
  const result = await UpdService.delUpd(body.id);
  if (result.isError) return Response.json(result.message, { status: 500 });
  return Response.json(result.data);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const idUpd = body.idUpd
  const result = await UpdService.updateUpd(idUpd, body);
  if (result.isError) return Response.json(result.message, { status: 400 });

  return Response.json(result.data, { status: 200 });
}