export const forgotPassHtml = (code, link) => {
  const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Verification Code</title>
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
              <h1>Password Reset Verification Code</h1>
              <p>Dear User,</p>
              <p>Verification Code is:</p>
              <p class="verification-code">${code}</p>
              <p>We've received your request to reset your password for your account. To ensure the security of your account, we've generated a one-time verification code. Please use this code to proceed with your password reset or click here : ${link}</p>
              <p>Thank you for using our service.</p>
          </div>
      </body>
      </html>`;

  return html;
};
