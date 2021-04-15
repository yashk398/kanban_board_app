import React from 'react'


const axios = require('axios').default;

class TeamLeaders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.projectId,
      teamLeaders: [],
      input: 3
    };
    console.log("Hi");
  }

    
  componentDidMount() {
    axios.get('http://localhost:8080/api/kanban_board/getTeamLead/'+this.state.projectId).then((response) => {
      this.setState({ teamLeaders: response.data.teamLeadEntity })
    });
  }

  render() {
    console.log(this.props.input);
    return (
      <div>
        <div>
          <h2>Team Lead</h2>
          <p>Team lead for you current project</p>
        </div>

        <div class="container">
          <div className='col-md-2'>

          </div>
          <div className='col-md-8'>
            <table class="table table-dark table-striped">
              <thead>
                <tr >
                  <td><h3>Name</h3></td>
                  <td><h3>Team LeaderID</h3></td>
                  <td><h3>Employee ID</h3></td>
                  <td><h3>Project ID</h3></td>
                </tr>
              </thead>

              <tbody>
               <tr>
                      <td>{this.state.teamLeaders.teamLeaderName}</td>
                      <td>{this.state.teamLeaders.teamLeaderId}</td>
                      <td>{this.state.teamLeaders.employeeId}</td>
                      <td>{this.state.projectId}</td>
                    </tr>
              </tbody>



            </table>
          </div>
          <div className='col-md-2'>

          </div>


        </div>

      </div>
    );
  }
}

export default TeamLeaders