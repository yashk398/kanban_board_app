 import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { FaUsers } from "react-icons/fa";

const axios = require("axios").default;

export default function ViewTeamMembers(props) {
  const [teamMembers, setTeamMembersList] = useState([]);
  const [deleteTeamMember, setdeleteTeamMember] = useState(null);

  const projectId = props.id;

  // const URL_User_getmembers = "http://localhost:8000/api/kanban_board/getmembers";

  console.log(projectId);
  console.log(teamMembers);
  console.log(deleteTeamMember);

  useEffect(() => {
    axios
      .get(
        "http://localhost:8080/api/kanban_board/getTeamMembers/"+projectId,
      )
      .then((response) => {
        if (response.data.membersList.length == 0) {
          alert("No Active Records Found..");
        } else {
          setTeamMembersList(response.data.membersList);
        }
      });

    if (deleteTeamMember !== null) {
      axios
        .delete("http://localhost:8080/api/kanban_board/deleteteammember", {
          params: {
            teamMemberId: deleteTeamMember.teamMemberId,
          },
        })
        .then((response) => {
          if (response.data) {
            alert(
              "Are you sure You want to delete : Click icon again to delete.."
            );
          }
        });
    }
  }, [projectId, deleteTeamMember]);

  console.log(teamMembers);
  // console.log(deleteTeamMember.teamMemberId);
  console.log(deleteTeamMember);

  return (
    <body class="">
      <div class="container" style={{background:'white', width: '100%'}}>
        <div class="">
          <div class="card-body">
            <h3 class="card-tittle-1">
                Team Members
            </h3>
            <h5 class="card-tittle-1"> Team Members Details</h5>
            <table class="table table-striped table-hover table-bordered table-light">
              <thead>
                <tr>
                  <th scope="col">Team member Id</th>
                  <th scope="col">Team member Name</th>
                  <th scope="col">Employee Id</th>
                  {/* <th scope="col">Project Password</th> */}

                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers?teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.teamMemberId}</td>
                    <td>{member.teamMemberName}</td>
                    <td>{member.employeeId}</td>
                    {/* <td>{member.projectPassword} </td> */}
                    <td class="text-center">
                      <Button
                        variant="danger"
                        onClick={() => {
                          setdeleteTeamMember(member);
                        }}
                      >Delete</Button>
                    </td>
                  </tr>
                )):null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </body>
  );
}
