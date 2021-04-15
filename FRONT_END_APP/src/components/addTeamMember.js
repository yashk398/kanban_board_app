import { useState, useEffect } from "react";
const axios = require("axios").default;

export default function AddTeamMember(props) {
  const [project, setproject] = useState({});
  const projectId = props.project.projectId;

  const addTeamMember = {
    projectEntity: {
      projectId: project.projectId,
      projectPassword: project.projectPassword,
    },
    teamMemberName: "",
    employeeId: "",
  };

  const [addMember, setaddTeamMember] = useState(addTeamMember);

  const details = {
    teamMemberName: addMember.teamMemberName,
    employeeId: addMember.employeeId,
    projectEntity: props.project
  };
  console.log(details);

  const handleInput1 = (e) => {
    var { name, value } = e.target;
    setaddTeamMember({
      ...addMember,
      [name]: value,
    });
  };
  const handleInput2 = (e) => {
    var { name, value } = e.target;
    setaddTeamMember({
      ...addMember,
      [name]: value,
    });
  };
  const saveTeamMember = (e) => {
    e.preventDefault();
    console.log(details);
    axios
      .post("http://localhost:8080/api/kanban_board/addteammember", details)
      .then((response) => {
        if (response.data !== null ) {
          alert("Team Member Added successfully");
        } else {
          alert("Something went wrong : Fail to Add");
        }
      });
  };


  return (
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <form>
          <h4 class="text-left">Add Team Member </h4>
          <h4 class="border-bottom border-color"></h4>
          <div class="form-group col-md-12">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Name"
              name="teamMemberName"
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
            onClick={(e)=>saveTeamMember(e)}
              class="btn btn-success form-control signup-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
