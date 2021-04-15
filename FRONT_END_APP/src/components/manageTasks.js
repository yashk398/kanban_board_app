import { React, useState } from "react";
import AddTeamLead from "./addTeamLead";
import AddTeamMember from "./addTeamMember";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ViewTeamMembers from "./viewTeamMembers";
import ViewTeamLeader from "./viewTeamLead";

export default function ManageProject() {
  // const [teamLead, setTeamLead] = useState(false);

  const projectId = 105;
  console.log(window.location.pathname);
  return (
    <Router>
      <body class="manage-team-background">
        <div class="container">
         
          {/* <div class="row proejct-card"> */}
          
            <div
              class=" col-md-12 btn-group"
              role="group"
              aria-label="Basic example"
            >
              <Link
                class="nav-link btn btn-success"
                to="/addLead"
                type="button"
              >
                Add Team Lead
              </Link>

              <Link
                class="nav-link btn btn-success"
                to="/addMember"
                type="button"
              >
                Add Team Members
              </Link>
              <Link
                class="nav-link btn btn-success"
                to={`/viewTeamLeader/${projectId}`}
                type="button"
              >
                View Team Lead
              </Link>
              <Link
                class="nav-link btn btn-success"
                to={`/viewTeamMembers/${projectId}`}
                type="button"
              >
                View Team members
              </Link>
            </div>
          </div>
          <div class="row project-card">
            <div class=""></div>
            <div class="col-md-12">
              <Route
                path="/viewTeamMembers/:projectId"
                component={ViewTeamMembers}
              ></Route>
              <Route path="/viewTeamLeader/:projectId" component={ViewTeamLeader}></Route>
            </div>
          </div>
        {/* </div> */}

        <Route path="/addLead" component={AddTeamLead}></Route>
        <Route path="/addMember" component={AddTeamMember}></Route>
      </body>
    </Router>
  );
}
