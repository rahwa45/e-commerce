import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const url = `https://e-commerce-fgwd.vercel.app/api/verify?token=${token}`;

  await transporter.sendMail({
    to: email,
    from: process.env.EMAIL_USER,
    subject: "Verify your email",
    html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`,
  });
};
