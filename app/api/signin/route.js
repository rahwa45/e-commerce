import { connectDB } from "../../lib/mongodb";
import Client from "../../lib/mail";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectDB();

    const user = await Client.findOne({ email });
    if (!user) return new Response("User not found", { status: 404 });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return new Response("Invalid credentials", { status: 401 });

    return new Response("Login successful", { status: 200 });
  } catch (error) {
    console.error("Signin error:", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
