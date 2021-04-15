
import {useState,useEffect} from 'react';
const axios = require("axios").default;

export default function AddTeamLead(props){ 

  const [project, setproject] = useState({});
  const projectId = props.project.projectId;
 
  const addTeamLead = {
    projectEntity: {
      projectId: project.projectId,
      projectPassword: project.projectPassword,
    },
    teamLeaderName: "",
    employeeId: "",
  };

  const [addLead, setaddLeadMember] = useState(addTeamLead);

  const details = {
    teamLeaderName: addLead.teamLeaderName,
    employeeId: addLead.employeeId,
    projectEntity: props.project
  };


  const handleInput1 = (e) => {
    var { name, value } = e.target;
    setaddLeadMember({
      ...addLead,
      [name]: value,
    });
  };
  const handleInput2 = (e) => {
    var { name, value } = e.target;
    setaddLeadMember({
      ...addLead,
      [name]: value,
    });
  };

  const saveTeamLead = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/kanban_board/addteamlead/", details)
      .then((response) => {
        console.log(response.data, details);
        if (response.data.message !== null ) {

          alert("Team Leader Added successfully");
          console.log(response.data);
        } else {
          alert("Something went wrong : Fail to Add");
        }
      });
  };
    return (
        <div class="row">
        <div class="col-md-3">

        </div>
        <div class="col-md-6">
        <form>
        <h4 class="text-left">Add Team Lead </h4>
        <h4 class="border-bottom border-color"></h4>
        <div class="form-group col-md-12">
          <input
            type="text"
           
            class="form-control"
            placeholder="Enter Name"
            name="teamLeaderName"
              onChange={handleInput1}
            required
          ></input>
        </div>
        <div class="form-group col-md-12 login-field">
          <input
            type="number"
           
            class="form-control"
            placeholder="Employee Id"
            name="employeeId"
              onChange={handleInput2}
            required
          ></input>
        </div>
        
        <div class="form-group col-md-12 login-field">
          <button
            class="btn btn-success form-control signup-button "
            onClick={(e)=>saveTeamLead(e)}
          >
            Submit
          </button>
        </div>
      </form>
      </div>
    </div> 
    
    )

  
}