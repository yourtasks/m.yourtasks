import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export const sendMail = async ({ to, html }) => {
  try {
    await transporter.sendMail({
      from: process.env.USER,
      to,
      html,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);

    throw new Error("Failed to send email");
  }
};
