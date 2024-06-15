import { UserService } from "@/services";
import { headers } from 'next/headers'

export async function GET() {
    const headersList = headers()
    const id = headersList.get('id')!
    const result = await UserService.getCurrentUser(id);
    if(result.isError) return Response.json(result.message, {status: 500});
    return Response.json(result.data)
}

export async function PUT(req: Request) {
    const headersList = headers()
    const id = headersList.get('id')!
    const body = await req.json();
    const result = await UserService.updateUser(id, body)
    if(result.isError) return Response.json(result.message, {status: 400});

    return Response.json(result.data);
}