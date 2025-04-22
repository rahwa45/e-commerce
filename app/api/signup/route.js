import { connectDB } from "../../lib/mongodb";
import Client from "../../models/Client";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../../lib/mail";

export async function POST(req) {
  const { email, password } = await req.json();
  await connectDB();

  const exists = await Client.findOne({ email });
  if (exists) return new Response("Email already used", { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await Client.create({ email, password: hashedPassword });

  await sendVerificationEmail(email, user._id.toString());
  return new Response("Verification email sent", { status: 201 });
}
