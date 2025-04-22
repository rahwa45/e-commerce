import { connectDB } from "../../lib/mongodb";
import Client from "../../models/Client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  await connectDB();
  const user = await Client.findOne({ _id: token });

  if (!user) return new Response("Invalid token", { status: 400 });

  user.emailVerified = true;
  await user.save();

  return Response.redirect("http://localhost:3000/login");
}
