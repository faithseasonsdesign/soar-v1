

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Snackbar, Button , Alert  } from "@mui/material";

import './RegisterComponent.css';
import registerImage from './image/register-small-image.png';
import axios from 'axios';


export default function RegisterComponent(){

    //snackbar state
    const [open, setOpen] = useState(false);
    const [severity , setSeverity] = useState('');
    const [message,setMessage] = useState('');
    const [color,setColor] = useState('');

    //variables start here

    const APP_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const REGISTER_USER_END_POINT = process.env.REACT_APP_API_REGISTER_USER_END_POINT;

    const [firstName,setFirstName] = useState('');
    const [firstNameError,setFirstNameError] = useState('');
    
    const [lastName,setLastName] = useState('');
    const [lastNameError,setLastNameError] = useState('');

    const [emailAddress,setEmailAddress] = useState('');
    const [emailAddressError,setEmailAddressError] = useState('');
    const [validEmailAddress,setValidEmailAddress] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError , setPhoneNumberError] = useState('');
    const [validPhoneNumber,setValidPhoneNumber] = useState(false);


    const [countryName,setCountryName] = useState('');
    const [countryNameError , setCountryNameError] = useState('');

    const [locationName,setLocationName] = useState('');
    const [locationNameError , setLocationNameError] = useState('');

    const [courseName,setCourseName] = useState('');
    const [courseNameError,setCourseNameError] = useState('');

    const [courseSpecialization,setCourseSpecialization] = useState('');
    const [courseSpecializationError,setCourseSpecializationError] = useState('');

    const [registerloading ,setRegisterLoading] = useState(false);

    const handleClose = ()=>{
        setOpen(false);
    }

    const validateEmailAddress = ()=>{
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

    const validatePhoneNumber = () => {
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
    


    const handleRegister = async ()=>{
    
        //validate emptyness
        if(firstName  ==="" || lastName==="" || emailAddress==="" || phoneNumber==="" || countryName === "Select Country" || locationName ==="" || courseName ==="" || courseSpecialization ==="")
        {
            
            setMessage(`Please Fill All Inputs Field`);
            setSeverity('danger');
            setColor('red');
            setOpen(true);

            firstName ==="" ? setFirstNameError(`Please Enter First Name`) : setFirstNameError(``);
            lastName  ==="" ? setLastNameError(`Please Enter Last Name`) : setLastNameError(``);

            //validate emptyness + valid email
            validateEmailAddress();
            
            //validate emptyness + valid south african phone number 
            validatePhoneNumber();

            countryName  === "Select Country"  ? setCountryNameError(`Please Select Country`) : setCountryNameError(``);
            locationName === "" ?  setLocationNameError(`Please Enter Location Name`) : setLocationNameError(``);

            courseName === "" ? setCourseNameError(`Please Enter Course Name`) : setCourseNameError(``);
            courseSpecialization === "" ? setCourseSpecializationError(`Please Enter Course Specialization`) : setCourseSpecializationError(``);


        }else{
            //everything is entered
            if(!validPhoneNumber || !validEmailAddress){
                setMessage(`Failed To Register You`);
                setSeverity('danger');
                setColor('red');
                setOpen(true);  
                //check email address
                if(!validEmailAddress){
                    setEmailAddressError(`Please Enter Valid Email Address`);
                }else{
                    setEmailAddressError(``);
                }
                //check phone number
                if(!validPhoneNumber){
                    setPhoneNumberError(`Please Enter Valid South African Phone Number`);
                }else{
                    setPhoneNumberError('');
                }
            }else{
                //access all the information and pass it to the backend
                const userInformation = {
                    userFirstName : firstName,
                    userLastName : lastName,
                    userEmailAddress : emailAddress,
                    userPhoneNumber : phoneNumber,
                    userCountry: countryName,
                    userLocation : locationName,
                    userNameOfCourse : courseName,
                    userCourseSpecialization : courseSpecialization,
                    userPassword : ``,
                    userOTP : ``
                }
                console.log(`Graduate Information :`, userInformation);

                //send information to the backend    
                setRegisterLoading(true);            
                try{
                    const response = await axios.post(`/soar-v1/api/registerUser`, { userInformation });
                    if(response.data.success){
                        if(response.data.status===200){
                            console.log(response.data.interfaceMessage);
                            setMessage(`${response.data.interfaceMessage}`);
                            setSeverity('success');
                            setColor('green');
                            setOpen(true); 
                        }
                    }else{
                       
                        if(response.data.status === 500){
                            console.log(response.data.interfaceMessage);
                            setMessage(`${response.data.interfaceMessage}`);
                            setSeverity('danger');
                            setColor('red');
                            setOpen(true); 
                        }else{
                            setMessage('');
                            setOpen(false);
                        }

                        if(response.data.status === 409){
                            console.log(response.data.interfaceMessage);
                            setMessage(`${response.data.interfaceMessage}`);
                            setSeverity('danger');
                            setColor('red');
                            setOpen(true); 
                            if(response.data.emailAddressExist){
                                console.log(`Email Address Already In Use`);
                                setEmailAddressError(`Email Address Already In Use , Please Try Another One `);
                            }else{
                                setEmailAddressError('');
                            }

                            if(response.data.phoneNumberExist){
                                console.log(`Phone Number Already In Use`);
                                setPhoneNumberError(`Phone Number Already In Use , Please Try Another One`);
                            }else{

                            }
                        }else{
                            setMessage('');
                            setOpen(false);
                        }
                    }
                }catch(error){
                    console.error(`Front-end Catch Error : Failed To Register You : Something Went Wrong : ${error}`);
                }finally{
                    setRegisterLoading(false);
                }

            }
        }
    }


    return(
        <div className="container-fluid register-component-parent-wrapper py-4">
            <div className="container register-component-child-wrapper py-3">
                <div className="container register-component-content-wrapper">
                    <div className="row register-component-row-wrapper bg-white shadow-lg rounded">
                        <div className="col-12 col-sm-12 col-md-4 register-component-left-column px-3 py-5">
                            <h3 className="register-component-main-heading text-white">
                                Join +10 000 Graduates who are using SOAR
                            </h3>
                            <div className="register-component-image-wrapper mt-5">
                                <img src={registerImage} alt="" className="img img-fluid" />
                            </div>
                            <div className="register-component-recommendation-wrapper mt-5 px-3 py-4 rounded-1">
                                <h5 className='register-component-recommendation-heading text-white'>
                                    Best For Recent Graduates !
                                </h5>
                                <p className="register-component-recommendation-description text-white mt-3">
                                    Best Platform For Graduates Who Are Looking To Find Reliable Internship , Graduate , and Learnership Opportunities and Resources To Stay Ahead
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-8 register-component-right-column px-5 py-5">
                            <h2 className="register-component-right-main-heading">
                                Register
                            </h2>
                            <p className="register-component-right-description mt-4">
                                Already Have An Account ? &nbsp;
                                <Link to='/' className='register-right-component-link'>
                                    Log in
                                </Link>
                            </p>
                            <div className="register-component-right-form-wrapper row gx-1 mt-5">
                                <div className="col-12 col-sm-12 col-md-6">
                                    <p className="register-component-label">
                                        First Name <span className="text-danger">*</span>
                                    </p>
                                    <input 
                                        type="text" 
                                        className="form-control py-3 px-3 rounded-1"
                                        //placeholder='eg. Elon'
                                        value={firstName}
                                        onChange={(e)=>{
                                            setFirstName(e.target.value)
                                            e.target.value==="" ? setFirstNameError('Please Enter First Name') : setFirstNameError(''); 
                                        }}
                                    />
                                    {/* first name error */}
                                    {
                                        firstNameError!="" ? 
                                        <p className="register-error-label text-danger mt-2">{firstNameError}</p>
                                        :''
                                    }
                                </div>
                                <div className="col-12 col-sm-12 col-md-6">
                                    <p className="register-component-label">
                                        Last Name <span className="text-danger">*</span>
                                    </p>
                                    <input 
                                        type="text" 
                                        className="form-control py-3 px-3 rounded-1" 
                                        //placeholder='eg Musk'
                                        value={lastName}
                                        onChange={(e)=>{
                                            setLastName(e.target.value);
                                            e.target.value==="" ? setLastNameError('Please Enter LastName') : setLastNameError('')
                                        }}
                                    />
                                    {/* last name error */}
                                    {
                                        lastNameError!="" ? 
                                        <p className="register-error-label  text-danger mt-2 ">{lastNameError}</p> : ""
                                    }
                                </div>
                            </div>
                            <div className="register-component-right-form-wrapper row gx-1 mt-4">
                                <div className="col-12 col-sm-12 col-md-6">
                                    <p className="register-component-label">
                                        Email Address <span className="text-danger">*</span>
                                    </p>
                                    <input 
                                        type="text" 
                                        className="form-control py-3 px-3 rounded-1"
                                        //placeholder='eg elonmusk@gmail.com' 
                                        value={emailAddress}
                                        onChange={(e)=>{
                                            setEmailAddress(e.target.value);
                                            e.target.value==="" ? setEmailAddressError('Please Enter Email Address') : setEmailAddressError('');
                                            validateEmailAddress();
                                        }}
                                    />
                                    {/* email address error */}
                                    {
                                        emailAddressError!== "" ? 
                                        <p className="register-error-label text-danger mt-2">{emailAddressError}</p> : ''
                                    }
                                </div>
                                <div className="col-12 col-sm-12 col-md-6">
                                    <p className="register-component-label">
                                        Phone Number <span className="text-danger">*</span>
                                    </p>
                                    <input 
                                        type="text" 
                                        className="form-control py-3 px-3 rounded-1"
                                        //placeholder='eg +27 74 044 0045' 
                                        value={phoneNumber}
                                        onChange={(e)=>{
                                            setPhoneNumber(e.target.value)
                                            e.target.value==="" ? setPhoneNumberError('Please Enter Phone Number') : setPhoneNumberError('');
                                            if (e.target.value.trim() === "") {
                                                setPhoneNumberError("Please Enter Phone Number");
                                                setValidPhoneNumber(false);
                                            } else if (!/^0(6|7|8)\d{8}$/.test(e.target.value) && !/^\+27(6|7|8)\d{8}$/.test(e.target.value)) {
                                                setPhoneNumberError("Please Enter a Valid South African Phone Number");
                                                setValidPhoneNumber(false);
                                            } else if (e.target.value.startsWith("0") && e.target.value.length !== 10) {
                                                setPhoneNumberError("Phone Number Length Must Be 10 Digits for Numbers Starting with 0");
                                                setValidPhoneNumber(false);
                                            } else if (e.target.value.startsWith("+27") && e.target.value.length !== 12) {
                                                setPhoneNumberError("Phone Number Length Must Be 12 Digits for Numbers Starting with +27");
                                                setValidPhoneNumber(false);
                                            } else {
                                                const formattedNumber = e.target.value.startsWith("+27")
                                                    ? e.target.value.replace("+27", "0")
                                                    : e.target.value;
                                                setPhoneNumberError("");
                                                setValidPhoneNumber(true);
                                            }
                                        }}
                                    />
                                    {/* phone number error */}
                                    {
                                        phoneNumberError!=="" ?
                                        <p className="register-error-label text-danger mt-2">{phoneNumberError}</p> : ''
                                    }
                                </div>
                            </div>
                            <div className="register-component-right-form-wrapper row gx-1 mt-4">
                                <div className="col-12 col-sm-12 col-md-6">
                                    <p className="register-component-label">
                                        Country <span className="text-danger">*</span>
                                    </p>
                                    <select 
                                        className="border-1 border-secondary py-3 rounded-1 col-12 px-2"
                                        value={
                                            countryName===""? setCountryName("Select Country") : countryName
                                        }
                                        onChange={(e)=>{
                                            setCountryName(e.target.value)
                                            e.target.value==="Select Country" ? setCountryNameError(`Please Select Country`) : setCountryNameError('')
                                        }}
                                    >
                                        <option value="Select Country" >Select Country</option>
                                        <option value="South Africa">South Africa</option>
                                        <option value="Botswana">Botswana</option>
                                        <option value="Swaziland">Swaziland</option>
                                        <option value="Lezotho">Lesotho</option>
                                    </select>
                                    {/* country input error */}
                                    {
                                        countryNameError!=="" ? 
                                        <p className="register-error-label text-danger mt-2">{countryNameError}</p> : ''
                                    }
                                </div>
                                <div className="col-12 col-sm-12 col-md-6">
                                    <p className="register-component-label">
                                        Location <span className="text-danger">*</span>
                                    </p>
                                    <input 
                                        type="text" 
                                        className="form-control py-3"
                                        //placeholder='eg Johannesburg , Fourways' 
                                        value={locationName}
                                        onChange={(e)=>{
                                            setLocationName(e.target.value)
                                            e.target.value==="" ? setLocationNameError(`Please Enter Location `) : setLocationNameError(``)
                                        }}
                                    />
                                    {/* location error */}
                                    {
                                        locationNameError!=="" ? 
                                        <p className="register-error-label text-danger mt-2">{locationNameError}</p> : ''
                                    }
                                </div>
                            </div>
                            <div className="register-component-right-form-wrapper row gx-1 mt-4">
                                <div className="col-12 col-sm-12 col-md-6">
                                    <p className="register-component-label">
                                        Name Of Course <span className="text-danger">*</span>
                                    </p>
                                    <input 
                                        type="text" 
                                        className="form-control py-3 px-3 rounded-1"
                                        //placeholder='eg Computer Science' 
                                        value={courseName}
                                        onChange={(e)=>{
                                            setCourseName(e.target.value)
                                            e.target.value==="" ? setCourseNameError(`Please Enter Course Name`) : setCourseNameError(``);
                                        }}
                                    />
                                    {/* course name error */}
                                    {
                                        courseNameError!=="" ? 
                                        <p className="register-error-label text-danger mt-2">{courseNameError}</p> : ''
                                    }
                                </div>
                                <div className="col-12 col-sm-12 col-md-6">
                                    <p className="register-component-label">
                                        Specialization <span className="text-danger">*</span>
                                    </p>
                                    <input 
                                        type="text" 
                                        className="form-control py-3 px-3 rounded-1" 
                                        //placeholder='eg Mobile Development'
                                        value={courseSpecialization}
                                        onChange={(e)=>{
                                            setCourseSpecialization(e.target.value)
                                            e.target.value==="" ? setCourseSpecializationError(`Please Enter Course Specialization`) : setCourseSpecializationError('')
                                        }}
                                    />
                                    {/* course specialization error */}
                                    {
                                        courseSpecializationError!=="" ? 
                                        <p className="register-error-label text-danger mt-2">{courseSpecializationError}</p> : ''
                                    }
                                </div>
                            </div>
                            <div className="register-component-right-form-wrapper row gx-1 mt-4">
                                <div className="col-12 col-sm-12 col-md-12">
                                    <div className="register-component-button-wrapper">
                                    <button
                                        className="register-component-register-btn bg-primary btn btn-sm rounded-0 border-0 text-white py-4 w-100 rounded-1"
                                        onClick={handleRegister}
                                        disabled={registerloading} // Disable the button while loading
                                    >
                                        {registerloading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm  me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                REGISTERING YOU
                                            </>
                                        ) : (
                                            "REGISTER"
                                        )}
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* snackbar component start */}
                    <Snackbar
                        open={open}
                        autoHideDuration={8000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <Alert 
                            onClose={handleClose} severity={severity}
                            sx={{
                                backgroundColor: `${color}`, // Custom red shade
                                color: "#fff", // Text color
                                width: "100%",
                            }} 
                        >
                        {message}
                        </Alert>
                    </Snackbar>
                    {/* snackbar component ended */}
                </div>
            </div>  
        </div>
    );
}