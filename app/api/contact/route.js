import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  // Create a transporter object using your email service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rahwa3113@gmail.com",
      pass: "qzvyiffaxqzvzhex",
    },
  });

  // Set up email data
  const mailOptions = {
    from: email,
    to: `${email}, rahwaraki11@gmail.com`,
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Message sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to send message." }),
      { status: 500 }
    );
  }
}
