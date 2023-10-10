const { createTransport } = require("nodemailer");

const transporter = createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export const sendMail = async (to, subject, code) => {
  try {
    await transporter.sendMail({
      from: process.env.USER,
      to,
      subject,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification Code</title>
    <style>
        /* Add your custom CSS styles here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
        }
        .verification-code {
          text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Email Verification Code</h1>
        <p>Dear User,</p>
        <p>Your verification code is:</p>
        <p class="verification-code">${code}</p>
        <p>Please use this code to verify your email address or click this link to verify</p>
        <p>If you didn't request this code, you can safely ignore this email.</p>
        <p>Thank you for using our service.</p>
    </div>
</body>
</html>`,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log(error);

    throw new Error("Failed to send email");
  }
};
