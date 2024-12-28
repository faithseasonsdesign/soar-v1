import "./JobsComponent.css";

export default function JobsComponent() {

  const jobListings = [
    {
      role: "Intern Software Engineer",
      company: "Standard Bank",
      location: "Johannesburg",
      type:"Contract"
    },
    {
      role: "Intern UX | UI Designer",
      company: "Amazon",
      location: "Cape Town",
      type:"Full-Time"
    },
    {
        role: "Intern Copywriter",
        company: "Accenture",
        location: "Johannesburg , Midrand",
        type:"Contract"
      },
  ];

  return (
    <>
      <div className="container jobs-component-parent-wrapper mt-4 py-3">
        <div className="row gx-3 gy-2 jobs-component-row-wrapper">
          {jobListings.map((job, index) => (
            <div key={index} className="card col-12 col-sm-12 col-md-7">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="">
                    <h5 className="jobs-role-name">{job.role}</h5>
                    <h6 className="jobs-company-name">
                      <i className="fa-solid fa-building"></i>  {job.company} , <i class="fa-solid fa-location-dot"></i> {job.location}
                    </h6>
                    
                  </div>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm px-5 py-3 text-white jobs-apply-btn">
                      APPLY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
