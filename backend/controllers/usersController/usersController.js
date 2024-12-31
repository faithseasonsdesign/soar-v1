

const userModel = require("../../models/usersModels/usersModel");

const nodemailer = require("nodemailer");

const crypto = require("crypto");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");

//functions export start here
const { 
    generateTemporaryPassword , 
    registrationEmail 
} = require("../../constants/constants");

//register function
const registerUser = async (req, res) => {

  const { userInformation } = req.body;

  try {
    console.log(`User Information received:`, userInformation);

    // Generate temporary password and OTP
    const temporaryPassword = generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(temporaryPassword,10); //create hashed password
    userInformation.userPassword = hashedPassword;

    console.log(`Generate Temporary Password  : ${temporaryPassword}`);
    console.log(`Generated Hashed Temporary Password: ${hashedPassword}`);

    //temp password JWT : expire in 1 minute
    //const temporaryPasswordToken = jwt.sign();

    //check if email and phone number are taken

    const informationExist = await userModel.findOne({
        $or: [
            { userPhoneNumber: userInformation.userPhoneNumber },
            { userEmailAddress: userInformation.userEmailAddress }
        ]
    });

    const phoneNumberExist  = await userModel.findOne({userPhoneNumber:userInformation.userPhoneNumber});
    const emailAddressExist = await userModel.findOne({userEmailAddress:userInformation.userEmailAddress});

    var numExist = false;
    var emailExist = false;

    if(informationExist){
        
        if(phoneNumberExist){
            console.error(`Phone Number Is Already In Use Please Try Another One`);
            numExist = true;
        }
        else{
            numExist = false;
        }

        if(emailAddressExist){
            console.error(`Email Address Is Already In Use Please Try Another One`);
            emailExist = true;
        }else{
            emailExist = false;
        }

        return res.json({
            success: false,
            message: `Failed To Register You`,
            interfaceMessage: `Failed To Register You`,
            status: 409,
            emailAddressExist : emailExist,
            phoneNumberExist : numExist,
        })

    }else{
        // Save user information to the database
        const registeredUser = await userModel.create(userInformation);

        if (registeredUser) {
        console.log(`Successfully Registered You . Email: ${userInformation.userEmailAddress}`);

        //send registration email with temporary password

        try{
            const emailResults = await registrationEmail(
                userInformation.userEmailAddress,
                userInformation.userFirstName,
                userInformation.userLastName,
                temporaryPassword,
            );
            console.log(`Registration Email Sent Successfuly :  `,emailResults);
        }catch(error){
            console.error(`Back-end Catch Error : Failed To Send Registration Email : ${error.message}`);
            return res.status(500).json({
                success:false,
                message:`Registered You But Failed To Send Registration Email With Temporary Password`,
                interfaceMessage:`Registered You But Failed To Send Registration Email With Temporary Password`,
                status:500,
                emailAddressExist:false,
                phoneNumberExist: false,
            })
        }

        return res.status(200).json({
            success: true,
            message: `Successfully registered. Please check your email (${userInformation.userEmailAddress}) for the temporary password.`,
            interfaceMessage: `Successfully registered. Please check your email (${userInformation.userEmailAddress}) for the temporary password.`,
            status: 200,
            emailAddressExist : false,
            phoneNumberExist : false,
        });
        } else {
        console.log(`Failed to register user.`);
        return res.json({
            success: false,
            message: `Failed To Register You. Please Try Again In 5 Seconds.`,
            interfaceMessage: `Failed To Register You. Please Try Again In 5 Seconds.`,
            status: 500,
            emailAddressExist : false,
            phoneNumberExist : false,
        });
        }
    }
    
  } catch (error) {
    console.error(`Back-end Catch Error : Error Registering You : `, error);
    return res.status(500).json({
      success: false,
      message: `Back-end Catch Error : Error Registering You : ${error.message}`,
      interfaceMessage: `Failed To Register You , Something went wrong . Please Try Again In 5 Seconds.`,
      status: 500,
      emailAddressExist : false,
      phoneNumberExist : false,
    });
  }
};

const userLogin = async (req,res)=>{}

const validateOTP = async (req,res)=>{}

const forgotPassword = async (req,res)=>{}

const createNewPassword = async (req,res)=>{}

module.exports = {
  registerUser,
  userLogin,
  validateOTP,
  forgotPassword,
  createNewPassword
};
