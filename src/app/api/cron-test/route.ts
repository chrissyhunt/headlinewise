export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${process.env.ENDPOINT_TOKEN}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  return Response.json({ message: "Hello" });
}
