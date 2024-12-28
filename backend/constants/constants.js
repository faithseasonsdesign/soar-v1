


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
  

  

module.exports = {
    generateTemporaryPassword,
    generateOTPNumber
}
