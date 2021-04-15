import { useState, useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import {Modal, Button, Tab, Tabs} from 'react-bootstrap';
import ManageProject from "./manageTasks";
import AddTeamLead from "./addTeamLead";
import AddTeamMember from "./addTeamMember";
import ViewTeamLeader from "./viewTeamLead";
import ViewTeamMembers from "./viewTeamMembers";
const axios = require("axios").default;
export default function ListProjects(props) {
  const userId = props.id;
  // const projectId = match.id;
  // const [access, viewProjectsAccess] = useState(false);
  
  const [projectList, setProjects] = useState([]);
  const [propsProject, setPropsProject] = useState([]);
  const [deleteprojectList,setProjectDelete] =useState({});


// MODAL FOR ACTIONS
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  
  console.log(userId);
  console.log(projectList);
  let history = useHistory();

 useEffect(() => {
    axios
      .get("http://localhost:8080/api/kanban_board/getprojectdetails", {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setProjects(response.data.projectList);
      });
      if (deleteprojectList !== null) {
        axios
          .delete("http://localhost:8080/api/kanban_board/deletetproject", {
            params: {
              projectId : deleteprojectList.projectId,
            },
          })
          .then((response) => {
            
          });
      }
    }, [userId, deleteprojectList]);

    const [count, setCount] = useState(0)

    async function refresh(e){
      axios
      .get("http://localhost:8080/api/kanban_board/getprojectdetails", {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        setProjects(response.data.projectList);
      });
    }

    const onClickHandler = event => {
        setCount(count => count + 1)
    }

  return (
    <body class="">
      <div class="container">
        <div class="card">
          <div class="card-body">
            <h5 class="card-tittle">Projects Details</h5>
            <button  onClick={(e)=>refresh()}>Refresh</button>
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
                {
               projectList.map(project=>
               
                <tr key={project.id}>
                  <td>{project.projectId}</td>
                  <td>{project.projectName}</td>
                  <td>{project.projectPassword}</td>
                  <td>{project.projectStatus}</td>
                  <td class="text-right">
                    <button
                      class="btn btn-success badge-pill"
                      onClick={() =>            
                        {handleShow(); setPropsProject({projectId: project.projectId, projectName: project.projectName, projectPassword: project.projectPassword, projectDescription: project.projectDescription, startDate: project.startDate, endDate: project.endDate, projectStatus: project.projectStatus, userEntity: project.userEntity})}
                      }
                    >
                      Manage
                    </button>
                    &nbsp;
                    <button class="btn btn-danger badge-pill" 
                          onClick={() => {
                            setProjectDelete(project);
                          }}
                           >
                          Delete</button>
                  </td>
                </tr>
               )}
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




      {/* MODAL */}


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Add Team Lead">
                                <br></br>
                                <AddTeamLead project={propsProject}/>
                        </Tab>
                        <Tab eventKey="profile" title="Add Team Members">
                                <br></br>
                                <AddTeamMember project={propsProject}/>
                        </Tab>
                        <Tab eventKey="contact" title="View Team">
                                <br></br>
                                <ViewTeamLeader id={propsProject.projectId}/>
                                <ViewTeamMembers id={propsProject.projectId}/>
                        </Tab>
                </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
    </body>
  );
}
