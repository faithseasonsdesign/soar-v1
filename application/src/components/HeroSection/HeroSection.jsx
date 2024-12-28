
import './HeroSection.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function HeroSection(){

    return (
        <div
            className="hero-section-parent-wrapper">
            <div className="bg-img hero-section-content-wrapper ">
                <div className="mask hero-section-mask d-flex align-items-center justify-content-center justify-content-sm-center justify-content-md-start align-items-sm-center align-items-md-center">
                    <div className="container px-5 px-sm-5 px-md-0">
                        <div className="row gy-4">
                            <div className=" text-center text-sm-center text-md-start">
                                <h2 className="hero-section-heading mt-4 mt-sm-4 mt-md-0 col-12 col-sm-12 col-md-5 text-white">
                                    Student Opportunities & Resources
                                </h2>
                                <p className="hero-section-description text-white col-12 col-sm-12 col-md-6 mt-4">
                                    Providing Opportunities and Resources For Students To Help Get Ahead In Life and Further Their Careers After Universities
                                </p>
                                <div className="hero-section-btn-wrapper d-flex">
                                    <button className="btn btn-md py-2 px-4 mt-3 mt-sm-3 mt-md-4 call-to-action-btn-one">
                                        <Link to='/' className='text-white'>
                                            LEARN MORE
                                        </Link>
                                    </button>
                                    <button className="btn btn-md py-2 px-4 mt-3 mt-sm-3 mt-md-4 call-to-action-btn-two">
                                        <Link to='/' className='call-to-action-btn-two-link'>
                                            REGISTER
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}