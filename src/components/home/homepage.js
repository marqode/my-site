import React from "react";
// import { Link } from "react-router-dom";
/* eslint-disable import/no-unresolved */
// import portrait from "../../../media/portrait.jpg";
import Upwork from "./upwork.jpeg";
import FloorPlan from "./floorplan.png";
import STEMPage from "./stem_table.png";

const HomePage = () => (
  <>
    <div className="jumbotron">
      <h1>Marc Bucchieri</h1>
      <p>
        Thanks for visiting my site! I am an educator, freelance developer, and
        mechanical designer, outdoor adventurer and node in the human network. I
        created this space to house my portfolio and some personal projects.{" "}
        {"I'm"} fascinated by the fundamental science behind art and music and
        the ways people connect and learn from one another. Feel free to reach
        out if {" you'd"} like to collaborate on a project!
      </p>
      <br />
      <p>Check out the cards below for some of my recent works.</p>
    </div>
    <div className="container-fluid">
      <div className="row justify-content-center">
        {/* <div className="col xs={6} md={4}"> */}
        <div className="col-md-4">
          <div className="card project-card">
            <img src={Upwork} className="card-img-top" alt="Upwork Profile" />
            <h5 className="card-title">Freelance Work</h5>
            <p className="card-text">
              I work primarily with web development clients on projects ranging
              from social media platforms to healthcare systems.
            </p>
            <a
              href="https://www.upwork.com/o/profiles/users/~0159865d28fe088b77/"
              className="btn btn-primary"
            >
              View My Profile
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card project-card">
            <img
              src={FloorPlan}
              className="card-img-top"
              alt="House Floorplan"
            />
            <h5 className="card-title">CAD Models</h5>
            <p className="card-text">
              I like modeling things, from small complex parts to building
              designs and floor plans. Happy contributor to many a project
              involving intricate mechanics and rapid prototyping.
            </p>
          </div>
        </div>
        {/* <div className="col xs={6} md={4}"> */}
        <div className="col-md-4">
          <div className="card project-card">
            <img
              src={STEMPage}
              className="card-img-top"
              alt="STEM Activity Site"
            />
            <h5 className="card-title">STEM Activity Site</h5>
            <p className="card-text">
              This website helps teachers from rural areas to find STEM
              activities for their classes! The table is populated by educators
              and allows for comprehensive search filters and user comments.
            </p>
            <a
              href="https://www.whitemountainscience.org/stem-resource-site"
              className="btn btn-primary"
            >
              Visit the Site
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
