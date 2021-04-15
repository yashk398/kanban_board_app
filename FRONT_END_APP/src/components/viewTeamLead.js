import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios").default;

export default function ViewTeamLeader(props) {
  const [teamLead, setTeamLeadList] = useState([]);
  const [teamLeadDelete, setTeamLeadDelete] = useState(null);

  const id = props.id;

  useEffect(() => {
    console.log(id);
    axios
      .get("http://localhost:8080/api/kanban_board/getteamlead/?projectId="+id)
      .then((response) => {
        if (response.data !== null) {
          console.log(response.data);
          setTeamLeadList(response.data.teamLeadEntity);
        } else {
          console.log("No Active Records Found");
        }
      });

    if (teamLeadDelete !== null) {
      axios
        .delete("http://localhost:8080/api/kanban_board/deleteteamlead", {
          params: {
            teamLeaderId: teamLeadDelete.teamLeaderId,
          },
        })
        .then((response) => {
          if (response.data) {
            alert("Are you sure You want to delete : Click again to delete..");
          }
        });
    }
  }, [id, teamLeadDelete]);

  console.log(teamLead);

  return (
    <body class="">
      <div class="container" style={{background: 'white'}}>
        <div class="card">
          <div class="card-body">
            <h5 class="card-tittle">Projects Details</h5>
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">Team Lead Id</th>
                  <th scope="col">Team Lead Name</th>
                  <th scope="col">Employee Id</th>
                  <th scope="col">Project Password</th>

                  <th class="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>{teamLead?teamLead.teamLeaderId:null}</td>
                    <td>{teamLead?teamLead.teamLeaderName:null}</td>
                    <td>{teamLead?teamLead.employeeId:null}</td>
                    <td>{teamLead?teamLead.projectPassword:null}</td>

                    <td class="text-center">
                      <button
                        class="btn btn-danger"
                        onClick={() => {
                          setTeamLeadDelete(teamLead);
                        }}
                      >Delete</button>
                    </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </body>
  );
}
