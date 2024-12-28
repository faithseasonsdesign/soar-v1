
import { Link } from 'react-router-dom';
import './AboutSection.css';

export default function AboutSection(){
    return(
        <div className="container-fluid about-section-parent-wrapper py-5">
            <div className="container about-section-child-wrapper py-5">
                <div className="about-section-content-wrapper">
                    <h2 className="about-section-main-heading col-12 col-sm-12 col-md-6">
                        Designed & Developed For Graduates by Graduates
                    </h2>
                    <p className='about-list mt-4 py-3 about-section-description-text-two col-12 col-sm-12 col-md-6'>
                        To empower students and graduates
                        with the tools , opportunities , and resources they need to succeed in today’s competitive world.
                    </p>
                    <div className="about-section-btn-wrapper">
                    <button className="btn btn-md py-2 px-4 mt-3 mt-sm-3 mt-md-3 about-call-to-action-btn-two rounded-1">
                        <Link to='/' className='text-white'>
                            REGISTER NOW
                        </Link>
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}