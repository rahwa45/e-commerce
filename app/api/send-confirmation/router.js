import nodemailer from "nodemailer";

export async function POST(req) {
  const { email, amount } = await req.json();
  console.log("Received:", { email, amount });

  if (!email || !amount) {
    return new Response("Missing email or amount", { status: 400 });
  }

  // Create a transporter object using your email service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);
  // Set up email data
  const mailOptions = {
    from: email,
    to: `${email}`,
    subject: "Your Order Confirmation - Rahwa's Jewelry Store",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>💍 Thank you for your purchase!</h2>
        <p>We're excited to let you know we received your payment of <strong>$${amount}</strong>.</p>
        <p>You'll get another email when your order ships.</p>
        <p style="margin-top: 20px;">With love, <br/> <strong>Rahwa's Jewelry Store</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Confirmation email sent!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending failed:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send confirmation email." }),
      { status: 500 }
    );
  }
}
