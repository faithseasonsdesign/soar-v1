
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//generate random password
const generateTemporaryPassword = () => {
  const length = 16;

  // Character pools
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialCharacters = "!@.";

  // Ensure the password contains at least one character from each category
  let password = [
    uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)],
    lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    specialCharacters[Math.floor(Math.random() * specialCharacters.length)],
  ];

  // Fill the remaining characters randomly from all categories
  const allCharacters =
    uppercaseLetters + lowercaseLetters + numbers + specialCharacters;

  while (password.length < length) {
    password.push(
      allCharacters[Math.floor(Math.random() * allCharacters.length)]
    );
  }

  // Shuffle the password to randomize character positions
  password = password.sort(() => Math.random() - 0.5);

  // Join the array into a string and return
  return password.join("");
};

//generate random 5 numbers OTP
const generateOTPNumber = () => {
    const otp = Math.floor(10000 + Math.random() * 90000);
    return otp.toString();
};
  

const registrationEmail = async (
    userEmailAddress,
    userFirstName,
    userLastName,
    tempPassword
  ) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "reba1faith26@gmail.com", //email client basically
        pass: "xkbr tbod jyru hiwc", // Replace with environment variables for security
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    });
  
    const mailOptions = {
      from: "SOAR <no-reply@soarv1.com>",
      to: userEmailAddress,
      subject: "SOAR | Registration Confirmation",
      html: `
              <html>
          <head>
          <style>
              body {
                      font-family: 'Arial', sans-serif;
                      background-color: #f5f5f5;
                      padding: 20px;
                      margin: 0;
                  }
  
                  .container {
                      width: 100%;
                      max-width: 600px;
                      background-color: white;
                      padding: 20px;
                      border-radius: 10px;
                      margin: 0 auto;
                      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Prominent shadow */
                      border:solid 2px #0090D2;
                  }
  
                  .header {
                      font-size: 24px;
                      text-align: center;
                      margin-bottom: 20px;
                      background: linear-gradient(to right, #0057ED, #0a1df2 56%, #00bde7);
                      background-clip: text;
                      -webkit-text-fill-color: transparent; 
                      font-weight: 670;
                  }
  
                  .message {
                      font-size: 16px;
                      color: #333;
                      text-align: center;
                      margin-bottom: 20px;
                  }
  
                  .password-box {
                      display: inline-block;
                      padding: 10px 15px;
                      font-size: 18px;
                      background-color: #f0f0f0;
                      border: 1px solid #ccc;
                      border-radius: 5px;
                      color: #333;
                      font-weight: bold;
                      margin-bottom: 20px;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for focus */
                  }
  
                  .footer {
                      font-size: 14px;
                      color: #888;
                      text-align: center;
                      margin-top: 20px;
                  }
  
                  .footer a {
                      color: #0090D2; /* Hyperlink styling */
                      text-decoration: none;
                  }
  
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">Welcome to SOAR (Student Opportunities And Resources)!</div>
                  <div class="message">
                      <p>Hello ${userFirstName} ${ userLastName},</p>
                      <p>Thank you for registering with SOAR. You have been successfully registered!</p>
                      <p>Your temporary password is:</p>
                      <div class="password-box">${tempPassword}</div>
                      <p>Please log in and update your password as soon as possible for security purposes.</p>
                  </div>
                  <div class="footer">
                      <p>Regards,</p>
                      <p><strong>SOAR Team</strong></p>
                  </div>
              </div>
          </body>
  </html>
  
          `,
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", info.response);
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
};
    
  

module.exports = {
    generateTemporaryPassword,
    generateOTPNumber,
    registrationEmail
}
