// Styled email template
export const EmailTemplate = (code, userName = "User") => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding: 20px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px 10px 0 0;
          margin: -20px -20px 0 -20px;
          padding: 30px;
        }
        .header h1 {
          color: white;
          margin: 0;
          font-size: 28px;
        }
        .content {
          padding: 30px;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .message {
          margin-bottom: 25px;
          color: #555;
        }
        .code-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          margin: 30px 0;
        }
        .verification-code {
          font-size: 48px;
          font-weight: bold;
          letter-spacing: 8px;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.2);
          display: inline-block;
          padding: 15px 30px;
          border-radius: 10px;
          font-family: 'Courier New', monospace;
        }
        .warning {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
          font-size: 14px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #888;
          border-top: 1px solid #eee;
          margin-top: 20px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 15px;
        }
        @media only screen and (max-width: 600px) {
          .container {
            width: 100%;
            margin: 10px;
          }
          .verification-code {
            font-size: 32px;
            letter-spacing: 4px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Email Verification</h1>
        </div>
        <div class="content">
          <div class="greeting">
            Hello <strong>${userName}</strong>!
          </div>
          <div class="message">
            Thank you for registering with us. Please use the verification code below to complete your account verification.
          </div>
          <div class="code-container">
            <div style="color: rgba(255,255,255,0.9); margin-bottom: 10px;">Your Verification Code:</div>
            <div class="verification-code">${code}</div>
          </div>
          <div class="message">
            This code will expire in <strong>10 minutes</strong>. Please enter it on the verification page to activate your account.
          </div>
          <div class="warning">
            ⚠️ <strong>Security Notice:</strong> Never share this code with anyone. Our team will never ask for this code.
          </div>
          <div style="text-align: center;">
            <p>Or copy this code: <strong style="font-size: 18px;">${code}</strong></p>
          </div>
        </div>
        <div class="footer">
          <p>If you didn't create an account with us, please ignore this email.</p>
          <p>&copy; 2024 Your App Name. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
