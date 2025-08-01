import React from "react";
import Tutoring from "./developer.jpeg";
import FloorPlan from "./floorplan.png";
import STEMPage from "./resource-site-thumb.png";

const HomePage = () => (
  <>
    <div className="jumbotron">
      <h1>Marc Bucchieri</h1>
      <p>
        {"I'm"} a software engineer and educator with a passion for equitable tech education. As a former Managing Director of an EdTech company, I recognize the challenges present in delivering inclusive educational products to students of all backgrounds. When not coding or teaching, I love getting outside to rock climb, ski, or ride bikes. At home I enjoy cooking, playing music, and spending time with my dog Tuna.
      </p>
    </div>
    <div className="container-fluid">
      <div className="row justify-content-center d-flex">
        <div className="col-md-4 d-flex">
          <div className="card project-card d-flex flex-column w-100">
            <h5 className="card-title">Online Tutoring</h5>
            <img src={Tutoring} className="card-img-top" alt="Online Tutoring" />
            <div className="card-body d-flex flex-column">
              <p className="card-text">
                I teach students of all ages skills from basic programming to web development and machine learning.
              </p>
              <a
                href="/lessons"
                className="btn btn-primary mt-auto"
              >
                Request a Trial Lesson
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex">
          <div className="card project-card d-flex flex-column w-100">
            <h5 className="card-title">STEM Activity Site</h5>
            <img
              src={STEMPage}
              className="card-img-top"
              alt="STEM Activity Site"
            />
            <div className="card-body d-flex flex-column">
              <p className="card-text">
                This website helps teachers from rural areas to find STEM
                activities for their classes! The table is populated by educators
                and allows for comprehensive search filters and user feedback.
              </p>
              <a
                href="https://www.whitemountainscience.org/stem-resource-site"
                className="btn btn-primary mt-auto"
              >
                Visit the Site
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-4 d-flex">
          <div className="card project-card d-flex flex-column w-100">
            <h5 className="card-title">CAD Models</h5>
            <img
                src={FloorPlan}
                className="card-img-top"
                alt="Sinesthesia"
            />
            <div className="card-body d-flex flex-column">
              <p className="card-text">
                I like modeling things, from small complex parts to building
                designs and floor plans. Happy contributor to many a project
                involving intricate mechanics and rapid prototyping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
