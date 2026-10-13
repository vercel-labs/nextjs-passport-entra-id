import { readVisitor } from "@/lib/identity";

export async function GET(request: Request) {
  const visitor = await readVisitor(request.headers);
  const headers = { "Cache-Control": "private, no-store" };
  if (!visitor) {
    return Response.json({ authenticated: false }, { status: 401, headers });
  }
  return Response.json(
    {
      authenticated: !visitor.demo,
      demo: visitor.demo,
      user: { id: visitor.id, name: visitor.name, email: visitor.email },
    },
    { headers },
  );
}
