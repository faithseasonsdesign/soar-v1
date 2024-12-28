


import JobsComponent from './micro-components/JobsComponent';
import './OpportunitiesSection.css';

//create a seperate component for loading actual jobs

export default function OpportunitiesSection(){
    return(
        <div className="container-fluid opportunities-section-parent-wrapper py-5">
            <div className="container opportunities-section-child-wrapper py-3">
                <div className="opportunities-content-wrapper">
                    <h2 className="opportunities-main-heading text-white">
                        Available Roles
                    </h2>
                    <JobsComponent/>
                </div>
            </div>
        </div>
    );
}