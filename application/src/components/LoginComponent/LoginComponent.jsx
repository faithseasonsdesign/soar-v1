

import './LoginComponent.css';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Snackbar, Button , Alert  } from "@mui/material";
import axios from 'axios';

//util reusable functions
import {validateEmailAddress  , validatePassword} from '../../utils/utils';

export default function LoginComponent(){

    const [loginLoading,setLoginloading] = useState(false);

    const [userUsername, setUserUsername] = useState('');
    const [userUsernameError , setUserUsernameError] = useState('');
    const [validUsername,setValidUsername] = useState(false);

    const [userPassword,setUserPassword] = useState('');
    const [userPasswordError,setUserPasswordError] = useState();
    const [validPassword,setValidPassword] = useState(false);
    const [passwordStrength,setPasswordStrength] = useState('');

    //snackbar component
    const [open, setOpen] = useState(false);
    const [severity , setSeverity] = useState('');
    const [message,setMessage] = useState('');
    const [color,setColor] = useState('');


    const handleLogin = async ()=>{
        
        if(userUsername==="" || userPassword===""){
            
            setMessage(`Please Fill All Inputs Field`);
            setSeverity('danger');
            setColor('red');
            setOpen(true);

            validateEmailAddress(userUsername,setUserUsernameError,setValidUsername);
            validatePassword(userPassword,setUserPasswordError,setValidPassword,setPasswordStrength);
            

        }else{
            //non-empty
        }
    }

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleClose = ()=>{
        setOpen(false);
    }

    return(
        <div className="container-fluid login-component-parent-wrapper py-4">
            <div className="container login-component-child-wrapper py-3">
                <div className="login-component-content-wrapper d-flex justify-content-center align-items-center">
                    <div className='col-12 col-sm-12 col-md-6 bg-white shadow-lg rounded py-5'>
                        <div className="row d-flex justify-content-center gy-3">
                            <h2 className="login-component-main-heading text-center">
                                Login
                            </h2>
                            <p className="login-component-description text-center mt-3">
                                Don't Have An Account ? &nbsp;
                                <Link to='/' className='register-right-component-link'>
                                    Register
                                </Link>
                            </p>
                            <div className="col-12 col-sm-12 col-md-8">
                                <p className="login-component-label text-center">
                                    Username <span className="text-danger">*</span>
                                </p>
                                <input 
                                    type="text" 
                                    className="form-control py-3 text-center" 
                                    placeholder='Enter username'
                                    value={userUsername}
                                    onChange={(e)=>{
                                        setUserUsername(e.target.value)
                                        e.target.value===""? setUserUsernameError('Please Enter Username') : setUserUsernameError('')
                                        validateEmailAddress(e.target.value,setUserUsernameError,setValidUsername);
                                    }}
                                />
                                {/* username error */}
                                {
                                    userUsernameError!="" ? 
                                    <p className="text-danger text-center mt-3">{userUsernameError}</p>:''
                                }
                            </div>
                            <div className="col-12 col-sm-12 col-md-8">
                                <p className="login-component-label text-center">
                                    Password <span className="text-danger">*</span>
                                </p>
                                <div className="login-password-input-wrapper border border-1 rounded-2">
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        className="py-3 col-11 login-component-input px-3 text-center"
                                        placeholder="Enter your password"
                                        value={userPassword}
                                        onChange={(e)=>{
                                            setUserPassword(e.target.value)
                                            e.target.value===""? setUserPasswordError(`Please Enter Password`) : setUserPasswordError(``);
                                            validatePassword(e.target.value,setUserPasswordError,setValidPassword,setPasswordStrength);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-link col-1 p-0"
                                        onClick={togglePasswordVisibility}
                                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                                    >
                                        <i
                                            className={`fa ${isPasswordVisible ? "fa-eye-slash" : "fa-eye"}`}
                                        ></i>
                                    </button>
                                </div>

                                {/* password streng start  here */}
                                
                                {/* password strength ended here */}

                                {/* password error */}
                                {
                                    userPasswordError!=""?
                                    <p className="text-danger text-center mt-3">{userPasswordError}</p>:''
                                }
                                <p className="login-component-description text-center mt-3">
                                    Forgot password ? &nbsp;
                                    <Link to='/' className='register-right-component-link'>
                                        Recover it here
                                    </Link>
                                </p>
                            </div>
                            <div className="col-12 col-sm-12 col-md-8">
                                <button 
                                    className="btn btn-md w-100 py-3 text-white bg-primary rounded-1"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* snackbar component start */}
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
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
    );
}