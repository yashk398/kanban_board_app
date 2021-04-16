import React from 'react'
import ReactToExcel from 'react-html-table-to-excel';

const axios = require('axios').default;

class TeamMembers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      teamMembers: [],
      input: 3
    };
    console.log("Hi");
  }

    
  componentDidMount() {
    axios.get('http://localhost:8080/api/kanban_board/getTeamMembers/'+this.state.projectId).then((response) => {
      this.setState({ teamMembers: response.data.membersList })
    });
  }

  render() {
    console.log(this.props.input);
    return (
      <div>
        <div>
          <h2>Team Members</h2>
          <p>Listed down are your Co-Team Members assigned to your project</p>
        </div>

        <div class="container">
          <div className='col-md-2'>

          </div>
          <div className='col-md-8'>
            <table class="table table-dark table-striped table-to-xls" id="table-to-xls">
              <thead>
                <tr >
                  <td><h3>Name</h3></td>
                  <td><h3>Team MemberID</h3></td>
                  <td><h3>Employee ID</h3></td>
                  <td><h3>Project ID</h3></td>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.teamMembers.map((member) =>
                    <tr key={member.id}>
                      <td>{member.teamMemberName}</td>
                      <td>{member.teamMemberId}</td>
                      <td>{member.employeeId}</td>
                      <td>{member.projectEntity.projectId}</td>
                    </tr>
                  )
                }
              </tbody>



            </table>
            <ReactToExcel className="btn-primary btn" table="table-to-xls" filename="teammembers" sheet="sheet 1" buttonText="Download Team Members XLS"/>
          </div>
          <div className='col-md-2'>

          </div>


        </div>

      </div>
    );
  }
}

export default TeamMembers
