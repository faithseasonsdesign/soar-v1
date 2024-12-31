

//validate emptyness and valid email
const validateEmailAddress = (emailAddress,setEmailAddressError,setValidEmailAddress)=>{
    if (emailAddress === "") {
        setEmailAddressError("Please Enter Email Address");
        setValidEmailAddress(false);
    } else {
        if(!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(emailAddress)){
            setEmailAddressError("Please Enter Valid Email Address");
            setValidEmailAddress(false);
        }else{
            setEmailAddressError('');
            setValidEmailAddress(true);
        }
    } 
}

//validate emptyness and valid south african phone number
const validatePhoneNumber = (phoneNumber,setPhoneNumberError,setValidPhoneNumber) => {
    if (phoneNumber.trim() === "") {
        setPhoneNumberError("Please Enter Phone Number");
        setValidPhoneNumber(false);
    } else if (!/^0(6|7|8)\d{8}$/.test(phoneNumber) && !/^\+27(6|7|8)\d{8}$/.test(phoneNumber)) {
        setPhoneNumberError("Please Enter a Valid South African Phone Number");
        setValidPhoneNumber(false);
    } else if (phoneNumber.startsWith("0") && phoneNumber.length !== 10) {
        setPhoneNumberError("Phone Number Length Must Be 10 Digits for Numbers Starting with 0");
        setValidPhoneNumber(false);
    } else if (phoneNumber.startsWith("+27") && phoneNumber.length !== 12) {
        setPhoneNumberError("Phone Number Length Must Be 12 Digits for Numbers Starting with +27");
        setValidPhoneNumber(false);
    } else {
        const formattedNumber = phoneNumber.startsWith("+27")
            ? phoneNumber.replace("+27", "0")
            : phoneNumber;
        setPhoneNumberError("");
        setValidPhoneNumber(true);
    }
    
};

//validate password
const validatePassword = (userPassword,setUserPasswordError,setValidPassword,setPasswordStrength)=>{
    if(userPassword===""){
        setUserPasswordError(`Please Enter Password`);
        setValidPassword(false);
    }else{
        if(userPassword.length<8){
            setUserPasswordError(`Password Length Should Have Minimum Of 8 Characters`);
            setPasswordStrength('weak');
            setValidPassword(false);
        }else{
            setUserPasswordError(``);
            setPasswordStrength(``);
            setValidPassword(true);
        }
    }
}

export {
    validateEmailAddress,
    validatePhoneNumber,
    validatePassword
}