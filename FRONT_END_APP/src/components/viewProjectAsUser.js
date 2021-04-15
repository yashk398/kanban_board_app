import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios").default;

export default function ViewProjectUser(props) {
  const userId = props.user.userId;
  const projectId = 105;
  // const [access, viewProjectsAccess] = useState(false);
  // const [access, viewProjectsAccess] = useState(false);
  const [projectList, setProjects] = useState([]);

  
  console.log(userId);
  console.log(projectList);
  let history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/kanban_board/getprojectdetails/", {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setProjects(response.data.projectList);
      });
    }, [userId])

  return (
    <body class="">
      <div class="container">
        <div class="card">
          <div class="card-body">
            <h5 class="card-tittle">Projects Details</h5>
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">Project Id</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Password</th>
                  
                  <th scope="col">Status</th>

                  <th class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{projectList[0]!==undefined?projectList[0].projectId:null}</td>
                  <td>{projectList[0]!==undefined?projectList[0].projectName:null}</td>
                  <td>{projectList[0]!==undefined?projectList[0].projectPassword:null}</td>
                  <td>{projectList[0]!==undefined?projectList[0].projectStatus+' %':null}</td>
                  <td class="text-right">
                    <button
                      class="btn btn-success badge-pill"
                      onClick={() => {
                        history.push(`/manageProject/${projectId}`);
                      }}
                    >
                      Manage
                    </button>
                    &nbsp;
                    <button class="btn btn-danger badge-pill">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <div class="container ">
        <div class="row proejct-card table-view-point">
         
          <div class="col-md-10 table-padding">
            <div class="table-wrapper">
              <div class="table-tittle">
                <div class="row">
                  <div class="col-sm-4">
                    <h5 class="text-left">List of Projects</h5>
                  </div>
                  <div class="col-md-4"></div>
                </div>
                <table class="table table-stripped table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Project Name</th>
                      <th>Description</th>
                      <th>Actions</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr data-status="active">
                      <td>24</td>
                      <td>Varma</td>
                      <td>45654534</td>
                      <td>
                        
                          <button type="button" class="btn btn-success">
                            Delete
                          </button>
                          </td>
                          <td>
                        
                        <button type="button" class="btn btn-success">
                          Manage
                        </button>
                        </td>
                         
                     
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </body>
  );
}
