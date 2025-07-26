export async function GET() {
  const res = await fetch("https://zenquotes.io/api/random")
  const data = await res.json()
  return Response.json(data[0])
}
